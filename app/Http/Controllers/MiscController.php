<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MiscController extends Controller
{
    public function admin() {
      return view('admin.dashboard');
    }
}
