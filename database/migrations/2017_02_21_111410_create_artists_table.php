<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArtistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

      Schema::drop('artists');

      Schema::create('artists', function (Blueprint $table)
      {
          $table->increments('id');
          $table->timestamps();
          $table->string('name');
          $table->string('slug');
          $table->boolean('is_live')->default(true);
          $table->boolean('is_current')->default(true);
          $table->boolean('is_deleted')->default(false);
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
