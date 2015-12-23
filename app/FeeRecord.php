<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeeRecord extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    public function building() {
      return $this->belongsTo('App\Building','building_id');
    }

    public function contract() {
      return $this->belongsTo('App\Contract','rent_id');
    }

    public function user() {
      return $this->belongsTo('App\User');
    }
}
