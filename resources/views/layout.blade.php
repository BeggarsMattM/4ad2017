<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
    <title>4AD</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <link rel="stylesheet" type="text/css" href="{{ elixir('css/all.css') }}" />
    <meta name="keywords" content="4AD, music, Pixies, Ariel Pink, Atlas Sound, bEEdEEgEE, Bon Iver, Camera Obscura, D.D Dumbo, Daughter, Deerhunter, Efterklang, Future Islands, Gang Gang Dance, Grimes, Holly Herndon, inc., Indians, Iron And Wine, Merchandise, Purity Ring, Scott Walker, Scott Walker + Sunn O))), SOHN, The National, Tune-Yards, U.S. Girls, Zomby,  " />
    <meta name="description" content="The official website for independent record label 4AD." />
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
    <!-- facebook meta data -->
    <meta property="fb:admins" content="843010087"/>
    <meta property="og:site_name" content="4AD"/>
    <meta property="og:title" content="The official website for independent record label 4AD."/>
    <meta property="og:description" content="The official website for independent record label 4AD."/>
    <meta property="og:type" content="band"/>
    <meta property="fb:app_id" content="262758077086297"/>
    <meta property="og:url" content="{{ isset($fb_url) ? $fb_url: "http://4ad.com" }}"/>
    <meta property="og:image" content="{{ isset($fb_image) ? $fb_image : "http://www.4ad.com/img/facebook.jpg" }}"/>

    <!-- facebook meta data -->

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <script src="//use.typekit.net/utw6jaj.js"></script>
    <script>try{Typekit.load();}catch(e){}</script>

</head>
<body>
<aside data-sidebar>
    <navigation id="mobile_nav">
        <ul>
            <li><a href="{{ url('news') }}">News</a></li>
            <li><a href="#" id="mobile_nav_artists">Artists</a>
                <div class="sub_nav">
                    <ul>
                        @foreach ($artists_for_layout as $artist)
                            <li><a href="{{ action('ArtistsController@show', $artist->id) }}">{{ $artist->name }}</a></li>
                            @endforeach
                    </ul>
                    <a href="{{ action('ArtistsController@index') }}"><em>All Artists</em></a>
                </div>
            </li>
            <li><a href="{{ url('releases') }}">Releases</a></li>
            <li><a href="{{ url('live') }}">Live</a></li>
            <li><a href="{{ url('videos') }}">Videos</a></li>
            <li><a href="{{ url('sessions') }}">Sessions</a></li>
            <li><a href="{{ url('foreword') }}">Foreword</a></li>
            <li><a href="{{ action('ReleasesController@available') }}">Store</a></li>
        </ul>
    </navigation>
</aside>
<main>
    <header>
        <h1><a href="{{ url("/") }}"><img src="{{  asset('images/logo.jpg') }}" alt="4AD home" /></a></h1>
        <navigation id="desktop_nav">

            <ul>
                <li><a href="{{ url("news") }}">News</a></li>
                <li id="artists_holder"><a href="{{ url("artists") }}" id="artists_toggle">Artists</a>


                </li>
                <li><a href="{{ url("releases")  }}">Releases</a></li>
                <li><a href="{{ url("live") }}">Live</a></li>
                <li><a href="{{ url('videos') }}">Videos</a></li>
				<li><a href="{{ url('sessions') }}">Sessions</a></li>
                <li><a href="{{ url("foreword") }}">Foreword</a></li>
                <li><a href="{{ action('ReleasesController@available')  }}">Store</a></li>
            </ul>

            <form action="{{ action('MiscController@search_results') }}" method="POST">
                <input type="text" name="q" placeholder="Search 4AD.com">
                <input type="hidden" name="_token" value="{{ csrf_token() }}" />
                <input class="tk-franklin-gothic-urw-cond" type="submit" value="search">
                <div id="cart_nav">
                    <ul class="cart_nav">
                        <li class="cart tk-franklin-gothic-urw-cond"><a href="http://smarturl.it/4adcheckout">My Cart</a></li>
                        <li class="login tk-franklin-gothic-urw-cond"><a href="http://smarturl.it/4adloginaccount">Login / Register</a></li>
                    </ul>
                </div>
            </form>
            <div class="desktop_sub_nav">
                        <ul>
                            @foreach ($artists_for_layout as $artist)
                            <li><a href="{{ action('ArtistsController@show', $artist->slug) }}">{{ $artist->name }}</a></li>
                            @endforeach

                            <li><a href="{{ action('ArtistsController@index') }}"><em>All Artists</em></a></li>
                        </ul>
                    </div>

        </navigation>
        <div id="mob_cart_nav">
            <ul class="cart_nav">
                <li class="cart tk-franklin-gothic-urw-cond"><a href="http://smarturl.it/4adcheckout">My Cart</a></li>
                <li class="login tk-franklin-gothic-urw-cond"><a href="http://smarturl.it/4adloginaccount">Login / Register</a></li>
            </ul>
        </div>
    </header>
    <a href="#" data-sidebar-button id="nav-toggle"><span></span></a>
    <div class="overlay" data-sidebar-overlay></div>

    @yield('content')

