<?php

namespace Sracz\Model;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    protected $table = 'operation';

    public $timestamps = false;

    protected $hidden = ['transaction_id', 'user_id'];

    protected $fillable = ['transaction_id', 'user_id', 'amount', 'part'];

    public function transaction()
    {
        return $this->belongsTo('Sracz\\Model\\Transaction');
    }

    public function user()
    {
        return $this->belongsTo('Sracz\\Model\\User');
    }
}