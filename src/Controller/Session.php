<?php

namespace Sracz\Controller;

use \Interop\Container\ContainerInterface;
use \Sracz\Model\User as UserModel;
use \Sracz\Model\Session as SessionModel;

class Session
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function login($request, $response, $args) {
        $inputData = $request->getParsedBody();
        $user = UserModel::where('email', '=', $inputData['email'])->first();
        if($user === null) {
            return $response->withStatus(401);
        }
        if(!$user->checkPassword($inputData['password'])) {
            return $response->withStatus(401);
        }
        $newSession = new SessionModel();
        $newSession->created_at = new \DateTime();
        $newSession->user_id = $user->id;
        $newSession->token = SessionModel::generateToken($user);
        $newSession->created_at = $newSession->created_at->format('Y-m-d H:i:s');
        $newSession->ip_address = self::detectIp();
        $newSession->save();
        $newSession->user = $user;
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

    private static function detectIp()
    {
        if (getenv('HTTP_CLIENT_IP')) {
            $ipAddress = getenv('HTTP_CLIENT_IP');
        } elseif (getenv('HTTP_X_FORWARDED_FOR')) {
            $ipAddress = getenv('HTTP_X_FORWARDED_FOR');
        } elseif (getenv('HTTP_X_FORWARDED')) {
            $ipAddress = getenv('HTTP_X_FORWARDED');
        } elseif (getenv('HTTP_FORWARDED_FOR')) {
            $ipAddress = getenv('HTTP_FORWARDED_FOR');
        } elseif (getenv('HTTP_FORWARDED')) {
            $ipAddress = getenv('HTTP_FORWARDED');
        } elseif (getenv('REMOTE_ADDR')) {
            $ipAddress = getenv('REMOTE_ADDR');
        } else {
            $ipAddress = 'UNKNOWN';
        }
        if ($ipAddress === '0:0:0:0:0:0:0:1' || $ipAddress === '::1') {
            $ipAddress = '127.0.0.1';
        }
        return ip2long($ipAddress);
    }
}