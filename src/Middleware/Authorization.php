<?php

namespace AkaSheet\Middleware;

use \AkaSheet\Model\Session;

class Authorization {
    private $whiteList;
    private $session = null;
    private $application;

    public function __construct($app) {
        $this->whiteList = [
            'POST' => [
                '/api/user',
                '/api/session'
            ]
        ];
        $this->application = $app;
    }

    public function deny_access($response) {
        return $response->withStatus(401);
    }

    public function authenticate($token) {
        $this->session = Session::getByToken($token);
        return $this->session !== null;
    }

    public function isAllowedRequest($request) {
        $pattern = $request->getAttribute('route')->getPattern();
        $method = strtoupper($request->getMethod());
        if(array_key_exists($method, $this->whiteList)) {
            if(in_array($pattern, $this->whiteList[$method])) {
                return true;
            }
        }
        return false;
    }

    public function __invoke($request, $response, $next)
    {
        if ($this->isAllowedRequest($request)) {
            return $next($request, $response);
        } else {
            if($request->hasHeader('X-Token')) {
                $token = $request->getHeader('X-Token');
                if ($this->authenticate($token)) {
                    $container = $this->application->getContainer();
                    $container['currentUser'] = $this->session->user;
                    return $next($request, $response);
                }
            }
            return $this->deny_access($response);
        }
    }

}