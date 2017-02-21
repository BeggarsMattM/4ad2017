vm = new Vue({
    el: '#item_editor',

    data: {
        artists: [],
        artist_ids: [],
        territories: [],
        territory_ids: [],
        feature: []
    },

    ready: function() {
        this.fetchArtists();
        this.id = $('#feature_id').val();
        this.fetchTerritories();

        //this.$watch('artist_ids', function() {
        //   Vue.nextTick(function() {
        //       $('#artists').tokenize();
        //   });
        //});

        this.fetchFeature(this.id);
       // $('#artists').tokenize();

    },

    methods: {
        fetchArtists: function () {
            $.getJSON('/api/artists', function (artists) {
                vm.$set('artists', artists);
            });
        },
        fetchFeature: function(id) {
            $.getJSON('/api/feature/'+id, function(feature) {
               vm.$set('feature', feature);
               $(feature).each(function() {
                   $(this.artists).each(function(){
                     vm.artist_ids.push(this.id);
                  });
                  $(this.territories).each(function(){
                     vm.territory_ids.push(this.id);
                  });
               });
                if (vm.artist_ids.length === 0)
                {
                    $('#artists').tokenize();
                }
            });
        },
        fetchTerritories: function() {
            $.getJSON('/api/territories', function(territories) {
               vm.$set('territories', territories);
            });
        },
        checkAllTerritories: function() {
            $('.chkterr').prop('checked', true);
        },
        addDesktopHeader: function(csrf)
        {
            var feature_id = $('#feature_id').val();
            var the_file = $('#desktop_header_img').get(0).files[0];

            if (the_file.size > 2000000)
            {
                alert('Max filesize: 2M');
                return false;
            }

            var formData = new FormData();
            formData.append('_token', csrf);
            formData.append('pshotofile', the_file);
            formData.append('feature_id', feature_id);
            $.ajax({
                url: '/admin/features/addDesktopHeader',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function() {
                    vm.fetchFeature(feature_id);
                }
            });
        },
        addMobileHeader: function(csrf)
        {
            var feature_id = $('#feature_id').val();
            var the_file = $('#mobile_header_img').get(0).files[0];

            if (the_file.size > 2000000)
            {
                alert('Max filesize: 2M');
                return false;
            }

            var formData = new FormData();
            formData.append('_token', csrf);
            formData.append('photofile', the_file);
            formData.append('feature_id', feature_id);
            $.ajax({
                url: '/admin/features/addMobileHeader',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function() {
                    vm.fetchFeature(feature_id);
                }
            });
        },

    }
});
