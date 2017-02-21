<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
          'name' => 'Matthew',
          'email' => 'matthewmarcus@beggars.com',
          'password' => bcrypt('icuryy4m'),
          'role' => 'admin'
        ]);
    }
}
