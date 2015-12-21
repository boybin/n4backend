<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Building;
use App\Room;
use App\Contract;
use App\FeePlan;
use App\User;
use DB;

class IndexController extends Controller
{
    public function index()
    {
      return view('rent.index');
    }

    public function status($statusType)
    {
      if (1 == $statusType) {
        $buildingNumber = Building::count();
        $roomNumber = Room::count();
        return view('rent.layouts.buildingstatus', ['buildingNumber'=>$buildingNumber,'roomNumber'=>$roomNumber]);
      } else if(2 == $statusType) {
        $roomNumber = Room::count();
        $rentedRoomNumber = Contract::count();
        $emptyRoomNumber = $roomNumber-$rentedRoomNumber;
        return view('rent.layouts.leasestatus', ['roomNumber'=>$roomNumber, 'rentedNumber'=>$rentedRoomNumber,'emptyNumber'=>$emptyRoomNumber]);
      } else if(3 == $statusType) {
        $feePlanItem = DB::select('SELECT COUNT(DISTINCT feemeta_id) as counts FROM fee_plans WHERE status=0 AND deleted_at IS NULL');
        $feePlanRentNumber = DB::select('SELECT COUNT(DISTINCT rent_id) as counts FROM fee_plans WHERE status=0 AND deleted_at IS NULL');
        return view('rent.layouts.feestatus',['feePlanNumber'=>$feePlanItem[0]->counts,'feePlanRentNumber'=>$feePlanRentNumber[0]->counts]);
      } else if(4 == $statusType) {
        $userNumber = User::count();
        return view('rent.layouts.userstatus', ['userCount'=>$userNumber]);
      }
    }
}
