<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

abstract class AuthBaseController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected $user;
    private $request;

    public function __construct(Request $request) {
      $this->request = $request;
      $this->beforeFilter(function(){
        try {
            if (!$this->user=JWTAuth::parseToken()->authenticate()) {
              return response()->json(['token_invalid'], 401);
            }
            $accessConfig = \Config::get('rolesconfig.roles');
            $routes = $this->request->route();
            $actions = $routes->getAction();
            if (isset($actions['as'])) {
              $currentActionAs = $actions['as'];
              if ($currentActionAs) {
                $userForbidArr = $accessConfig[$this->user['role']]['forbids'];
                if ($this->forbidVisit($currentActionAs, $userForbidArr)) {
                  return response()->json(['error','access_not_allowed'], 401);
                }
              }
            }
          } catch (TokenExpiredException $e) {
            return response()->json(['error','token_expired'], $e->getStatusCode());
          } catch (TokenInvalidException $e) {
            return response()->json(['error','token_invalid'], $e->getStatusCode());
          } catch (JWTException $e) {
            return response()->json(['error'=>'token_absent'], $e->getStatusCode());
          }
       });
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
