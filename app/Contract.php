<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\FeePlan;
class Contract extends Model
{
    use SoftDeletes;
    //
    protected $guarded = [];

    public function room() {
      return $this->belongsTo('App\Room','room_id');
    }

    public function feePlans() {
      return $this->hasMany('App\FeePlan','rent_id');
    }


}
