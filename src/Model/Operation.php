<?php

namespace Sracz\Model;

use Illuminate\Database\Eloquent\Model;

class Operation extends Model
{
    const SPLIT_FRACTION = 'fraction';
    const SPLIT_PERCENTAGE = 'percentage';
    const SPLIT_PART = 'part';
    protected $table = 'operation';

    public $timestamps = false;

    protected $hidden = ['transaction_id'];

    protected $fillable = ['transaction_id', 'user_id', 'n_part', 'd_part', 'split_type'];

    public function transaction()
    {
        return $this->belongsTo('Sracz\\Model\\Transaction');
    }

    public function user()
    {
        return $this->belongsTo('Sracz\\Model\\User');
    }
}