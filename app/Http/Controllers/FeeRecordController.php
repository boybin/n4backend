<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\FeeRecord;
use App\FeePlan;
use DB;

class FeeRecordController extends Controller
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

}
