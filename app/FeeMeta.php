<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeeMeta extends Model
{
    use SoftDeletes;

    protected $fillable = ['name', 'type','fee','alert','fee_start_date','fee_end_date','fee_alert_date'];

    public static function isYearlyType($feetype) {
      return $feetype == 1;
    }

    public static function isMonthlyType($feetype) {
      return $feetype == 2;
    }

    public static function isSeasonlyType($feetype) {
      return $feetype == 3;
    }

}
