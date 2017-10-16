<?php

namespace Sracz\Controller;

use \Interop\Container\ContainerInterface;
use \Sracz\Model\Transaction as TransactionModel;
use \Sracz\Model\Operation as OperationModel;

class Transaction
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function add($request, $response, $args) {
        $inputData = $request->getParsedBody();
        if(empty($inputData['comment'])) {
            $inputData['comment'] = null;
        }
        $inputData['purchase_date'] = new \DateTime($inputData['purchase_date']);
        $inputData['buyer_id'] = $this->container->currentUser->id;
        $inputData['paid'] = 0;
        $newTransaction = TransactionModel::create($inputData);
        if(isset($inputData['operations'])) {
            $operations = $inputData['operations'];
        } else {
            $operations = $this->prepareDefaultOperations($newTransaction);
        }
        try {
            $operations = $this->prepareIncomingOperations($operations);
            $this->addOperations($newTransaction->id, $operations);
        } catch(\Exception $e) {
            return $response->withStatus(400);
        }
        return $this->details($request, $response, ['id'=>$newTransaction->id]);
    }

    public function all($request, $response, $args) {
        $transactions = TransactionModel::with('buyer', 'operations', 'recipient')->get();
        return $response->withJson($transactions);
    }

    public function details($request, $response, $args) {
        $transaction = TransactionModel::with('buyer', 'operations', 'recipient')->find((int)$args['id']);
        if($transaction === null) {
            return $response->withStatus(404);
        }
        $transaction->purchase_date = (new \DateTime($transaction->purchase_date))->format('d-m-Y');
        return $response->withJson($transaction);
    }

    public function update($request, $response, $args) {
        $inputData = $request->getParsedBody();
        if(empty($inputData['comment'])) {
            $inputData['comment'] = null;
        }
        $inputData['purchase_date'] = new \DateTime($inputData['purchase_date']);
        $inputData['updated_at'] = new \DateTime();
        $inputData['id'] = (int)$args['id'];
        $foundTransaction = TransactionModel::with('recipient')->find($inputData['id']);
        $updatedTransaction = TransactionModel::updateOrCreate(['id' => (int)$args['id']], $inputData);
        if($foundTransaction !== null && $foundTransaction->recipient_id !== $inputData['recipient_id']) {
            if(isset($inputData['operations'])) {
                $operations = $inputData['operations'];
            } else {
                $operations = $this->prepareDefaultOperations($updatedTransaction);
            }
            $this->removeOperations($foundTransaction);
            try {
                $operations = $this->prepareIncomingOperations($operations);
                $this->addOperations($updatedTransaction->id, $operations);
            } catch(\Exception $e) {
                return $response->withStatus(400);
            }
        }
        return $this->details($request, $response, ['id'=>$updatedTransaction->id]);
    }

    public function pay($request, $response, $args) {
        $transaction = TransactionModel::with('operations')->find((int)$args['id']);
        $transaction->paid = 1;
        $transaction->save();
        return $response->withJson($transaction);
    }

    public function delete($request, $response, $args) {
        $transaction = TransactionModel::find((int)$args['id']);
        $this->removeOperations($transaction);
        $transaction->delete();
        return $response->withStatus(200);
    }

    private function addOperations($transactionId, array $operations)
    {
        foreach($operations as $operation) {
            $newOperation = new OperationModel();
            $newOperation->transaction_id = $transactionId;
            $newOperation->user_id = $operation['user_id'];
            $newOperation->n_part = $operation['n_part'];
            $newOperation->d_part = $operation['d_part'];
            $newOperation->split_type = $operation['split_type'];
            $newOperation->save();
        }
    }

    private function removeOperations($transaction)
    {
        foreach($transaction->operations as $operation) {
            $operation->delete();
        }
    }

    private function prepareIncomingOperations(array $operations)
    {
        $operationSum = 0.0;
        foreach($operations as &$operation) {
            if(!isset($operation['n_part']) || !isset($operation['d_part']) || !isset($operation['split_type'])) {
                $operation = array_merge($operation, $this->parseSplitOperation($operation['part']));
                $operationSum += $operation['n_part']/$operation['d_part'];
            }
        }
        if(abs(1-$operationSum) > 0.001) {
            throw new \Exception();
        }
        return $operations;
    }

    private function prepareDefaultOperations($transaction, $paid = 0)
    {
        $operations = [];
        $users = $transaction->recipient->users;
        $numberOfUsers = count($users);
        if($numberOfUsers < 1) {
            return $operations;
        }
        foreach($users as $user) {
            $operations[] = [
                'user_id' => $user->id,
                'paid' => $paid,
                'n_part' => 1,
                'd_part' => $numberOfUsers,
                'split_type' => OperationModel::SPLIT_PART
            ];
        }
        return $operations;
    }

    private function parseSplitOperation($input) {
        if(strpos($input, '%') !== false) {
            return [
                'n_part' => $this->numberFilter($input),
                'd_part' => 100,
                'split_type' => OperationModel::SPLIT_PERCENTAGE
            ];
        } else if(strpos($input, '/') !== false) {
            $parts = explode('/', $input);
            return [
                'n_part' => $this->numberFilter($parts[0]),
                'd_part' => $this->numberFilter($parts[1]),
                'split_type' => OperationModel::SPLIT_FRACTION
            ];
        } else if(strpos($input, '.') !== false || strpos($input, ',') !== false) {
            return [
                'n_part' => $this->numberFilter($input),
                'd_part' => 1,
                'split_type' => OperationModel::SPLIT_PART
            ];
        } else {
            throw new \Exception();
        }
    }

    private function numberFilter($input)
    {
        return str_replace('%', '', str_replace(',', '.', $input));
    }
}