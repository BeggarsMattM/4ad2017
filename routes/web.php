<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index');

Route::group(['prefix' => 'admin', 'middleware' => ['auth', 'role:admin']], function () {
  Route::get('/', 'MiscController@admin');

  Route::resource('features',     'AdminFeaturesController');
  Route::resource('news',         'AdminNewsController');
  Route::resource('releases',     'AdminReleasesController');
  Route::resource('artists',      'AdminArtistsController');
  Route::resource('videos',       'AdminVideosController');
  Route::resource('playlists',    'AdminPlaylistsController');
  Route::resource('sleevenotes',  'AdminSleevenotesController');
  Route::resource('offers',       'AdminOffersController');
  Route::resource('infosegments', 'AdminInfoSegmentsController');
});
