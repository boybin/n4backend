<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $users = User::all();
      return $users;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,
            [
              'name'=>'required|max:255|unique:users',
              'nick'=>'required|max:255',
              'email'=>'required|email:255|unique:users',
              'password'=>'required|max:255||min:6',
              'role'=>'required|numeric',
            ],
            [
              'required'=>'The :attribute field is required',
              'number'=>'The :attribute field must be number',
              'email'=>'The :attribute must be a valid email',
              'max'=>'The length of :attribute can not bigger than 255',
            ]
         );

        $user = new User($request->all());
        $user['password'] = \Hash::make($user['password']);
        if (!$user->save()) {
          abort(500, 'Could not save user');
        }

        return $user;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        $input = $request->all();
        $user->fill($input);
        $user['password'] = Hash::make($user['password']);

        if (!$user->save()) {
          abort(500, 'Could not update user');
        }

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
