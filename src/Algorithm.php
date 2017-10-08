<?php

namespace Sracz;

use Sracz\Model\MoneyFlow;

class Algorithm
{
    public static function divideMoney($users)
    {
        $debts = [];
        $profits = [];
        $flow = [];

        foreach($users as $user) {
            if($user->balance > 0) {
                $profits[] = clone $user;
            } else if($user->balance < 0) {
                $debts[] = clone $user;
            } else {
                $done[] = clone $user;
            }
        }
        usort($profits, [__CLASS__, 'cmpH2L']);
        usort($debts, [__CLASS__, 'cmpH2L']);

        while(count($debts) > 0 & count($profits) > 0) {
            $absDebt = abs($debts[0]->balance);
            $absProfit = abs($profits[0]->balance);
            $flowAmount = min($absProfit,$absDebt);

            $flow[] = new MoneyFlow($debts[0], $profits[0], $flowAmount);
            if($absDebt > $absProfit) {
                array_splice($profits, 0, 1);
                $debts[0]->balance = $debts[0]->balance + $flowAmount;
                self::fixArrayOrder($debts);
            } else if($absDebt < $absProfit) {
                array_splice($debts, 0, 1);
                $profits[0]->balance = $profits[0]->balance - $flowAmount;
                self::fixArrayOrder($profits);
            } else {
                array_splice($profits, 0, 1);
                array_splice($debts, 0, 1);
            }
        }

        return $flow;
    }

    private static function cmpH2L($a, $b) {
        $value1 = abs($a->balance);
        $value2 = abs($b->balance);
        if ($value1 === $value2) {
            return 0;
        }
        return ($value1 > $value2) ? -1 : 1;
    }

    private static function fixArrayOrder(array &$input) {
        $toMove = $input[0];
        $limit = count($input);
        for($i = 1; $i<$limit;++$i) {
            if($input[$i]->balance > $toMove->balance) {
                $input[$i-1] = $input[i];
            } else {
                $input[$i-1] = $toMove;
                return;
            }
        }
        $input[$limit-1] = $toMove;
    }
}