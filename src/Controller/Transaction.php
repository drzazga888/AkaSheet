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
        $this->addOperations($newTransaction->id, $operations);
        return $this->details($request, $response, ['id'=>$newTransaction->id]);
    }

    public function all($request, $response, $args) {
        $transactions = TransactionModel::with('buyer', 'recipient')->get();
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
            $this->addOperations($updatedTransaction->id, $operations);
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
            $newOperation->part = $operation['part'];
            $newOperation->save();
        }
    }

    private function removeOperations($transaction)
    {
        foreach($transaction->operations as $operation) {
            $operation->delete();
        }
    }

    private function prepareDefaultOperations($transaction, $paid = 0)
    {
        $operations = [];
        $users = $transaction->recipient->users;
        $numberOfUsers = count($users);
        if($numberOfUsers < 1) {
            return $operations;
        }
        $part = 1.0/$numberOfUsers;
        foreach($users as $user) {
            $operations[] = [
                'user_id' => $user->id,
                'part' => $part,
                'paid' => $paid
            ];
        }
        return $operations;
        }
}