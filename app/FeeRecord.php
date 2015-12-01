<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeeRecord extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['room_id', 'building_id','fee_meta_id','fee_name','inc_fee','full_fill'];
}
