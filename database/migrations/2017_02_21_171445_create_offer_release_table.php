<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOfferReleaseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offer_release', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->integer('offer_id');
          $table->integer('release_id');
          $table->boolean('is_current');
          $table->tinyInteger('display_order');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('offer_release');
    }
}
