<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\FeePlan;
use App\Contract;
use App\FeeMeta;

class FeeMetaPlansController extends AuthBaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return FeePlan::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
      $ret['status'] = 1;

      $this->validate($request,
        [
          'id' => 'required|numeric',
          'name'=>'required|max:255',
          'type'=>'required|numeric',
          'assign_type'=>'required|numeric',
          'fee'=>'required|numeric',
          'alert' =>'required|numeric',
        ],
        [
          'required'=>'The :attribute field is required',
          'numeric'=>'The :attribute field must be numeric',
          'max'=>'The length of :attribute can not bigger than 255'
        ]
     );

     $feePlanInput = $request->all();
     if ($feePlanInput['assign_type'] == 1) {
       $allContracts = Contract::all();
     } else if($feePlanInput['assign_type'] == 2) {
       $allContracts = Contract::where('building_id', $feePlanInput['building_id'])
                                ->get();
     }


     $feePlansArr = array();

     foreach ($allContracts as $contract) {
       $feePlan['feemeta_id'] = $feePlanInput['id'];
       $feePlan['rent_id'] = $contract['id'];
       $feePlan['room_id'] = $contract['room_id'];
       $feePlan['building_id'] = $contract['building_id'];
       $feePlan['fee_name'] = $feePlanInput['name'];
       $feePlan['fee'] = $feePlanInput['fee'];
       $feePlan['status'] = 0;
       $feePlan['user_id'] = $this->user['id'];
       $feePlan['type'] = $feePlanInput['type'];
       if (FeeMeta::isYearlyType($feePlan['type'])) {
         $feePlan['fee_start_date'] = $contract['start_time'];
         $feePlan['fee_end_date'] = $contract['end_time'];
         $alertDate = new \DateTime($feePlan['fee_start_date']);
         $alertDate->add(new \DateInterval('P'.$feePlanInput['days'].'D'));
         $feePlan['fee_alert_date'] = $alertDate;
       } else {
         $feePlan['fee_alert_date'] = $feePlanInput['fee_alert_date'];
         $feePlan['fee_start_date'] = $feePlanInput['fee_start_date'];
         $feePlan['fee_end_date'] = $feePlanInput['fee_end_date'];
       }

       if(FeePlan::checkNotExistPlanned($feePlan)) {
        //build up the feeplan data and push to a array
          array_push($feePlansArr, $feePlan);
       }
     }

     if(count($feePlansArr) > 0) {
       $ret['status'] = FeePlan::insert($feePlansArr);
       if (!$ret['status']) {
        abort(500, 'Could not save fee plans');
       }
     } else {
       $ret['status'] = 0;
       $ret['desc'] = "All of the room has this kind of fee already";
     }

     return $ret;
  }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      // return FeeMeta::find($id);
    }

    public function searchFeePlans()
    {
      return FeePlan::with('contract','building')
                ->where('status',0)
                ->get();
    }

}
