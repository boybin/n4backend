<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use SoftDeletes;

    protected $fillable = ['building_id', 'user_id', 'name', 'desc'];

    public function building() {
      return $this->belongsTo('App\Building');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }

}
