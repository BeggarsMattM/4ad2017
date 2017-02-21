vm = new Vue({
   el: '#item_editor',

   data: {
     artists: [],
     video: []
   },

   ready: function() {
       this.id = $('#video_id').val();
       this.fetchVideo(this.id);
       this.fetchArtists();
   },

    methods: {
        fetchArtists: function() {
            $.getJSON('/api/artists', function(artists) {
               vm.artists = artists;
            });
        },
        fetchVideo: function(id) {
            $.getJSON('/api/video/'+id, function(video) {
               vm.video = video;
            });
        },
        addStillImage: function(csrf)
        {
            var video_id = $('#video_id').val();
            var the_file = $('#still_image').get(0).files[0];

            if (the_file.size > 2000000)
            {
                alert('Max filesize: 2M');
                return false;
            }

            var formData = new FormData();
            formData.append('_token', csrf);
            formData.append('photofile', the_file);
            formData.append('video_id', video_id);
            $.ajax({
                url: '/admin/videos/addStillImage',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function() {
                    vm.fetchVideo(video_id);
                }
            });
        }
    }
});