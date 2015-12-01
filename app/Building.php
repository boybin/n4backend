<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Building extends Model
{
    protected $table = 'buildings';
    //
    public function rooms() {
      return $this->hasMany('App\Room');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }
}
