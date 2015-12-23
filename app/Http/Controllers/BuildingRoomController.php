<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Room;

class BuildingRoomController extends AuthBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($buildingId)
    {
      return Room::where('building_id',$buildingId)
                  ->get();
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
    public function store(Request $request, $buildingId)
    {
        //
        $this->validate($request,
            [
              'name'=>'required|max:255',
              'room_sn'=>'required|max:255',
              'water_degree'=>'required|numeric',
              'electric_degree'=>'required|numeric',
            ],
            [
              'required'=>'The :attribute field is required',
              'numeric'=>'The :attribute field must be numeric',
              'max'=>'The length of :attribute can not bigger than 255',
            ]
         );

        $room = new Room($request->all());
        $room->building_id = $buildingId;
        $room['user_id'] = $this->user['id'];
        if (!$room->save()) {
          abort(500, 'Could not save room');
        }

        return $room;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($buildingId, $roomId)
    {
        //
        echo $buildingId;
        echo $roomId;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($buildingId, $roomId)
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
    public function update(Request $request, $buildingId, $roomId)
    {
        $this->validate($request,
            [
              'name'=>'required|max:255',
              'room_sn'=>'required|max:255',
              'water_degree'=>'required|numeric',
              'electric_degree'=>'required|numeric',
            ],
            [
              'required'=>'The :attribute field is required',
              'numeric'=>'The :attribute field must be numeric',
              'max'=>'The length of :attribute can not bigger than 255',
            ]
         );
        //
        $room = Room::find($roomId);
        $input = $request->all();
        $room->fill($input);

        if (!$room->save()) {
          abort(500, 'Could not save building');
        }

        return $room;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($buildingId, $roomId)
    {
        //
        return Room::destroy($roomId);
    }
}
