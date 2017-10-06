<?php

namespace AkaSheet\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';

    protected $hidden = ['password'];

    public $timestamps = false;

    protected $fillable = ['name', 'surname', 'email', 'password', 'active', 'role'];

    public static $ROLES = [
        'GUEST' => 0,
        'USER' => 1,
        'ADMIN' => 2
    ];

    public static function getRoles($role = null) {
        if($role!==null && array_key_exists($role, static::$ROLES)) {
            return self::$ROLES[$role];
        }
        return self::$ROLES;
    }

    public static function getRoleNames() {
        return array_keys(self::$ROLES);
    }

    public static function encryptPassword($password)
    {
        return sha1($password);
    }

    public function checkPassword($password)
    {
        return $this->password === self::encryptPassword($password);
    }

    public static function getByToken($token)
    {

    }

    public function recipients()
    {
        return $this->belongsToMany('AkaSheet\\Model\\Recipient', 'user_recipient', 'user_id', 'recipient_id');
    }

    public function transactions()
    {
        return $this->hasMany('AkaSheet\\Model\\Transaction', 'buyer_id');
    }

    public function session()
    {
        return $this->hasOne('AkaSheet\\Model\\Session');
    }
}