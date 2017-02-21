vm = new Vue({
    el: '#item_editor',

    data: {
        territories: [],
        territory_ids: [],
        storeitem: []
    },

    ready: function() {
        this.id = $('#storeitem_id').val();
        this.fetchStoreItem(this.id);
        this.fetchTerritories();
    },

    methods: {
        fetchStoreItem: function(id) {
            $.getJSON('/api/storeitem/'+id, function(item) {
               vm.$set('storeitem', item);
               $(item).each(function() {
                  $(this.territories).each(function(){
                     vm.territory_ids.push(this.id);
                  });
               });
            });
        },
        fetchTerritories: function() {
            $.getJSON('/api/territories', function(territories) {
                vm.$set('territories', territories);
            });
        }
    }
});