<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Contract;

class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
              'room_name'=>'required|max:255',
              'contractor_name'=>'required|max:255',
              'contractor_number'=>'required|max:255',
              'contractor_location'=>'max:255',
              'id_number'=>'required|max:255',
              'user_id'=>'required|numeric',
              'room_id'=>'required|numeric',
              'phone'=>'required|numeric',
              'building_id' =>'required|numeric',
              'start_time' =>'required|date',
              'end_time' =>'required|date',
            ],
            [
              'required'=>'The :attribute field is required',
              'numeric'=>'The :attribute field must be numeric',
              'max'=>'The length of :attribute can not bigger than 255',
              'date'=>'The :attribute field must be date format',
            ]
         );

        $contract = new Contract($request->all());

        //Just confirm no dirty data, a room can't contract with more than one user, so delete old ones.
        Contract::where("room_id", $contract['room_id'])
                  ->delete();

        //Do the save action.
        if (!$contract->save()) {
          abort(500, 'Could not save contract');
        }

        return $contract;
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      return Contract::destroy($id);
    }
}
