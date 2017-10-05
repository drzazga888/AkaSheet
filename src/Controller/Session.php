<?php

namespace AkaSheet\Controller;

use \Interop\Container\ContainerInterface;
use \AkaSheet\Model\User as UserModel;
use \AkaSheet\Model\Session as SessionModel;

class Session
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function login($request, $response, $args) {
        $inputData = $request->getParsedBody();
        $user = UserModel::where('email', '=', $inputData['email'])->first();
        if($user === null) {
            return $response->withStatus(404);
        }
        $newSession = new SessionModel();
        $newSession->created_at = new \DateTime();
        $newSession->user = $user->id;
        $newSession->token = SessionModel::generateToken($user);
        $newSession->save();
        $newSession->created_at = $newSession->created_at->format('d-m-Y H:i:s');
        return $response->withJson($newSession);
    }

    public function logout($request, $response, $args) {
        $session = SessionModel::where('token', '=', $request->getHeader('X-Token'))->first();
        if($session === null) {
            return $response->withStatus(404);
        }
        $session->delete();
        return $response->withStatus(200);
    }
}