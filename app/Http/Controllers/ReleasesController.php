<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Release;
use App\Offer;

class ReleasesController extends Controller
{
    public function index() {

      $releases = Release::getReleases(18);
      $years    = Release::getReleaseYears();
      $offers   = Offer::getOffers();

      return view('releases.index', compact('releases', 'offers', 'years', 'store'));

    }
}
