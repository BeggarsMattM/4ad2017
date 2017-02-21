vm = new Vue({
    el:  '#list_main',

    data: {
        sleevenotes: []
    },

    ready: function() {
        this.fetchSleevenotes();
    },

    methods: {
        fetchSleevenotes: function() {
            $.getJSON('/api/sleevenotes', function(notes) {
               vm.$set('sleevenotes', notes);
            });
        },
        toggleHide: function(elem, csrf) {
            elem.is_live = ! elem.is_live;
            $.post('/api/sleevenote_showhide', {
                sleevenote_id: elem.id,
                _token: csrf
            }, function (data) {
               if ('success' === data){}
            });
        },
        delete: function(elem, csrf) {
            if (! confirm('Deleting is forever... sure?'))
            {
                return false;
            }
            vm.sleevenotes.$remove(elem);
            $.ajax({
               url: '/api/sleevenote_delete',
               type: 'delete',
               data: { sleevenote_id: elem.id, _token: csrf },
               success: function() {
                   // success
               }
            });
        }
    }
})