var ReleasesList = Vue.extend({
   props: ['offer', 'token'],
   methods: {
       toggleRelease: function(elem) {
           elem.pivot.is_current = ! elem.pivot.is_current;
           $.ajax({
               url: '/api/offerrelease_togglecurrent',
               type: 'POST',
               data: {
                   offer_id: vm.id,
                   release_id: elem.id,
                   _token: this.token,
                   on_off: elem.pivot.is_current ? 1 : 0
               }
           });
       },
       deleteRelease: function(elem) {
           vm.offer.releases.$remove(elem);
           $.ajax({
               url: '/api/offerrelease_delete',
               type: 'delete',
               data: {
                   offer_id: vm.id,
                   release_id: elem.id,
                   _token: this.token
               },
               success: function() {

               }
           });
       }
   },
   template: `
   <ul id="list_main" class="sortable">
        <li v-for="offer in offer.releases" :class="{ 'hidden' : !offer.pivot.is_current }">
            <a class="reorder">
                <img src="/images/admin/nav.png"
                     alt="reorder">
            </a>
            {{ offer.artist.name }} - {{ offer.title }}
            <span class="list_btns">
                <a class="list_hide"
                   @click="toggleRelease(offer)">
                   {{ offer.pivot.is_current ? 'Hide' : 'Un-Hide' }}
                </a>
                <a class="list_delete"
                   @click="deleteRelease(offer)">
                   Delete
                </a>
            </span>
        </li>
   </ul>
   `
})

Vue.component('releases-list-component', ReleasesList);

vm = new Vue({
    el: '#vue_container',

    data: {
        offer: [],
        releases: [],
        release_options: []
    },

    ready: function() {
        $('#publish').click(function(){
           $('#is_live').val(1);
        });
        $('#save').click(function(){
           $('#is_live').val(0);
        });
        this.id = $('#offer_id').val();
        this.fetchOffer(this.id);
        this.fetchReleases();
    },

    methods: {
        fetchOffer: function(id) {
            $.getJSON('/api/offer/'+id, function(offer) {
               vm.offer = offer;
            });
        },
        fetchReleases: function() {
            $.getJSON('/api/releases', function(releases) {
                vm.releases = releases;
                for (i = 0; i < releases.length; i++) {
                    var artist_name = releases[i].artist ? releases[i].artist.name : 'Various';
                    vm.release_options.push({
                        text: artist_name + " - " + releases[i].title,
                        value: releases[i].id
                    });
                }
            });
        },
        addRelease: function(csrf) {
            var selected_release = $('#releases').val();
            $.ajax({
                url: '/admin/offers/addRelease',
                type: 'POST',
                data: {
                    offer_id: this.id,
                    release_id: selected_release,
                    _token: csrf
                },
                success: function(data) {
                    vm.fetchOffer(vm.id);
                }
            });
        },
        toggleRelease: function(elem, csrf) {
            elem.pivot.is_current = ! elem.pivot.is_current;
            $.ajax({
               url: '/api/offerrelease_togglecurrent',
               type: 'POST',
               data: {
                   offer_id: vm.id,
                   release_id: elem.id,
                   _token: csrf,
                   on_off: elem.pivot.is_current ? 1 : 0
               }
            });
        },
        deleteRelease: function(elem, csrf) {
           vm.offer.releases.$remove(elem);
            $.ajax({
               url: '/api/offerrelease_delete',
               type: 'delete',
               data: {
                  offer_id: vm.id,
                  release_id: elem.id,
                  _token: csrf
               },
               success: function() {

               }
            });
        }
    }
});