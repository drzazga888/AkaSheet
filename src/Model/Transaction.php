<?php

namespace Sracz\Model;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'transaction';

    protected $fillable = ['id', 'purchase_date', 'location', 'product', 'buyer_id', 'recipient_id', 'cost', 'comment', 'paid'];

    protected $hidden = ['buyer_id', 'recipient_id'];

    public function buyer()
    {
        return $this->belongsTo('Sracz\\Model\\User', 'buyer_id');
    }

    public function recipient()
    {
        return $this->belongsTo('Sracz\\Model\\Recipient');
    }

    public function operations()
    {
        return $this->hasMany('Sracz\\Model\\Operation');
    }
}