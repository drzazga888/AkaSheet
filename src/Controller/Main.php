<?php

namespace Sracz\Controller;

use \Interop\Container\ContainerInterface;
use \Sracz\Model\User as UserModel;

class Main
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function main($request, $response, $args) {
        $file = dirname(dirname(__DIR__)).DIRECTORY_SEPARATOR.'public'.DIRECTORY_SEPARATOR.'index.html';
        if(!file_exists($file)) {
            return $response->withStatus(404);
        }
        $body = $response->getBody();
        $body->write(file_get_contents($file));
        return $response;
    }
}