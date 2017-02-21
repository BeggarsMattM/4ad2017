vm = new Vue({
    el: '#item_editor',

    data: {
        bios: [],
        boxtest: true,
        artist: []
    },

    ready: function() {
        // this.fetchSociallinks();
        this.id = $('#artist_id').val();
        this.region = $('#admin_country').val();
        this.fetchArtist(this.id);
        this.fetchBios(this.id, this.region);
        //this.doBoxyStuff();
        // alert(vm.id);z
    },

    methods: {
        fetchArtist: function(id)
        {
            $.getJSON('/api/artist/'+id, function(artist) {
               vm.$set('artist', artist);
            });
        },
        updateSocialLink: function(linkdata)
        {
            $.ajax({
               url: '/api/update_sociallink',
               type: 'post',
               data: linkdata,
               success: function(result) {
                   linkdata.id = result.id;
                   linkdata.is_live = false;
                   vm.artist.sociallinks.push(linkdata);
               }
            });
        },
        toggleSocialLink: function(elem)
        {
            elem.is_live = !elem.is_live;
            $.post('/api/sociallink_showhide',
                {
                    sociallink_id: elem.id,
                    _token: $('#_token').val()
                }, function(data) {
                    if ('success' === data) {

                    }
                });
        },
        deleteSocialLink: function(elem) {
            vm.artist.sociallinks.$remove(elem);
            $.ajax({
                url: '/api/sociallink_delete',
                type: 'delete',
                data: { sociallink_id: elem.id, _token: $('#_token').val() },
                success: function () {
                    // success
                }
            });
        }
        ,
        fetchBios: function(artist_id, region_id)
        {
            $.getJSON('/api/artist/' + artist_id + '/bios/'+region_id, function(bios) {
               vm.bios = bios;
            });
        }
    }
});