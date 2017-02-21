Vue.filter('notIfEmpty', function(array, needle) {
    return needle ? array : [];
});

vm = new Vue({
    el: "body",

    data: {
        releases: [],
        offers: []
    },

    ready: function() {
        this.fetchReleases();
        this.fetchOffers();
    },

    methods: {
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
        fetchReleases: function() {
            $.getJSON('/api/releases/skeleton', function(releases){
               vm.$set('releases', releases);
            });
        },
        fetchOffers: function() {
            $.getJSON('/api/offers', function(offers){
              vm.$set('offers', offers);
            });
        },
        toggleHide: function(elem, csrf) {
            elem.is_live = ! elem.is_live;
            $.post('/api/release_togglecurrent',
                { release_id: elem.id,
                  _token: csrf },
                function(data) {
                   // do something
                });
        },
        delete: function(elem, csrf) {
            if (!confirm('Sure you want to delete this forever?')) return false;
            vm.releases.$remove(elem);
            $.ajax({
               url: '/api/release_delete',
               type: 'delete',
               data: { release_id: elem.id, _token: csrf },
               success: function() {
                    // success
               }
            });
        },
        toggleHide_offer: function(elem, csrf) {
          console.log(elem.id);
            elem.is_current = ! elem.is_current;
            $.post('/api/offer_togglecurrent',
                { offer_id: elem.id,
                    _token: csrf },
                function(data) {
                    // do something
                });
        },
        delete_offer: function(elem, csrf) {
          console.log(elem);
            vm.offers.$remove(elem.$index);
            // $.ajax({
            //     url: '/api/offer_delete',
            //     type: 'delete',
            //     data: { offer_id: elem.id, _token: csrf },
            //     success: function() {
            //         // success
            //     }
            // });
        }
    }

});
