<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    static $password;

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'password' => $password ?: $password = bcrypt('secret'),
        'remember_token' => str_random(10),
    ];
});

$factory->define(App\Release::class, function (Faker\Generator $faker) {
  return [
    'title' => $faker->sentence,
    'artist_id' => 1,
    'release_date' => $faker->date,
    'golive_date' => \Carbon\Carbon::now(),
    'packshot_url' => 'generic.jpg',
    'release_type' => 'album',
    'is_live' => 1,
    'store_only' => 0
  ];
});

$factory->define(App\Artist::class, function (Faker\Generator $faker) {
  return [
    'name' => $faker->name,
    'slug' => $faker->slug
  ];
});

$factory->define(App\Offer::class, function (Faker\Generator $faker) {
  return [
    'title' => $faker->sentence,
    'link_suffix' => $faker->url,
    'is_dark' => false,
    'text_position' => 'btm_left',
    'add_to_carousel' => true,
    'is_current' => true,
    'carousel_image_path' => $faker->imageUrl(),
    'is_oneoff' => false,
    'display_order' => 0
  ];
});
