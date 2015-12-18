<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeeRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_records', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('fee_plan_id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('rent_id');
            $table->unsignedInteger('building_id');
            $table->unsignedInteger('room_id');
            $table->unsignedInteger('feemeta_id');
            $table->string('fee_name');
            $table->string('payor');
            $table->unsignedInteger('inc_fee');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('fee_records');
    }
}
