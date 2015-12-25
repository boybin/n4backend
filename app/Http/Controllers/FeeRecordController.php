<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\FeeRecord;
use App\FeePlan;
use DB;

class FeeRecordController extends AuthBaseController
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request,
          [
            'feemeta_id' => 'required|numeric',
            'rent_id' => 'required|numeric',
            'room_id' => 'required|numeric',
            'building_id' => 'required|numeric',
            'fee_plan_id' => 'required|numeric',
            'fee_name'=>'required|max:255',
            'payor'=>'required',
            'inc_fee' => 'required|numeric',
          ],
          [
            'required'=>'The :attribute field is required',
            'numeric'=>'The :attribute field must be numeric',
            'max'=>'The length of :attribute can not bigger than 255'
          ]
       );

       $feeRecordInput = $request->all();

       $feePlan = FeePlan::find($feeRecordInput['fee_plan_id']);
       $feeRecord = new FeeRecord($feeRecordInput);
       $feeRecord['user_id'] = $this->user['id'];
       try{
         DB::beginTransaction();
         if(!$feeRecord->save()) {
            abort(500, 'Could not save feeRecord');
          }

         $feePlan['current_total_fee'] = $feePlan['current_total_fee'] + $feeRecord['inc_fee'];
         if ($feePlan['current_total_fee'] >= $feePlan['fee']) {
          $feePlan['status'] = 1;
         }
         if (!$feePlan->save()){
           DB::rollBack();
           abort(500, 'Could not save feePlan');
         }
         DB::commit();
       } catch(Exception $exception){
         DB::rollBack();
         abort(500, 'Save failed');
       }

       return $feeRecord;
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

    public function forceTerminalFeePlan($rent_id) {
      $ret = [];
      $ret['status'] = 1;

      $feePlans = FeePlan::where('rent_id', $rent_id)->where('status', 0)->get();
      try {
        DB::beginTransaction();
          foreach ($feePlans as $feeplan) {
            $feerecord = [];
            $feerecord['feemeta_id'] = $feeplan['feemeta_id'];
            $feerecord['rent_id'] = $feeplan['rent_id'];
            $feerecord['room_id'] = $feeplan['room_id'];
            $feerecord['building_id'] = $feeplan['building_id'];
            $feerecord['fee_plan_id'] = $feeplan['id'];
            $feerecord['fee_name'] = $feeplan['fee_name'].'-终止费用';
            $feerecord['payor'] = $this->user['nick'];
            $feerecord['user_id'] = $this->user['id'];
            $feerecord['inc_fee'] = 0;
            $feerecord = new FeeRecord($feerecord);

            if(!$feerecord->save()) {
                DB::rollBack();
               abort(500, 'Could not save feeRecord');
             }

            $feeplan['status'] = 1;
            if (!$feeplan->save()){
              DB::rollBack();
              abort(500, 'Could not save feePlan');
            }
         }

        DB::commit();
      } catch(Exception $exception){
        DB::rollBack();
        abort(500, 'Save failed');
      }

      return $ret;
    }

    public function statisticFeeRecords(Request $request) {
      $this->validate($request,
        [
          'start_date' => 'required|Date',
          'end_date' => 'required|Date',
        ],
        [
          'required'=>'The :attribute field is required',
          'Date'=>'The :attribute field must be date format'
        ]
     );

     $queryInput = $request->all();
     $start_date_time = new \DateTime($queryInput['start_date']);
     $end_date_time = new \DateTime($queryInput['end_date']);

     $start_date = $start_date_time->format('Y-m-d').' 00:00:00';
     $end_date = $end_date_time->format('Y-m-d').' 00:00:00';

     $sum = FeeRecord::whereDate('created_at', '>=', $start_date)
                        ->whereDate('created_at', '<', $end_date)
                        ->sum('inc_fee');

     $records = FeeRecord::with([
                                  "building" => function($query){
                                    $query->select('name','id');
                                  },
                                  "contract" => function($query) {
                                    $query->withTrashed()->select('room_name','contractor_name','id');
                                  },
                                  "user" => function($query) {
                                    $query->select('name','nick','id');
                                  }
                                ]
                                )
                          ->whereDate('created_at', '>=', $start_date)
                          ->whereDate('created_at', '<', $end_date)
                          ->get();
     $ret = [
       "sums" => $sum,
       "records" => $records
     ];

     return $ret;
    }

}
