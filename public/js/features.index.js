var ReleasesDropdown = Vue.extend({
    props: ['releases', 'releaseSearch'],
    template:`
    <input type="text" v-model="releaseSearch" />
    <select name="release">
        <option v-for="release in releases | filterBy releaseSearch in 'title' 'artist.name'"
                value="{{ release.id }}">
            {{ release.artist.name }} - {{ release.title }}
        </option>
    </select>
    `
})

var AddStoreItemForm = Vue.extend({
    props: ['action', 'token', 'releases'],
    template: `
    <form id="add_storeitem" :action="action" method="POST">
        <label>Release: </label>
        <releases-dropdown :releases="releases"></releases-dropdown>
        <input type="hidden" name="_token" :value="token" />
        <input type="submit" value="+ Add a store panel item">
     </form>
     `
})

var StorePanelComponent = Vue.extend({
   props: ['action', 'token', 'releases'],
   template: `
   <div>
      <h2>Store Panel</h2>
      <add-store-item-form :action="action" :token="token" :releases="releases">
      </add-store-item-form>
   </div>
   `
})

Vue.component('store-panel-component', StorePanelComponent)
Vue.component('add-store-item-form', AddStoreItemForm);
Vue.component('releases-dropdown', ReleasesDropdown);

vm = new Vue({
    el: '#main',

    data: {
        searchKey : 1,
        releases: [],
        storeitems: []
    },

    ready: function() {
        this.fetchFeatures();
        this.fetchReleases();
        this.fetchStoreItems();
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
        fetchFeatures: function() {
            $.getJSON('/api/features', function(features) {
                vm.$set('features', features);
            });
        },
        fetchReleases: function() {
            $.getJSON('/api/releases', function(releases) {
               vm.$set('releases', releases);
                for (i = 0; i < vm.releases.length; i++)
                {
                    if (! vm.releases[i].artist) {
                        vm.releases[i].artist = { name: 'Various' };
                    }
                }
            });
        },
        fetchStoreItems: function() {
            $.getJSON('/api/storeitems', function(items) {
               vm.$set('storeitems', items);
            });
        },
        toggleHide: function(id, csrf) {
            var $feature = vm.grep(vm.features, id);
            $feature.is_live = ! $feature.is_live;
            $.post('/api/feature_showhide', { feature_id: id, _token: csrf }, function(data) {
                if ('success' === data) {
                    // success
                }
            });
        },
        move: function(elem, direction) {
           elem.pivot.display_order += direction;
        },
        delete: function(id, csrf) {
            var feature_id = vm.getIndexByAttribute(vm.features, 'id', id);
            vm.features.$remove(feature_id);
            $.ajax({
                url: '/api/feature_delete',
                type: 'delete',
                data: { feature_id: id, _token: csrf },
                success: function() {
                    // success
                }
            });
        },
        toggleHideStoreitem: function(elem, csrf)
        {
          elem.is_live = ! elem.is_live;
            $.post('/api/storeitem_showhide', { storeitem_id: elem.id, _token: csrf }, function(data) {
              if ('success' === data ) {
                  // success
              }
            });
        },
        deleteStoreitem: function(elem, csrf) {
            vm.storeitems.$remove(elem.$index);
            $.ajax({
               url: '/api/storeitem_delete',
               type: 'delete',
               data: { storeitem_id: elem.id, _token:csrf },
               success: function() {
                   // success
               }
            });
        },
    }
});

Vue.filter('territory', function(territory_id)
{
    return territory_id = 1;
});