</main><!--main-->
<footer>
    <h2>Current Artists</h2>
    <ul>
        @foreach ($artists_for_layout as $artist)
        <li><a href="{{ action('ArtistsController@show', $artist->slug) }}">{{ $artist->name }}</a></li>
        @endforeach
    </ul>
    <h2>Miscellaneous</h2>
    <ul>
        <li><a href="/info#Contact">Contact</a></li>
        <li><a href="/info#Jobs">Jobs</a></li>
        <li><a href="/info#Privacy">Privacy</a></li>
        <li><a href="/info#Credits">Credits</a></li>
        <li><a href="mailto:4ad@4ad.com">4ad@4ad.com</a></li>
    </ul>
    <ul id="socials">
        <li><a target="_blank" href="https://www.facebook.com/fourad"><img src="{{ asset('images/icon_facebook.png') }}" alt="Facebook" /></a></li>
        <li><a target="_blank" href="https://twitter.com/4ad_official"><img src="{{ asset('images/icon_twitter.png') }}" alt="Twitter" /></a></li>
        <li><a target="_blank" href="https://instagram.com/4ad/"><img src="{{ asset('images/icon_instagram.png') }}" alt="Instagram" /></a></li>
        <li><a target="_blank" href="https://www.youtube.com/user/4ADRecords"><img src="{{ asset('images/icon_youtube.png') }}" alt="YouTube" /></a></li>
        <li><a target="_blank" href="https://open.spotify.com/user/4ad_official"><img src="{{ asset('images/icon_spotify.png') }}" alt="Spotify" /></a></li>
        <li><a target="_blank" href="http://tumblr.4ad.com/"><img src="{{ asset('images/icon_tumblr.png') }}" alt="Tumblr" /></a></li>
        <!--<li><a target="_blank" href="https://drip.fm/4ad"><img src="{{ asset('images/icon_drip.png') }}" alt="drip.fm" /></a></li>-->
        <li><a href="#" id="subscribetoggle2"><img src="/images/icon_list.png" alt="mailing list" /></a></li>
    		<li><form action="/subscribe.php" method="POST" accept-charset="utf-8" id="subscribeform" class="subscribeform2">
            <input placeholder="your@email.com" id="emailaddress" name="email" type="text">
            <input id="gobutton" value="Go" name="Subscribe" class="tk-franklin-gothic-urw-cond" type="submit">
        </form>
    </li>
    </ul>
</footer>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-155536-1', 'auto');
  ga('send', 'pageview');

</script>
<!-- RadiumOne code begin -->

<script type="text/javascript">

<!--

document.write('<img src="'+("https:"==document.location.protocol?"https:":"http:")+"//rs.gwallet.com/r1/pixel/x15022"+"r"+Math.round(1E7*Math.random())+'" width="1" height="1" border="0" alt=""/>');

//-->

</script>

<noscript>

<img src="https://rs.gwallet.com/r1/pixel/x15022"/>

</noscript>

<!-- RadiumOne code end -->

<!-- Google Code for 4AD - Website Retargeting Conversion Page -->


<!-- Remarketing tags may not be associated with personally identifiable information or placed on pages related to sensitive categories. For instructions on adding this tag and more information on the above requirements, read the setup guide: google.com/ads/remarketingsetup -->


<script type="text/javascript">


/* <![CDATA[ */


var google_conversion_id = 1015948457;


var google_conversion_label = "G0zKCJzl_2EQqcm45AM";


var google_custom_params = window.google_tag_params;


var google_remarketing_only = true;


/* ]]> */


</script>


<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">


</script>


<noscript>


<div style="display:inline;">


<img height="1" width="1" style="border-style:none;" alt=""


src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/1015948457/?value=1.00


&currency_code=USD&label=G0zKCJzl_2EQqcm45AM&guid=ON&script=0"/>


</div>


</noscript>

<script type="text/javascript">(function(){


  window._fbds = window._fbds || {};


  _fbds.pixelId = 589070181169027;


  var fbds = document.createElement('script');


  fbds.async = true;


  fbds.src = ('https:' == document.location.protocol ? 'https:' : 'http:') + '//connect.facebook.net/en_US/fbds.js';


  var s = document.getElementsByTagName('script')[0];


  s.parentNode.insertBefore(fbds, s);


})();


window._fbq = window._fbq || [];


window._fbq.push(["track", "PixelInitialized", {}]);


</script>


<noscript><img height="1" width="1" border="0" alt="" style="display:none" src="https://www.facebook.com/tr?id=589070181169027&amp;ev=NoScript" /></noscript>

<!-- Hotjar Tracking Code for http://4ad.com -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:195324,hjsv:5};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
</script>

<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="{{ elixir('js/all.js') }}"></script>
@yield('additional-scripts')
</body>
</html>
