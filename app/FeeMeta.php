<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeeMeta extends Model
{
    use SoftDeletes;
    
    protected $fillable = ['name', 'type','fee','alert'];
}
