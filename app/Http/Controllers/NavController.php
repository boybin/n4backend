<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class NavController extends AuthBaseController
{
    public function nav(){
      return view('rent.layouts.nav_'.$this->user['role']);
    }
}
