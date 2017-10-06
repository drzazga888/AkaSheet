<?php

namespace AkaSheet\Model;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transaction';

    protected $fillable = ['id', 'purchase_date', 'location', 'product', 'buyer_id', 'recipient', 'cost', 'comment', 'piece'];

    protected $hidden = ['buyer_id'];

    public function buyer()
    {
        return $this->belongsTo('AkaSheet\\Model\\User', 'buyer_id');
    }
}