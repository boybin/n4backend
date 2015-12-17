<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeePlansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_plans', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('feemeta_id');
            $table->unsignedInteger('rent_id');
            $table->unsignedInteger('room_id');
            $table->unsignedInteger('building_id');
            $table->string('fee_name');
            $table->unsignedInteger('fee');
            $table->tinyInteger('type');
            $table->unsignedInteger('current_total_fee');
            $table->date('fee_start_date');
            $table->date('fee_end_date');
            $table->date('fee_alert_date');
            $table->tinyInteger('status');
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
        Schema::drop('fee_plans');
    }
}
