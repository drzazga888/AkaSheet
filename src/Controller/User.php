<?php

namespace AkaSheet\Controller;

use \Interop\Container\ContainerInterface;
use \AkaSheet\Model\User as UserModel;

class User
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function register($request, $response, $args) {
        $inputData = $request->getParsedBody();
        $existingUser = UserModel::where('email', '=', $inputData['email'])->get();
        if(count($existingUser) > 0) {
            return $response->withStatus(400);
        }
        $inputData['password'] = UserModel::encryptPassword($inputData['password']);
        $newUser = UserModel::create($inputData);
        return $response->withJson($newUser);
    }

    public function allUsers($request, $response, $args) {
        $users = UserModel::all();
        return $response->withJson($users);
    }

    public function info($request, $response, $args) {
        $user = UserModel::find((int)$args['id']);
        if($user === null) {
            return $response->withStatus(404);
        }
        return $response->withJson($user);
    }
}