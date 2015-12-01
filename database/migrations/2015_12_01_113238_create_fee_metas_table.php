<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFeeMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fee_metas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->tinyInteger('type');
            $table->decimal('fee');
            $table->tinyInteger('alert');
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
        Schema::drop('fee_metas');
    }
}
