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
        $buildingRet = ['buildingNumber'=>$buildingNumber,'roomNumber'=>$roomNumber];

        return $buildingRet;
      } else if(2 == $statusType) {
        $roomNumber = Room::count();
        $rentedRoomNumber = Contract::count();
        $emptyRoomNumber = $roomNumber-$rentedRoomNumber;
        $rentRet = ['roomNumber'=>$roomNumber, 'rentedNumber'=>$rentedRoomNumber,'emptyNumber'=>$emptyRoomNumber];

        return($rentRet);
      } else if(3 == $statusType) {
        $feePlanItem = DB::select('SELECT COUNT(DISTINCT feemeta_id) as counts FROM fee_plans WHERE status=0 AND deleted_at IS NULL');
        $feePlanRentNumber = DB::select('SELECT COUNT(DISTINCT rent_id) as counts FROM fee_plans WHERE status=0 AND deleted_at IS NULL');
        $feeRet = [
          'feePlanNumber' => $feePlanItem[0]->counts,
          'feePlanRentNumber' => $feePlanRentNumber[0]->counts
        ];

        return($feeRet);
      } else if(4 == $statusType) {
        $userNumber = User::count();
        $userRet = ['userCount'=>$userNumber];

        return $userRet;
      }
    }
}
