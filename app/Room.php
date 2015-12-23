<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;

    protected $fillable = ['building_id', 'user_id', 'name', 'desc', 'electric_degree', 'water_degree','room_sn'];

    public function building() {
      return $this->belongsTo('App\Building','building_id');
    }

    public function contract() {
      return $this->hasOne('App\Contract');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }

    public function feeplans() {
      return $this->hasMany('App\FeePlan');
    }

}
