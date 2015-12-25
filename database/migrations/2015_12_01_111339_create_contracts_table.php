<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('room_id');
            $table->unsignedInteger('building_id');
            $table->string('building_name');
            $table->string('room_name');
            $table->string('contractor_name');
            $table->string('contractor_number');
            $table->date('start_time');
            $table->date('end_time');
            $table->date('real_end_time');
            $table->string('id_number');
            $table->string('phone');
            $table->string('contractor_location');
            $table->float('water_degree');
            $table->float('end_water_degree');
            $table->float('electric_degree');
            $table->float('end_electric_degree');
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
        Schema::drop('contracts');
    }
}
