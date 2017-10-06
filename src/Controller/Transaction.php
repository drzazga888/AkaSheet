<?php

namespace AkaSheet\Controller;

use \Interop\Container\ContainerInterface;
use \AkaSheet\Model\Transaction as TransactionModel;

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
        $inputData['created_at'] = new \DateTime();
        $inputData['updated_at'] = new \DateTime();
        $inputData['buyer_id'] = $this->container->currentUser->id;
        $newTransaction = TransactionModel::create($inputData);
        return $this->details($request, $response, ['id'=>$newTransaction->id]);
    }

    public function all($request, $response, $args) {
        $transactions = TransactionModel::with('buyer')->get();
        return $response->withJson($transactions);
    }

    public function details($request, $response, $args) {
        $transaction = TransactionModel::with('buyer')->find((int)$args['id']);
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
        $updatedTransaction = TransactionModel::updateOrCreate(['id' => (int)$args['id']], $inputData);
        $updatedTransaction->purchase_date = $updatedTransaction->purchase_date->format('d-m-Y');
        $updatedTransaction->buyer;
        return $response->withJson($updatedTransaction);
    }

    public function delete($request, $response, $args) {
        TransactionModel::destroy((int)$args['id']);
        return $response->withStatus(200);
    }
}