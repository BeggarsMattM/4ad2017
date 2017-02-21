<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::drop('offers');

        Schema::create('offers', function (Blueprint $table) {
          $table->increments('id');
          $table->timestamps();
          $table->string('title');
          $table->string('link_suffix');
          $table->boolean('is_dark');
          $table->string('text_position', 15);
          $table->boolean('add_to_carousel');
          $table->boolean('is_current');
          $table->string('carousel_image_path');
          $table->boolean('is_oneoff');
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
        //
    }
}
