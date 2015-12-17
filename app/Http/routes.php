<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});

Route::get('/rent', function () {
    return view('rent.index');
});

Route::get('/hotel', function () {
    return view('hotel.index');
});

/*
Route::get('/rent/building/{id}/roomboard',function (){
  return view(join('.',['rent', 'building', 'roomboard']));
});

Route::get('/rent/{module}/{action}',function ($module, $action){
  return view(join('.',['rent', $module, $action]));
});
Route::get('/hotel/{module}/{action}',function ($module, $action){
  return view(join('.',['hotel', $module, $action]));
});
*/
Route::get('/auth/login', function () {
    return view('auth.login');
});
Route::get('/auth/users', function () {
    return view('auth.users');
});

Route::group(['prefix' => 'api'], function()
{
    Route::resource('authenticate', 'AuthenticateController', ['only' => ['index']]);
    Route::post('authenticate', 'AuthenticateController@authenticate');
    // Route::resource('rent/building','BuildingController');
    Route::group(['prefix' => 'rent'], function() {
      Route::resource('buildings', 'BuildingController');
      Route::resource('buildings.rooms', 'BuildingRoomController');
      Route::resource('feemetas', 'FeeMetaController');
      Route::resource('feemetaplans', 'FeeMetaPlansController');
      Route::resource('rentbuildings', 'RentBuildingController');
      Route::resource('rentrooms', 'RentRoomController');
      Route::resource('rentbuildings.rooms', 'RentBuildingRoomController');
      Route::resource('contracts', 'ContractController');
      Route::resource('contractrooms', 'ContractRoomController');
    });
});

//Rent redirect to root view
Route::any('/rent/{undefinedRoute}', function ($undefinedRoute) {
    return view('rent.index');
})->where('undefinedRoute', '([A-z\d-\/_.]+)?');

// Using different syntax for Blade to avoid conflicts with AngularJS.
// You are well-advised to go without any Blade at all.
// Blade::setContentTags('<%', '%>'); // For variables and all things Blade.
// Blade::setEscapedContentTags('<%%', '%%>'); // For escaped data.
