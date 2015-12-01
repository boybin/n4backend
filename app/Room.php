<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'rooms';
    //
    public function building() {
      return $this->belongsTo('App\Building');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }

}
