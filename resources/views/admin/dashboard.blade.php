@extends('admin.layout')

@section('content')
<div id="main">
    <h2>Welcome {{ Auth::user()->name }}!</h2>

    <div id="index_options">
        <h3>Choose an option below to add something new or use the menu (top right) to edit existing content:</h3>
        <h4>
            <form id="add_feature" action="{{ action('AdminFeaturesController@store') }}" method="POST">
                <label>Headline: </label><input type="text" name="headline">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input type="submit" value="+ Add a homepage feature">
            </form>

            <form id="add_news" action="{{ action('AdminNewsController@store') }}" method="POST">
                <label>Headline: </label><input type="text" name="headline">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input type="submit" value="+ Add a news story" />
            </form>

            <form id="add_release"
                  action="{{ action('AdminReleasesController@store') }}"
                  method="POST">
                 <label>Title</label>
                <input type="text"
                       name="title" />
                <input type="hidden"
                       name="_token"
                       value="{{ csrf_token() }}" />
                <input type="submit"
                       value="+ Add a release" />
            </form>

            <form id="add_artist" action="{{ action('AdminArtistsController@store') }}" method="POST">
                <label>Artist Name: </label><input type="text" name="name">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input type="submit" value="+ Add a artist">
            </form>

            <form id="add_video" action="{{ action('AdminVideosController@store') }}" method="POST">
                <label>Title: </label><input type="text" name="title">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input type="submit" value="+ Add a video">
            </form>

            <form id="add_playlist"
                  action="{{ action('AdminPlaylistsController@store') }}"
                  method="POST">
                <label>Title: </label><input type="text" name="title">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input type="submit" value="+ Add a playlist">
            </form>

            <form id="add_sleevenotes"
                  action="{{ action('AdminSleevenotesController@store') }}"
                  method="POST">
                <label>Title: </label><input type="text" name="title">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input type="submit" value="+ Add a sleeve notes" />
            </form>

    </div><!--index_options-->
    <div id="passform">
        <h3>Change your password</h3>
        <form method="POST" action="/password/email">
            {!! csrf_field() !!}

            <label>Email: </label><input type="email" name="email" value="{{ old('email') }}"><br />

            <input type="submit" value="Submit">
        </form>
    </div><!--passform-->

</div><!--main-->
@stop
