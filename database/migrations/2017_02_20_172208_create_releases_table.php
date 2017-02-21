<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReleasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('releases', function (Blueprint $table)
        {
            $table->increments('id');
            $table->timestamps();
            $table->string('title');
            $table->integer('artist_id');
            $table->date('release_date');
            $table->date('golive_date');
            $table->string('packshot_url', 300);
            $table->string('release_type');
            $table->boolean('is_live');
            $table->boolean('store_only');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('releases');
    }
}
