vm = new Vue({
    el: '#item_editor',

    data: {
        artists: [],
        sleevenote: [],
        artist_ids: [],
        artist_options: []
    },

    //computed: {
    //    artist_ids: function() {
    //        return vm.sleevenote.artists.map(function() {
    //           return this.id;
    //        });
    //    }
    //},

    ready: function() {
        this.fetchArtists();
        this.id = $('#sleevenote_id').val();
        this.fetchSleevenote(this.id);

        $('#publish').click(function(e){
            $('#is_live').val(1);
        });
        $('#save').click(function(e){
            $('#is_live').val(0);
        });
        this.$watch('artist_options', function() {
           Vue.nextTick(function() {
               $('#artists').tokenize();
           });
        });
    },

    methods: {
        fetchArtists: function() {
            $.getJSON('/api/artists', function(artists) {
                vm.artists = artists;
                for (i=0; i < artists.length; i++) {
                    vm.artist_options.push({
                        text: artists[i].name,
                        value: artists[i].id
                    });
                }
            });
        },
        fetchSleevenote: function(id) {
            $.getJSON('/api/sleevenote/'+id, function(sleeve){
                vm.sleevenote = sleeve;
                result = [];
                for (i = 0; i < sleeve.artists.length; i++) {
                    result.push(sleeve.artists[i].id);
                }
                vm.$set('artist_ids', result);
            });
        }
    }
});