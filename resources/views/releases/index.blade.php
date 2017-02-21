@extends('layout')

@section('content')

    <ul id="homepage_feature">

    @foreach ($offers as $offer)

    <li class="dark_bg tk-franklin-gothic-urw-cond">
        <a href="{{ !$offer->is_oneoff ? action('OffersController@show', $offer->link_suffix) : $offer->link_suffix  }}">
            <img src="
https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/fourad/site/images/offers/carousel_images/{{ $offer->carousel_image_path }}" />
            <span class="{{ $offer->text_position }}">4AD Store:
                <span class="title"><br />{{ $offer->title }}</span>
            </span>
        </a></li>
    @endforeach

    </ul><!--homepage_feature-->
    <div class="listpage_element" id="releases_full">
    @if ($store)
	<div class="pager">
		Filter by: <a href="{{ action('ReleasesController@store_filtered', 'album') }}"><em>Albums</em></a> | <a href="{{ action('ReleasesController@store_filtered', 'single') }}"><em>Singles</em></a> | <a href="{{ action('ReleasesController@store_filtered', 'comp') }}"><em>Compilations</em></a>
	</div>
    @else
    <div class="pager">
        Filter by: <a href="{{ action('ReleasesController@filtered', 'album') }}"><em>Albums</em></a> | <a href="{{ action('ReleasesController@filtered', 'single') }}"><em>Singles</em></a> | <a href="{{ action('ReleasesController@filtered', 'comp') }}"><em>Compilations</em></a>
    </div>
    @endif

        <ul class="grid">


            @foreach ($releases as $item)
            <li class="color-shape">

                @if (($uses_us_store && $item->us_store_link) || (!$uses_us_store && $item->uk_store_link))
                <a href="{{ $uses_us_store ? $item->us_store_link : $item->uk_store_link }}">
                @else
                    <span class"notlinked">
                @endif

                    @if (! $item->packshot_url)
                        <img src="{{  asset('images/holder_packshot.jpg') }}"/>
                    @elseif (strpos($item->packshot_url, 'http') === 0)
                        <img src="{{  $item->packshot_url }}"/>
                    @else
                        <img src="https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/fourad/site/images/releases/packshots/{{ $item->packshot_url }}"/>
                    @endif
                    <br />
                    <em>{{ $item->title }}<br />by {{ $item->artist ? $item->artist->name : '?'  }}</em>
                    <div class="divide"></div>
                    {{ $item->release_date->format('jS F Y') }}
                    <p class="releases_links">


                        <a href="{{ action('ReleasesController@show', $item->id) }}">+ More Info</a>
                    </p>

                    @if (($uses_us_store && $item->us_store_link) || (!$uses_us_store && $item->uk_store_link))
                    </a>
                    @else
                    </span>
                    @endif
            </li>
            @endforeach

        </ul>

        <div class="pager">

            <ul>
                @foreach ($years as $year)
                    @if ($store)
                    <li><a href="{{ action('ReleasesController@store_filtered', [isset($format) ? $format : 'all', $year]) }}">{{ $year }}</a></li>
                    @else
                    <li><a href="{{ action('ReleasesController@filtered', [isset($format) ? $format : 'all', $year]) }}">{{ $year }}</a></li>
                    @endif
                @endforeach
            </ul>

        </div>

    </div><!--homepage_element-->
@stop

@section('additional-scripts')
    <script src="js/isotope.pkgd.min.js"></script>
    <script>
        $(document).ready(function(){
            $('#homepage_feature').slick({
                dots: true,
                autoplay: true
            });


        });

        // flatten object by concatting values
        function concatValues( obj ) {
            var value = '';
            for ( var prop in obj ) {
                value += obj[ prop ];
            }
            return value;
        }
    </script>

@stop
