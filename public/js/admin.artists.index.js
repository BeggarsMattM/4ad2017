vm = new Vue({
    el: "body",

    data: {
        artists: []
    },

    ready: function() {
        this.fetchArtists();
    },

    methods: {
        grep: function(collection, id) {
            return $.grep(collection, function(e) {return e.id == id})[0];
        },
        getIndexByAttribute: function(collection, attr, val) {
            var result = null;
            $.each(collection, function(index, item) {
                if (item[attr].toString() == val.toString()) {
                    result = index;
                    return false;
                }
            });
            return result;
        },
        fetchArtists: function() {
            $.getJSON('/api/artists', function(artists){
               vm.$set('artists', artists);
            });
        },
        toggleHide: function($artist, csrf) {
            $artist.is_live = ! $artist.is_live;
            $.post('/api/artist_showhide', { artist_id: $artist.id, _token: csrf}, function(data) {
                if ('success' === data) {
                    // success
                }
            });
        },
        toggleCurrent: function($artist, csrf) {
          $artist.is_current = ! $artist.is_current;
          $.post('/api/artist_togglecurrent', { artist_id: $artist.id, _token: csrf}, function(data) {
              if ('success' === data) {
                  // success
              }
          });
        },
        delete: function($artist, csrf) {
            if (! confirm('Deleting is forever... sure?'))
            {
                return;
            }
            vm.artists.$remove($artist);
            $.ajax({
                url: '/api/artist_delete',
                type: 'delete',
                data: { artist_id: $artist.id, _token: csrf },
                success: function() {
                    // success
                }
            });
        }
    }
});