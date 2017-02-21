vm = new Vue({
    el: '#list_main',

    data: {
        infos: []
    },

    ready: function () {
        this.fetchInfos();
    },

    methods: {
        fetchInfos: function () {
            $.getJSON('/api/info', function (infos) {
                vm.infos = infos;
            });
        },
        toggleHide: function (elem, csrf) {
            elem.is_current = !elem.is_current
            $.post('/api/info_showhide', {
                info_id: elem.id,
                _token: csrf
            });
        },
        delete: function(elem, csrf) {
            if (! confirm('Deleting is forever... sure?'))
            {
                return false;
            }
            vm.infos.$remove(elem.$index);
            $.ajax({
                url: '/api/info_delete',
                type: 'delete',
                data: {
                    info_id: elem.id,
                    _token: csrf
                }
            })
        }
    }
});
