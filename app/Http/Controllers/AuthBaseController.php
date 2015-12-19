<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Tymon\JWTAuth\JWTAuth;

abstract class AuthBaseController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $user;
    
    public function __construct(JWTAuth $auth) {
      $this->middleware('jwt.auth');
      $auth->parseToken();
      $this->user = $auth->toUser();
    }
}
