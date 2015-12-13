<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Room;
use App\Building;
use App\Contract;

class RentBuildingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $buildings = Building::all();

        $today = new \DateTime('today');
        foreach ($buildings as &$building) {
          $roomsCount = Room::where("building_id", $building['id'])->count();
          $contractsCount = Contract::where('building_id',$building['id'])
                                ->where('end_time', '>=' , $today)
                                ->count();

          $building['contractsNumber'] = $contractsCount;
          $building['emptyNumber'] = $roomsCount - $contractsCount;
          $building['rooms_count'] = $roomsCount;
        }

        return $buildings;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return Building::find($id);
    }

}
