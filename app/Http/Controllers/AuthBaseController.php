<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Tymon\JWTAuth\JWTAuth;

abstract class AuthBaseController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $user;

    public function __construct(JWTAuth $auth, Request $request) {
      // $this->middleware('jwt.auth');
      $auth->parseToken();
      $this->user = $auth->toUser();
      $accessConfig = \Config::get('rolesconfig.roles');
      $routes = $request->route();
      $actions = $routes->getAction();
      $currentActionAs = $actions['as'];
      $userForbidArr = $accessConfig[$this->user['role']]['forbids'];
      if ($this->forbidVisit($currentActionAs, $userForbidArr)) {
        abort(401,'access not allowed');
      }
    }

    protected function forbidVisit($accessAs, $forbidsArr) {
        foreach ($forbidsArr as $value) {
          if(starts_with($accessAs, $value)){
            return true;
          }
        }
        return false;
    }

}
