<?php

namespace Sracz\Controller;

use \Interop\Container\ContainerInterface;
use \Sracz\Model\User as UserModel;

class User
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function register($request, $response, $args) {
        $inputData = $request->getParsedBody();
        $existingUser = UserModel::where('email', '=', $inputData['email'])->get();
        if(count($existingUser) > 0) {
            return $response->withStatus(409);
        }
        $inputData['password'] = UserModel::encryptPassword($inputData['password']);
        $inputData['active'] = 1;
        $inputData['role'] = UserModel::getRoles('USER');
        $newUser = UserModel::create($inputData);
        return $response->withJson($newUser);
    }

    public function allUsers($request, $response, $args) {
        $users = UserModel::all();
        return $response->withJson($users);
    }

    public function info($request, $response, $args) {
        $user = UserModel::with('recipients', 'transactions')->find((int)$args['id']);
        if($user === null) {
            return $response->withStatus(404);
        }
        return $response->withJson($user);
    }
}