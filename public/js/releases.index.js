//Vue.filter('notIfEmpty', function(array, needle) {
//    return needle ? array : [];
//});

vm = new Vue({

    el: "#releases_full",

    data: {
        events: [],
        releases: [1,2,3]
    },

    ready: function() {
        this.fetchReleases();
    },

    methods: {
        fetchReleases: function() {
            $.getJSON(location.pathname + location.search, function($releases) {
               vm.$set('releases', $releases);
               $(vm.releases.data).each(function(i){
                   item = vm.releases.data[i];
                   item.storeLink = (item.uses_us_store && item.us_store_link) || (!item.uses_us_store && item.uk_store_link);
                    if (!item.packshot_url)
                        item.packshot_url = '/images/holder_packshot.jpg';
                    else if (!item.packshot_url.startsWith('http'))
                        item.packshot_url = 'https://s3-eu-west-1.amazonaws.com/cdn.beggars.com/fourad/site/images/releases/packshots/' + item.packshot_url
               });
            });
        }
    }


    //el: "body",
    //
    //data: {
    //    releases: [],
    //    offers: []
    //},
    //
    //ready: function() {
    //    this.fetchReleases();
    //    this.fetchOffers();
    //},
    //
    //methods: {
    //    getIndexByAttribute: function(collection, attr, val) {
    //        var result = null;
    //        $.each(collection, function(index, item) {
    //            if (item[attr].toString() == val.toString()) {
    //                result = index;
    //                return false;
    //            }
    //        });
    //        return result;
    //    },
    //    fetchReleases: function() {
    //        $.getJSON('/api/releases/skeleton', function(releases){
    //           vm.$set('releases', releases);
    //        });
    //    },
    //    fetchOffers: function() {
    //        $.getJSON('/api/offers', function(offers){
    //          vm.$set('offers', offers);
    //        });
    //    },
    //    toggleHide: function(elem, csrf) {
    //        elem.is_live = ! elem.is_live;
    //        $.post('/api/release_togglecurrent',
    //            { release_id: elem.id,
    //              _token: csrf },
    //            function(data) {
    //               // do something
    //            });
    //    },
    //    delete: function(elem, csrf) {
    //        var release_index = vm.getIndexByAttribute(vm.releases, 'id', elem.id);
    //        vm.releases.$remove(release_index);
    //        $.ajax({
    //           url: '/api/release_delete',
    //           type: 'delete',
    //           data: { release_id: elem.id, _token: csrf },
    //           success: function() {
    //                // success
    //           }
    //        });
    //    },
    //    toggleHide_offer: function(elem, csrf) {
    //        elem.is_current = ! elem.is_current;
    //        $.post('/api/offer_togglecurrent',
    //            { offer_id: elem.id,
    //                _token: csrf },
    //            function(data) {
    //                // do something
    //            });
    //    },
    //    delete_offer: function(elem, csrf) {
    //        vm.offers.$remove(elem.$index);
    //        $.ajax({
    //            url: '/api/offer_delete',
    //            type: 'delete',
    //            data: { offer_id: elem.id, _token: csrf },
    //            success: function() {
    //                // success
    //            }
    //        });
    //    }
    //}

});