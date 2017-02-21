vm = new Vue({
   el: '#item_editor',

   data: {
       artists: [],
       artist_ids: [],
       playlist: []
   },

   ready: function() {

       this.fetchArtists();
       this.id = $('#playlist_id').val();
       this.fetchPlaylist(this.id);

       $('#publish').click(function(e){
           $('#is_live').val(1);
       });
       $('#save').click(function(e){
           $('#is_live').val(0);
       });
       this.$watch('artist_ids', function() {
          Vue.nextTick(function() {
             $('#artists').tokenize();
          });
       });
   },

   methods: {
        fetchArtists: function() {
            $.getJSON('/api/artists', function(artists) {
               vm.artists = artists;
            });
        },
       fetchPlaylist: function(id) {
           $.getJSON('/api/playlist/'+id, function(playlist) {
               vm.playlist = playlist;
               $(playlist).each(function() {
                   if ($(this.artists).length === 0)
                   {
                       vm.artist_ids.push(0);
                   }
                   $(this.artists).each(function() {
                      vm.artist_ids.push(this.id);
                   });
               });
           })
       },
       addImage: function(csrf) {

           var playlist_id = $('#playlist_id').val();
           var the_file = $('#image').get(0).files[0];

           if (the_file.size > 2000000)
           {
               alert('Max filesize: 2M');
               return false;
           }

           var formData = new FormData();
           formData.append('_token', csrf);
           formData.append('image', the_file);
           formData.append('playlist_id', playlist_id);
           $.ajax({
               url: '/admin/playlists/addImage',
               type: 'POST',
               data: formData,
               cache: false,
               contentType: false,
               processData: false,
               success: function() {
                   vm.fetchPlaylist(playlist_id);
               }
           })
       }
   }
});