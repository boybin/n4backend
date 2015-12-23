<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Contract;
use App\Room;
use DB;

class ContractController extends AuthBaseController
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
              'room_sn'=>'required|max:255',
              'building_sn'=>'required|max:255',
              'contractor_name'=>'required|max:255',
              'contractor_location'=>'max:255',
              'id_number'=>'required|max:255',
              'room_id'=>'required|numeric',
              'phone'=>'required|numeric',
              'water_degree'=>'required|numeric',
              'electric_degree'=>'required|numeric',
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

        $contractInput = $request->all();
        $startTime = new \DateTime($contractInput['start_time']);
        $contract_number = $startTime->format('Ymd').'-'.$contractInput['building_sn'].$contractInput['room_sn'];
        unset($contractInput['building_sn']);
        unset($contractInput['room_sn']);
        $contract = new Contract($contractInput);
        $contract['user_id'] = $this->user['id'];
        $contract['contractor_number'] = $contract_number;


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
    public function destroy($id, Request $request)
    {
      $this->validate($request,
        [
          'room_id'=>'required|numeric',
          'water_degree'=>'required|numeric',
          'electric_degree'=>'required|numeric',
        ],
        [
          'required'=>'The :attribute field is required',
          'numeric'=>'The :attribute field must be numeric',
        ]
     );

     $deleteInput = $request->all();
     $room = Room::find($deleteInput['room_id']);
     $contract = Contract::find($id);

     try {
       DB::beginTransaction();
       $room['water_degree'] = $deleteInput['water_degree'];
       $room['electric_degree'] = $deleteInput['electric_degree'];
       if (!$room->save()) {
         abort(500, 'Destroy failed');
       }
       $contract['end_water_degree'] = $deleteInput['water_degree'];
       $contract['end_electric_degree'] = $deleteInput['electric_degree'];
       if (!$contract->save()) {
         abort(500, 'Destroy failed');
       }
       DB::commit();
     } catch(Exception $exception) {
       DB::rollBack();
       abort(500, 'Destroy failed');
     }

     return Contract::destroy($id);
    }
}
