<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Release;

class AdminReleasesController extends Controller
{
    public function index()
    {
      return view('admin.releases.index');
    }
}
