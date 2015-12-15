<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\FeeMeta;

class FeeMetaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      return FeeMeta::all();
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
          'name'=>'required|max:255',
          'type'=>'required|numeric',
          'fee'=>'required|numeric',
          'alert' =>'required|numeric',
        ],
        [
          'required'=>'The :attribute field is required',
          'numeric'=>'The :attribute field must be numeric',
          'max'=>'The length of :attribute can not bigger than 255'
        ]
     );

      $feeMeta = new FeeMeta($request->all());
      if (!$feeMeta->save()) {
        abort(500, 'Could not save feeMeta');
      }

      return $feeMeta;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      return FeeMeta::find($id);
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
      $feeMeta = FeeMeta::find($id);
      $input = $request->all();
      $feeMeta->fill($input);

      if (!$feeMeta->save()) {
        abort(500, 'Could not save fee meta');
      }

      return $feeMeta;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      return FeeMeta::destroy($id);
    }
}
