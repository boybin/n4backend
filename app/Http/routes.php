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

Route::get('/rent/lease/rentboard', function () {
    return view('rent.lease.rentboard');
});

Route::get('/hotel', function () {
    return view('hotel.index');
});

Route::get('test','TestController@index');

// Using different syntax for Blade to avoid conflicts with AngularJS.
// You are well-advised to go without any Blade at all.
//Blade::setContentTags('<%', '%>'); // For variables and all things Blade.
//Blade::setEscapedContentTags('<%%', '%%>'); // For escaped data.
