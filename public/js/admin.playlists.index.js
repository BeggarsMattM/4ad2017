vm = new Vue({
   el: "#list_main",

   data: {
       playlists: []
   } ,

   ready: function() {
       this.fetchPlaylists();
   },

   methods: {
       fetchPlaylists: function() {
           $.getJSON('/api/playlists', function(playlists) {
              vm.$set('playlists', playlists);
           });
       },
       toggleHide: function(elem, csrf) {
           elem.is_live = ! elem.is_live;
           $.post('/api/playlist_showhide',
               {
                   playlist_id: elem.id,
                   _token: csrf
               }, function(data) {
                   if ('success' === data) {
                        // success
                   }
               });
       },
       delete: function(elem, csrf) {
           if (! confirm('Are you sure you want to delete this forever?') ) return false;
           vm.playlists.$remove(elem);
           $.ajax({
              url: '/api/playlist_delete',
              type: 'delete',
              data: { playlist_id: elem.id, _token: csrf },
              success: function () {
                  // success
              }
           });
       }

   }
});