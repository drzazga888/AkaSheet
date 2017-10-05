<?php

namespace AkaSheet\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';

    protected $hidden = array('password');

    public $timestamps = false;

    protected $fillable = ['name', 'surname', 'email', 'password'];

    public static function encryptPassword($password)
    {
        return sha1($password);
    }

    public function checkPassword($password)
    {
        return $this->password === self::encryptPassword($password);
    }
}