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

Route::get('/rent','IndexController@index');
// Route::get('/rent/status/{statusType}','IndexController@status');
Route::get('/rent/nav/{randonValue}','NavController@nav');

Route::get('/hotel', function () {
    return view('hotel.index');
});

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
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');

    Route::get('images/upload/{model_id}/{r_id}', 'ImageController@uploadFile');
    Route::post('images/upload/{model_id}/{r_id}', 'ImageController@uploadFile');

    Route::group(['prefix' => 'rent'], function() {
      Route::resource('buildings', 'BuildingController');
      Route::resource('buildings.rooms', 'BuildingRoomController');
      Route::resource('feemetas', 'FeeMetaController');
      Route::resource('feerecords', 'FeeRecordController');
      Route::post('feerecordstatistics','FeeRecordController@statisticFeeRecords');
      Route::resource('feemetaplans', 'FeeMetaPlansController');
      Route::post('searchfeeplans','FeeMetaPlansController@searchFeePlans');
      Route::resource('feeplanrooms', 'FeePlanRoomController');
      Route::resource('rentbuildings', 'RentBuildingController');
      Route::resource('rentrooms', 'RentRoomController');
      Route::resource('rentbuildings.rooms', 'RentBuildingRoomController');
      Route::resource('contracts', 'ContractController');
      Route::resource('contractrooms', 'ContractRoomController');
      Route::resource('contractfeeplans', 'ContractFeePlanController');
      Route::get('status/{statusType}', 'IndexController@status');
      Route::get('contractimages/{contract_id}', 'ContractRoomController@contactImages');
      Route::get('roomhistory/{room_id}', 'ContractRoomController@roomHistory');
      Route::delete('terminalcontractplans/{rent_id}','FeeRecordController@forceTerminalFeePlan');

      Route::group(['namespace' => 'User'], function(){
        Route::resource('users', 'UserController');
      });
    });

});

//Rent redirect to root view
Route::any('/rent/{undefinedRoute}', 'IndexController@index')->where('undefinedRoute', '([A-z\d-\/_.]+)?');

// Using different syntax for Blade to avoid conflicts with AngularJS.
// You are well-advised to go without any Blade at all.
// Blade::setContentTags('<%', '%>'); // For variables and all things Blade.
// Blade::setEscapedContentTags('<%%', '%%>'); // For escaped data.
