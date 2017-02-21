<?php

use Illuminate\Database\Seeder;

class OffersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Offer::class, 5)->create();

        for ($i = 1; $i <= 5; $i++) {
          App\Offer::find($i)->releases()->attach(rand(1,50), [
            'is_current' => true,
            'display_order' => 0
          ]);
        }

    }
}
