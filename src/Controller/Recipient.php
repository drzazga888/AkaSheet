<?php

namespace Sracz\Controller;

use \Interop\Container\ContainerInterface;
use \Sracz\Model\Recipient as RecipientModel;

class Recipient
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function add($request, $response, $args) {
        $inputData = $request->getParsedBody();
        $existingRecipient = RecipientModel::with('users')->where('name', '=', $inputData['name'])->get();
        if(count($existingRecipient) > 0) {
            return $response->withStatus(409);
        }
        $newRecipient = RecipientModel::create($inputData);
        return $response->withJson($newRecipient);
    }

    public function all($request, $response, $args) {
        $recipients = RecipientModel::with('users')->get();
        return $response->withJson($recipients);
    }

    public function info($request, $response, $args) {
        $recipient = RecipientModel::with('users')->find((int)$args['recipient_id']);
        if($recipient === null) {
            return $response->withStatus(404);
        }
        $recipient->users;
        return $response->withJson($recipient);
    }

    public function update($request, $response, $args) {
        $inputData = $request->getParsedBody();
        $inputData['id'] = (int)$args['id'];
        $updatedRecipient = RecipientModel::updateOrCreate(['id' => (int)$args['id']], $inputData);
        $updatedRecipient->users;
        return $response->withJson($updatedRecipient);
    }

    public function delete($request, $response, $args) {
        $recipient = RecipientModel::find((int)$args['id']);
        $recipient->users()->detach();
        $recipient->delete();
        return $response->withStatus(200);
    }

    public function assignUser($request, $response, $args) {
        $recipient = RecipientModel::find((int)$args['recipient_id']);
        if($recipient->users->find((int)$args['user_id']) !== null) {
            return $response->withStatus(409);
        }
        $recipient->users()->attach((int)$args['user_id']);
        return $this->info($request, $response, $args);
    }

    public function removeUser($request, $response, $args) {
        $recipient = RecipientModel::find((int)$args['recipient_id']);
        $recipient->users()->detach((int)$args['user_id']);
        $recipient->users;
        return $this->info($request, $response, $args);
    }
}