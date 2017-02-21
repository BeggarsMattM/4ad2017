vm = new Vue({
   el: 'body',

   data: {
       searchKey : $('#admin_country').val()
   },

   ready: function() {
       this.fetchNews();
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
       fetchNews: function() {
           $.getJSON('/api/news', function(news) {
              vm.$set('news', news);
           });
       },
       toggleHide: function(id, csrf) {
           var $news_item = vm.grep(vm.news, id);
           $news_item.is_live = ! $news_item.is_live;
           $.post('/api/news_showhide', { news_id: id, _token: csrf }, function(data) {
               if ('success' === data) {
                   // success
               }
           });
       },
       delete: function(id, csrf) {
           var $news_id = vm.getIndexByAttribute(vm.news, 'id', id);
           vm.news.$remove($news_id);
           $.ajax({
              url: '/api/news_delete',
              type: 'delete',
              data: { news_id: id, _token: csrf },
              success: function() {
                // success
              }
           });
       }
   }
});

Vue.filter('territory', function(territory_id)
{
   return territory_id = 1;
});
