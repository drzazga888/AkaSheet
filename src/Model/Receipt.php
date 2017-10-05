<?php

namespace AkaSheet\Model;

use Illuminate\Database\Eloquent\Model;

class Receipt extends Model
{
    protected $table = 'receipt';

    protected $fillable = ['purchase_date', 'location', 'product', 'buyer', 'recipient', 'cost', 'comment', 'piece'];
}