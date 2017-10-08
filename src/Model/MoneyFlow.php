<?php

namespace Sracz\Model;

class MoneyFlow
{
    public $from;
    public $to;
    public $money;

    public function __construct($from, $to, $money)
    {
        $this->from = $from;
        $this->to = $to;
        $this->money = $money;
    }
}