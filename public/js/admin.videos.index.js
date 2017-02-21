vm = new Vue({
    el: 'body',

    data: {
        videos: []
    },

    ready: function () {
        this.fetchVideos();
    },

    methods: {
        fetchVideos: function () {
            $.getJSON('/api/videos', function (videos) {
                vm.$set('videos', videos);
            });
        },
        toggleHide: function(elem, csrf) {
            elem.is_live = ! elem.is_live;
            $.post('/api/video_showhide', { video_id: elem.id, _token: csrf }, function(data) {
                if ('success' === data) {
                    // success
                }
            });
        },
        delete: function(elem, csrf) {
            vm.videos.$remove(elem.$index);
            $.ajax({
               url: '/api/video_delete',
               type: 'delete',
               data: { video_id: elem.id, _token: csrf },
               success: function () {
                   // success
               }
            });
        }
    }
});