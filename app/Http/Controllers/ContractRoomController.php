<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Room;
use App\Contract;
use App\Image;
use DB;

class ContractRoomController extends AuthBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Room::with("building","contract","feeplans")->has('contract')->get();
    }

    public function contactImages($contract_id) {
        $images = Image::where('r_id',$contract_id)->select('path as img','imageable_id')->get();
        return $images;
    }

    public function roomHistory($room_id) {
      $room_contracts = Contract::withTrashed()->where('room_id', $room_id)->select('id','contractor_name', 'phone', 'end_water_degree','end_electric_degree', 'start_time', 'end_time', 'real_end_time')->get();

      foreach ($room_contracts as &$contract) {
        $images = Image::where('r_id', $contract['id'])->select('path as img','imageable_id','r_id')->get();
        $contract['images'] = $images;
      }

      return $room_contracts;
    }

}
