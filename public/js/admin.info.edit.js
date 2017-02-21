vm = new Vue({
   el: '#item_editor',

   data: {
       info: []
   },

    ready: function() {
        $('#publish').click(function(e){
            $('#is_live').val(1);
        });
        $('#save').click(function(e){
            $('#is_live').val(0);
        });

        this.$watch('info.body', function(a){
           Vue.nextTick(function() {
              CKEDITOR.instances['body'].setData(a);
           });
        });

        this.id = $('#info_id').val();
        this.fetchInfo(this.id);

        CKEDITOR.replace('body');
    },

    methods: {
        fetchInfo: function(id) {
            $.getJSON('/api/info/'+id, function(info) {
               vm.info = info;
            });
        }
    }
});