//<![CDATA[
    $(document).ready(function(){

        new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, [
            {
                title:"24",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/123433",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o1"
            },
            {
                title:"Lord Kill The Pain",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/24322",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o2"
            },
            {
                title:"Katy Song",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/39875",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o3"
            },
            {
                title:"Rollercoaster",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/49221",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o4"
            },
            {
                title:"Take Me Out",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/58821",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o5"
            },
            {
                title:"Evil",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/61234",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o6"
            },
            {
                title:"Uncle Joe",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/7942",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o7"
            },
            {
                title:"Shock Me",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/8473",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o8"
            },
            {
                title:"Cabezon",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/93124",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o9"
            },
            {
                title:"Summer Dress",
                mp3:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/03141",
                oga:"https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/Red_House_Painters/o10"
            }
        ], {
            swfPath: "../../dist/jplayer",
            supplied: "oga, mp3",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true
        });
    });
    //]]>