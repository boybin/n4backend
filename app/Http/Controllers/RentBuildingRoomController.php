<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Room;
use App\Contract;

class RentBuildingRoomController extends AuthBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($buildingId)
    {
        //  $rooms = Room::with("building")
         $rooms = Room::where('building_id',$buildingId)
                    ->get();
         $today = new \DateTime('today');
         foreach ($rooms as &$room) {
           $contract = Contract::where('room_id',$room['id'])
                                //  ->where('start_time' , '<=', $today)
                                 ->where('end_time', '>=' , $today)
                                 ->get();
           if ($contract->count()>0) {
             $room['hasContract'] = 1;
             $room['contract'] = $contract[0];
           } else {
             $room['hasContract'] = 0;
           }
         }

         return $rooms;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($buildingId, $roomId)
    {
        echo $buildingId;
        echo $roomId;
    }

}
