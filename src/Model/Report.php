<?php

namespace Sracz\Model;

use Illuminate\Database\Capsule\Manager as Capsule;
use Sracz\Model\User;
use Sracz\Model\MoneyFlow;

class Report
{
    private $users;

    public static function generate($currentUser)
    {
        $balance = self::getBalance($currentUser);
        return self::divideMoney($balance);
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

    private static function divideMoney($users)
    {
        $surplus=[];
        $debit=[];
        $withoutop=[];
        $operations = [];
        $numberOfUsers = count($users);
        $precision = 0.01;
        foreach($users as $user) {
            if ($user->balance > 0) {
                $surplus[] = $user;
            } else if($user->balance<0) {
                $debit[] = $user;
            } else {
                $withoutop[] = $user;
            }
        }
        uasort($surplus, [__CLASS__, 'cmpL2H']);
        uasort($debit, [__CLASS__, 'cmpH2L']);
        //var_dump($surplus);die();
        //podział pieniędzy
        while(count($withoutop)<$numberOfUsers)
        {
            uasort($surplus, [__CLASS__, 'cmpL2H']);
            uasort($debit, [__CLASS__, 'cmpH2L']);
            reset($surplus);
            reset($debit);
            $keyDebit = key($debit);
            $keySurplus = key($surplus);
            $tmp = $debit[$keyDebit]->money+$surplus[$keySurplus]->money;
            if($tmp>$precision)
            {
                $operations[] = new MoneyFlow($debit[$keyDebit], $surplus[$keySurplus], abs($debit[$keyDebit]->balance));
                if(is_object($debit[$keyDebit])) {
                    $withoutop[]=clone $debit[$keyDebit];
                } else {
                    $withoutop[]=$debit[$keyDebit];
                }
                unset($debit[$keyDebit]);
                $surplus[$keySurplus]->balance=$tmp;
            }
            else if($tmp<-$precision) {
                $operations[] = new MoneyFlow($debit[$keyDebit], $surplus[$keySurplus], abs($surplus[$keySurplus]->balance));
                if(is_object($surplus[$keySurplus])) {
                    $withoutop[]=clone $surplus[$keySurplus];
                } else {
                    $withoutop[]=$surplus[$keySurplus];
                }
                unset($surplus[$keySurplus]);
                $debit[$keyDebit]->balance=$tmp;
            }
            else
            {
                $operations[] = new MoneyFlow($debit[$keyDebit], $surplus[$keySurplus], abs($debit[$keyDebit]->balance));
                if(is_object($debit[$keyDebit])) {
                    $withoutop[]=clone $debit[$keyDebit];
                } else {
                    $withoutop[]=$debit[$keyDebit];
                }
                unset($debit[$keyDebit]);
                if(is_object($surplus[$keySurplus])) {
                    $withoutop[]=clone $surplus[$keySurplus];
                } else {
                    $withoutop[]=$surplus[$keySurplus];
                }
                unset($surplus[$keySurplus]);
            }
        }
        return $operations;
    }

    private static function cmpH2L($a, $b) {
        if ($a->money == $b->money) {
            return 0;
        }
        return ($a->money < $b->money) ? -1 : 1;
    }
    private static function cmpL2H($a, $b) {
        if ($a->money == $b->money) {
            return 0;
        }
        return ($a->money > $b->money) ? -1 : 1;
    }
}