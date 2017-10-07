<?php

namespace Sracz\Model;

class MoneyFlow
{
    private $from;
    private $to;
    private $money;

    public function __construct($from, $to, $money)
    {
        unset($from['balance']);
        $this->from = $from;
        unset($to['balance']);
        $this->to = $to;
        $this->money = $money;
    }

    public function toArray()
    {
        /*return [
            'from' => $this->from->toArray(),
            'to' => $this->to->toArray(),
            'money' => $this->money
        ];*/
    }
}