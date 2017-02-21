git<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>4AD</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Cache-Control" content="no-cache" />

    <link rel="stylesheet" type="text/css" href="{{ asset('css/fouradmin.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/jquery.tokenize.css') }}">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="{{ asset('css/timepicker.css') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="//use.typekit.net/utw6jaj.js"></script>
    <script>try{Typekit.load();}catch(e){}</script>

</head>
<body>
<div id="nav">
    <p><label>You are editing content for: </label>
        <select id="admin_country" name="admin_country">
            @foreach ($territories as $territory)
            <option value="{{ $territory->id }}">{{ $territory->name }}<br/>
            @endforeach
        </select></p>
    <a href="#" id="nav_close"><img src="{{ asset('images/admin/nav_close.png') }}" alt="Close" /></a>
    <ul>
        <li><a href="{{ action('MiscController@admin') }}">Dashboard</a></li>
        <li><a href="{{ action('AdminFeaturesController@index') }}">Homepage</a></li>
        <li><a href="{{ action('AdminNewsController@index') }}">News</a></li>
        <li><a href="{{ action('AdminReleasesController@index') }}">Releases</a></li>
        <li><a href="{{ action('AdminOffersController@index') }}">Offers</a></li>
        <li><a href="{{ action('AdminArtistsController@index') }}">Artists</a></li>
        <li><a href="{{ action('AdminVideosController@index') }}">Videos</a></li>
        <li><a href="{{ action('AdminPlaylistsController@index') }}">Playlists</a></li>
        <li><a href="{{ action('AdminSleevenotesController@index') }}">Forewords</a></li>
        <li><a href="{{ action('AdminInfoSegmentsController@index') }}">Info Page</a></li>
        <li><a href="{{ action('Auth\LoginController@logout') }}">Logout</a></li>
        <li><a href="">Users</a></li>
    </ul>
</div><!--nav-->
<div id="header"><a href="#" id="nav_open"><img src="{{ asset('images/admin/nav.png') }}" alt="Nav" /></a></div>
<h1><a href="/admin"><img src="{{ asset('images/admin/logo.jpg') }}" alt="4ADmin" /></a></h1>
<div id="main">
@yield('content')
</div><!--main-->

<script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<script src="https://cdn.jsdelivr.net/vue/1.0.21/vue.min.js"></script>
<script src="{{ asset('js/vue.drag-and-drop.js') }}"></script>
<script>
    $( "#nav_open" ).click(function() {
        $( "#nav" ).fadeIn( "slow" );
        $( "#nav_open" ).fadeOut( "slow" );
    });
    $( "#nav_close" ).click(function() {
        $( "#nav" ).fadeOut( "slow" );
        $( "#nav_open" ).fadeIn( "slow" );
    });
</script>
<script src="{{ asset('vendor/react-laravel/react.js') }}"></script>
<script src="{{ asset('vendor/react-laravel/react-dom.js') }}"></script>
<script src="{{ asset('js/components.js') }}"></script>
<script src="{{ asset('vendor/react-laravel/react_ujs.js') }}"></script>
@yield('additional-scripts')
</body>
</html>
