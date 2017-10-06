<?php

namespace AkaSheet\Model;

use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    protected $table = 'session';

    protected $primaryKey = 'token';

    public $incrementing = false;

    public $timestamps = false;

    public static function generateToken($user)
    {
        return sha1(date('d-m-Y H:i:s').$user->created_at);
    }

    public static function getByToken($token)
    {
        if($token === null) {
            $token = "";
        }
        return self::where('token', '=', $token)->first();
    }

    public function user()
    {
        return $this->belongsTo('AkaSheet\\Model\\User');
    }
}