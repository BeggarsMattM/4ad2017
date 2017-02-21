vm = new Vue({
   el: "#list_main",

   data: {
       offers: []
   },

   ready: function() {
       this.fetchOffers();
   },

   methods: {
       fetchOffers: function() {
           $.getJSON('/api/offers', function(offers){
              vm.$set('offers', offers);
           });
       },
       toggleHide: function(elem, csrf) {
           elem.is_current = ! elem.is_current;
           $.post('/api/offer_togglecurrent',
               { offer_id: elem.id,
                 _token: csrf },
               function(data) {
                   // do anything
               });
       },
       delete: function(elem, csrf) {
           if (! confirm('Are you sure you want to delete this forever?')) return;
           vm.offers.$remove(elem.$index);
           $.ajax({
              url: '/api/offer_delete',
              type: 'delete',
              data: { offer_id: elem.id, _token: csrf },
              success: function () {

              }
           });
       }
   }
});