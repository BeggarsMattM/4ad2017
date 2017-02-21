Vue.filter('notIfEmpty', function(array, needle) {
   return needle ? array : [];
});

vm = new Vue({
    el: '#item_editor',

    data: {
        artists: [],
        artist_ids: [],
        artist_options: [],
        territories: [],
        territory_ids: [],
        news: []
    },

    ready: function() {
        $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd' });
        $('#golivepicker').datetimepicker({
            timeFormat: 'HH:mm z'
        });
        $('.chkterr').first().prop('checked', true);
        $('#publish').click(function(e){
            $('#is_live').val(1);
        });
        $('#save').click(function(e){
            $('#is_live').val(0);
        });

        this.$watch('news.body', function(a){
            Vue.nextTick(function() {
                CKEDITOR.instances['newsbody'].setData(a);
            });
        });
        this.$watch('artist_ids', function(a) {
            Vue.nextTick(function() {
                $('#artists').tokenize();
            });
        });

        this.fetchArtists();
        this.id = $('#news_id').val();
        this.fetchNews(this.id);
        this.fetchTerritories();


        CKEDITOR.replace('newsbody');
    },

    methods: {
        fetchArtists: function () {
            $.getJSON('/api/artists', function (artists) {
                vm.artists = artists;
                for(i=0; i < artists.length; i++) {
                    vm.artist_options.push({
                        text: artists[i].name,
                        value: artists[i].id
                    });
                }
            });
        },
        fetchNews: function(id) {
            $.getJSON('/api/news/'+id, function(news) {
               vm.news = news;
               $(news).each(function(){
                   if ($(this.artists).length === 0)
                   {
                       vm.artist_ids.push(0);
                   }
                   $(this.artists).each(function(){
                       vm.artist_ids.push(this.id);
                   });
                   $(this.territories).each(function(){
                      vm.territory_ids.push(this.id);
                   });
               });
            });
        },
        fetchTerritories: function() {
            $.getJSON('/api/territories', function(territories) {
               vm.territories = territories;
            });
        },
        addDesktopHeader: function(csrf)
        {
            var news_id = $('#news_id').val();
            var the_file = $('#desktop_header_img').get(0).files[0];

            if (the_file.size > 2000000)
            {
                alert('Max filesize: 2M');
                return false;
            }

            var formData = new FormData();
            formData.append('_token', csrf);
            formData.append('photofile', the_file);
            formData.append('news_id', news_id);
            $.ajax({
               url: '/admin/news/addDesktopHeader',
               type: 'POST',
               data: formData,
               cache: false,
               contentType: false,
               processData: false,
               success: function() {
                   vm.fetchNews(news_id);
               }
            });
        },
        addMobileHeader: function(csrf)
        {
            var news_id = $('#news_id').val();
            var the_file = $('#mobile_header_img').get(0).files[0];

            if (the_file.size > 2000000)
            {
                alert('Max filesize: 2M');
                return false;
            }

            var formData = new FormData();
            formData.append('_token', csrf);
            formData.append('photofile', the_file);
            formData.append('news_id', news_id);
            $.ajax({
                url: '/admin/news/addMobileHeader',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function() {
                    vm.fetchNews(news_id);
                }
            });
        },
        addListingImage: function(csrf)
        {
            var news_id = $('#news_id').val();
            var the_file = $('#listing_img').get(0).files[0];

            if (the_file.size > 2000000)
            {
                alert('Max filesize: 2M');
                return false;
            }

            var formData = new FormData();
            formData.append('_token', csrf);
            formData.append('photofile', the_file);
            formData.append('news_id', news_id);
            $.ajax({
                url: '/admin/news/addListingImage',
                type: 'POST',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function() {
                    vm.fetchNews(news_id);
                }
            });
        }
    }
});
