<?php

namespace Sracz\Model;

use Illuminate\Database\Eloquent\Model;

class Recipient extends Model
{
    protected $table = 'recipient';

    public $timestamps = false;

    protected $fillable = ['name'];

    public function users()
    {
        return $this->belongsToMany('Sracz\\Model\\User', 'user_recipient', 'recipient_id', 'user_id');
    }
}