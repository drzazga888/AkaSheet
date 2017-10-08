<?php

namespace Sracz\Model;

use Illuminate\Database\Capsule\Manager as Capsule;
use Sracz\Model\User;
use Sracz\Model\MoneyFlow;

class Report
{
    public static function generate($currentUser)
    {
        $balance = self::getBalance($currentUser);
        $divide = \Sracz\Algorithm::divideMoney($balance);
        return [
            'balance' => $balance,
            'divide' => $divide
        ];
    }

    private static function getDebts($currentUser)
    {
        return Capsule::table('operation')->join('transaction', 'transaction.id', '=', 'operation.transaction_id')
                                     ->select(Capsule::raw('sum(amount) as amount, user_id'))
                                     ->where('transaction.paid', '=', 0)
                                     ->groupBy('user_id')
                                     ->orderBy('user_id', 'asc')
                                     ->pluck('amount', 'user_id')
                                     ->toArray();
    }

    private static function getInvestments($currentUser)
    {
        return Capsule::table('transaction')
            ->select(Capsule::raw('sum(cost) as cost, buyer_id'))
            ->where('paid', '=', 0)
            ->groupBy('buyer_id')
            ->orderBy('buyer_id', 'asc')
            ->pluck('cost', 'buyer_id')
            ->toArray();
    }

    private static function getBalance($currentUser)
    {
        $debts = self::getDebts($currentUser);
        $investments = self::getInvestments($currentUser);
        $users = User::all();
        foreach($users as $key => $user) {
            $users[$key]->balance = self::getAmount($investments, $user->id) - self::getAmount($debts, $user->id);
        }
        return $users;
    }

    private static function getAmount(array $input, $key) {
        if(isset($input[$key])) {
            return $input[$key];
        } else {
            return 0.0;
        }
    }
}