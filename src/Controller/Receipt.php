<?php

namespace AkaSheet\Controller;

use \Interop\Container\ContainerInterface;
use \AkaSheet\Model\Receipt as ReceiptModel;

class Receipt
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
        $newReceipt = ReceiptModel::create($inputData);
        $newReceipt->purchase_date = $newReceipt->purchase_date->format('d-m-Y');
        return $response->withJson($newReceipt);
    }

    public function all($request, $response, $args) {
        $receipts = ReceiptModel::all();
        return $response->withJson($receipts);
    }

    public function details($request, $response, $args) {
        $receipt = ReceiptModel::find((int)$args['id']);
        if($receipt === null) {
            return $response->withStatus(404);
        }
        return $response->withJson($receipt);
    }

    public function update($request, $response, $args) {
        $inputData = $request->getParsedBody();
        if(empty($inputData['comment'])) {
            $inputData['comment'] = null;
        }
        $inputData['purchase_date'] = new \DateTime($inputData['purchase_date']);
        $inputData['updated_at'] = new \DateTime();

        $updatedReceipt = ReceiptModel::updateOrCreate($inputData, ['id' => (int)$args['id']]);
        $updatedReceipt->purchase_date = $updatedReceipt->purchase_date->format('d-m-Y');
        return $response->withJson($updatedReceipt);
    }

    public function delete($request, $response, $args) {
        ReceiptModel::destroy((int)$args['id']);
        return $response->withStatus(200);
    }
}