<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Building extends Model
{
    use SoftDeletes;

    protected $fillable = ['user_id', 'name', 'desc','rooms_count','building_sn'];

    public function rooms() {
      return $this->hasMany('App\Room','building_id');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }
}
