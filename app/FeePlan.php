<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeePlan extends Model
{
    use SoftDeletes;

    protected $fillable = [];
}
