<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeePlan extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];

    public function contract() {
      return $this->belongsTo('App\Contract','rent_id');
    }

    public static function checkNotExistPlanned($feePlan) {
      $overlapCount = FeePlan::where('rent_id',$feePlan['rent_id'])
                                ->where('feemeta_id',$feePlan['feemeta_id'])
                                ->where('fee_end_date', '>', $feePlan['fee_start_date'])
                                ->count();

      return $overlapCount < 1;
    }

    public function room() {
      return $this->belongsTo('App\Room','room_id');
    }
}
