<?php

namespace Sracz\Controller;

use \Interop\Container\ContainerInterface;
use \Sracz\Model\Report as ReportModel;

class Summary
{
    public function __construct(ContainerInterface $container) {
        $this->container = $container;
    }

    public function generate($request, $response, $args) {
        $report = ReportModel::generate($this->container->currentUser);
        return $response->withJson($report);
    }
}