var FormatCheckboxes = Vue.extend({
    props: ['formats', 'format_ids'],
    methods: {
        toggle_format: function(elem)
        {
            var i = vm.selected_formats.indexOf(elem.id);
            if (i === -1)
                vm.selected_formats.push(elem.id);
            else
                vm.selected_formats.splice(i,1);
        }
    },
    template: `
    <template v-for="format in formats">
        <template v-if="format_ids.indexOf(format.id) > -1">
            <input type="checkbox"
                   class="format_chk"
                   name="formats[]"
                   value="{{ format.id }}"
                   @click="this.toggle_format(format)"
                   checked />
            {{ format.name }}
        </template>
        <template v-if="format_ids.indexOf(format.id) < 0">
            <input type="checkbox"
                   class="format_chk"
                   multiple
                   name="formats[]"
                   @click="this.toggle_format(format)"
                   value="{{ format.id }}" />
            {{ format.name }}
        </template>
        <br />
    </template>
    `
})


var TracklistEditor = Vue.extend({
    props: ['tracks', 'format', 'token'],
    methods: {
        editTrack: function(elem, csrf)
        {
            trackname = $('.trackname-'+elem.id).val();
            $.ajax({
                url: '/admin/releases/editTrack',
                type: 'PATCH',
                data: {
                    track_id: elem.id,
                    track_name: trackname,
                    _token: csrf
                },
                success: function() {

                }
            });
        },
        deleteTrack: function(elem, csrf)
        {
            this.tracks.$remove(elem);

            $.ajax({
                url: '/admin/releases/deleteTrack',
                type: 'DELETE',
                data: {
                    track_id: elem.id,
                    _token: csrf
                },
                success: function() {

                }
            });
        },
        addTrack: function(data)
        {
            if ( ! $('#track_format_id').val() )
            {
                alert('Choose a tracklist format using the dropdown first!');
                return false;
            }

            data = {
                title:      $('#track_title').val(),
                release_id: $('#release_id').val(),
                format_id:  $('#track_format_id').val(),
                _token:     this.token
            }
            this.tracks.push(data);

            $.ajax({
                url: '/admin/releases/addTrack',
                type: 'POST',
                data: data,
                success: function() {
                    // alert('BAD WOLF');
                }
            });
        }
    },
    template: `
    <ul id="list_main" class="sortable">
        <li v-for="track in tracks | exactFilterBy format in 'format_id'| orderBy 'volume_no' 'side_no' 'track_no'"  id="{{ track.id }}">

            <input class="trackname-{{ track.id  }}" value="{{ track.title }}" />{{ track.is_live }}
            <span class="list_btns">
                <a id="{{ track.id }}"
                   @click="editTrack(track, token)">Edit</a>
                <a class="list_delete"
                   @click="deleteTrack(track, token)">Delete</a>
            </span>
        </li>
    </ul>
    <label>Add a track: </label>
    <input type="text"
           id="track_title" />
    <input type="button"
           value="Add Track"
           id="add_track"
           @click="addTrack"/>
    `
})

var BuylinkAdder = Vue.extend({
    props: ['buylinks', 'token', 'release_id'],
    methods: {
        addBuylink: function(data)
        {
            $.ajax({
                url: '/admin/releases/addBuylink',
                type: 'POST',
                data: data,
                success: (response) => {
                    data.id = response.id;
                    data.is_live = true;
                    this.buylinks.push(data);
                }
            });
        },
        toggleBuylink: function(elem, csrf)
        {
            elem.is_live = ! elem.is_live;

            $.ajax({
                url: '/admin/releases/toggleBuylink',
                type: 'POST',
                data: { buylink_id: elem.id,
                    is_live: elem.is_live,
                    _token: csrf }
            });
        },
        deleteBuylink: function(elem, csrf)
        {
            this.buylinks.$remove(elem);
            $.ajax({
                url: '/admin/releases/deleteBuylink',
                type: 'DELETE',
                data: {
                    buylink_id: elem.id,
                    _token: csrf }
            });
        }
    },
    template: `
    <ul id="list_main">
        <li v-for="buylink in buylinks" :class="{'hidden' : !buylink.is_live }">
            <a class="reorder">
                <img src="/images/admin/nav.png" alt="reorder" />
            </a>
            {{ buylink.retailer }} - {{ buylink.link }}
            <span class="list_btns">
                <a class="list_hide"
                   @click="toggleBuylink(buylink, token)">{{ buylink.is_live? '' : 'Un-' }}Hide</a>
                <a class="list_delete"
                   @click="deleteBuylink(buylink, token)">Delete</a>
            </span>
        </li>
    </ul>
    <label>Add a link: </label>
        <input id="retailer"
               type="text"
               placeholder="Retailer Name"
               v-model="retailer">
        <input id="link"
               type="text"
               placeholder="link"
               v-model="link">
        <input type="button"
               value="add"
               id="add_buylink"
               @click="addBuylink({
                 retailer: retailer,
                 link: link,
                 release_id: release_id,
                 _token: token
               })">
    `
})

var RelatedReleaseAdder = Vue.extend({
    props: ['related_releases', 'releases', 'release_id', 'token'],
    methods: {
        addRelease: function(elem, title, artist, csrf)
        {
            $.ajax({
                url: '/admin/releases/addRelatedRelease',
                type: 'POST',
                data: {
                    release_id: this.release_id,
                    related_release_id: elem.id,
                    _token: csrf
                },
                success: (result) =>
                {
                    this.related_releases.push({
                        title: title,
                        artist: {name: artist},
                        packshot_url: result.packshot_url,
                        id: result.id
                    });
                }
            });
        },
        deleteRelease: function(elem, csrf)
        {
            this.related_releases.$remove(elem);

            $.ajax({
                url: '/admin/releases/deleteRelatedRelease',
                type: 'DELETE',
                data: {
                    release_id: vm.id,
                    related_release_id: elem.id,
                    _token: csrf
                }
            });
        }
    },
    template: `
     <ul id="list_main">
        <li v-for="rr in related_releases">
            <a class="reorder">
                <img src="/images/admin/nav.png"
                     alt="reorder" />
            </a>
            <img class="homepagepackshot"
                 :src="rr.packshot_url.startsWith('http')
                 ?  rr.packshot_url
                 :  'http://cdn.beggars.com/fourad/site/images/releases/packshots/'+rr.packshot_url" />
            {{ rr.artist.name }}: {{ rr.title }}
            <span class="list_btns">
                <a class="list_delete"
                   @click="deleteRelease(rr, token)">
                   Delete
                </a>
            </span>
        </li>
    </ul>

    <label>Add a release: </label>
    <input type="text"
           placeholder="search"
           v-model="release_hunter">
    <ul>
        <li v-for="r in releases | notIfEmpty release_hunter | filterBy release_hunter in 'title' 'artist_name'"
            @click="addRelease(r, r.title, r.artist.name, token)">{{ r.title }}</li>
    </ul>
    `
})


Vue.component('format-checkboxes', FormatCheckboxes);
Vue.component('tracklist-editor', TracklistEditor);
Vue.component('buylink-adder', BuylinkAdder);
Vue.component('related-release-adder', RelatedReleaseAdder);

Vue.filter('matching_format_id', function(value, format_id) {
   return value.filter(function(item) {
       return item.format_id === parseInt(format_id);
   });
});

Vue.filter('format_filter', function(value) {
    return value.filter(function(format) {
        if (format.id === 0) return true;
        return $.inArray(format.id, vm.selected_formats) > -1;
    });
});

Vue.filter('exactFilterBy', function(arr, needle, inKeyword, key) {
    if (!arr) return false;
    return arr.filter(function(i) {
       return i[key] == needle;
    });
});

Vue.filter('filterUnlessEmpty', function(array, needle, inKeyword, key, key2) {
    if (! needle) { return []; }
    var needle = needle.toLowerCase();
    return array.filter(function(item) {
      return item[key].toLowerCase().indexOf(needle) > -1
          || item[key2].toLowerCase().indexOf(needle) > -1;
   });
});

Vue.filter('notIfEmpty', function(array, needle) {
   return needle ? array : [];
});

var vm = new Vue({

   el: '#vue_container',

   data: {
     artists: [],
     artist_ids: [],
     territories: [],
     territory_ids: [],
     release: [],
     releases: [],
     related_releases: [],
     formats: [],
     format_ids: [],
     track_format: 2,
     artist_options: [],
     selected_formats: []
   },
   computed: {
       filteredTracks: function() {
           return this.release.tracks.filter(function (track) {
               return track.format_id === parseInt(vm.track_format);
           });
       }
   },
   ready: function() {
      //$('#datepicker').datepicker({
      //
      //});
      //$('#golivepicker').datetimepicker({
      //    timeFormat: 'HH:mm z'
      //});
      //CKEDITOR.replace('pressrelease');
      //
      // $('#publish').click(function(e){
      //     $('#is_live').val(1);
      // });
      // $('#save').click(function(e){
      //     $('#is_live').val(0);
      // });
      //
      // $('.format_chk').each(function(elem){
      //    vm.toggle_format(elem);
      // });
      //
      // this.$watch('artist_ids', function(a) {
      //     Vue.nextTick(function() {
      //         $('#artists').tokenize();
      //     });
      // });
      //
      //this.fetchArtists();
      this.id = $('#release_id').val();
      this.fetchRelease(this.id);
      this.fetchReleases();
      //this.fetchTerritories();
      this.fetchFormats();
      //
      //this.$watch('artists', function(a) {
      //   Vue.nextTick(function() {
      //      $('#artists').tokenize();
      //   });
      //});
      //
      this.track_format = 2;
   },

   methods: {
      fetchArtists: function() {
         $.getJSON('/api/relevantArtists', function(artists) {
            vm.artists = artists;
            for(i=0; i < artists.length; i++) {
             vm.artist_options.push({
                text: artists[i].name,
                value: artists[i].id
             });
            }
         });
      },
       fetchRelease: function(id) {
         $.getJSON('/api/release/'+id, function(release) {
            vm.release = release;
            $(release).each(function(){
               if ($(this.artists).length === 0)
               {
                   vm.artist_ids.push(0);
               }
               $(this.artists).each(function(){
                  vm.artist_ids.push(this.id);
               });
            });
            $(release.territories).each(function () {
                vm.territory_ids.push(this.id);
            });
            $(release.tracks).each(function() {
               if ( $.inArray(this.format_id, vm.format_ids) === -1)
               {
                   vm.format_ids.push(this.format_id);
                   vm.selected_formats.push(this.format_id);
               }
            });
         });
      },
      fetchReleaseImages: function(id) {
          $.getJSON('/api/release/'+id, function(release) {
             vm.release.packshot_url = release.packshot_url;
             vm.release.productshots = release.productshots;
             vm.release.alt_desktop_header_image_url = release.alt_desktop_header_image_url;
             vm.release.alt_mobile_header_image_url = release.alt_mobile_header_image_url;
          });
      },
      fetchTerritories: function() {
         $.getJSON('/api/territories', function(territories) {
            vm.territories = territories;
         });
      },
      fetchReleases: function() {
          $.getJSON('/api/relevantReleases', function(releases) {
             vm.releases = releases;
             $(vm.releases).each(function(i) {
                 if (! vm.releases[i].artist)
                 { vm.releases[i].artist_name = 'Various'; }
                 else vm.releases[i].artist_name = vm.releases[i].artist.name;
             });
          });
      },
      fetchFormats:function() {
          $.getJSON('/api/formats', function(formats) {
             vm.formats = formats;
             // vm.formats.unshift({id: 0, name: 'UNIVERSAL TRACKLIST (ALL FORMATS)'});
          });
      },
      fetchTracks: function(id) {
          $.getJSON('/api/release/' + id + '/tracks', function(tracks) {
             vm.tracks = tracks;
             format_ids = tracks.reduce(function(a, b){
                a.push(b);
                return a;
             }, []);
             vm.format_ids = format_ids;
          });
      },
      checkAllTerritories: function()
      {
          $('.chkterr').prop('checked', true);
      },
      addPackshot: function(csrf)
      {
        var release_id = $('#release_id').val();
        var the_file = $('#packshot').get(0).files[0];

        if (the_file.size > 2000000)
        {
            alert('Max filesize: 2M');
            return false;
        }

        var formData = new FormData();
        formData.append('_token', csrf);
        formData.append('photofile', the_file);
        formData.append('release_id', release_id);
        $.ajax({
           url: '/admin/releases/addPackshot',
           type: 'POST',
           data: formData,
           cache: false,
           contentType: false,
           processData: false,
           success: function() {
               vm.fetchReleaseImages(release_id);
           }
        });
      },
      addDesktopHeader: function(csrf)
      {
          var release_id = $('#release_id').val();
          var the_file = $('#alt_desktop_header_image').get(0).files[0];

          if (the_file.size > 2000000)
          {
              alert('Max filesize: 2M');
              return false;
          }

          var formData = new FormData();
          formData.append('_token', csrf);
          formData.append('photofile', the_file);
          formData.append('release_id', release_id);
          $.ajax({
             url: '/admin/releases/addDesktopHeader',
             type: 'POST',
             data: formData,
              cache: false,
              contentType: false,
              processData: false,
              success: function() {
                  vm.fetchReleaseImages(release_id);
              }
          });
      },
       addMobileHeader: function(csrf)
       {
           var release_id = $('#release_id').val();
           var the_file = $('#alt_mobile_header_image').get(0).files[0];

           if (the_file.size > 2000000)
           {
               alert('Max filesize: 2M');
               return false;
           }

           var formData = new FormData();
           formData.append('_token', csrf);
           formData.append('photofile', the_file);
           formData.append('release_id', release_id);
           $.ajax({
               url: '/admin/releases/addMobileHeader',
               type: 'POST',
               data: formData,
               cache: false,
               contentType: false,
               processData: false,
               success: function() {
                   vm.fetchReleaseImages(release_id);
               }
           });
       },
       addProductShot: function(csrf)
      {
          var the_file = $('#productshot').get(0).files[0];

          if (the_file.size > 2000000)
          {
              alert('Max filesize: 2M');
              return false;
          }

          var release_id = $('#release_id').val();

          var formData = new FormData();
          formData.append('_token', csrf);
          formData.append('photofile', the_file);
          formData.append('release_id', release_id);
          $.ajax({
             url: '/admin/releases/addProductShot',
             type: 'POST',
             data: formData,
             cache: false,
             contentType: false,
             processData: false,
             success: function() {
                vm.fetchReleaseImages(release_id);
             }
          });
      },
      addBuylink: function(data)
      {
          var release_id = $('#release_id').val();

          $.ajax({
             url: '/admin/releases/addBuylink',
             type: 'POST',
             data: data,
             success: function(response) {
                 data.id = response.id;
                 data.is_live = true;
                 vm.release.buylinks.push(data);
             }
          });
      },
      //toggleBuylink: function(elem, csrf)
      //{
      //    elem.is_live = ! elem.is_live;
      //
      //    $.ajax({
      //       url: '/admin/releases/toggleBuylink',
      //       type: 'POST',
      //       data: { buylink_id: elem.id,
      //               is_live: elem.is_live,
      //               _token: csrf }
      //    });
      //},
      //deleteBuylink: function(elem, csrf)
      //{
      //    vm.release.buylinks.$remove(elem);
      //    $.ajax({
      //       url: '/admin/releases/deleteBuylink',
      //       type: 'DELETE',
      //       data: { buylink_id: elem.id,
      //               _token: csrf }
      //    });
      //},
      //addTrack: function(data)
      //{
      //    $.ajax({
      //       url: '/admin/releases/addTrack',
      //       type: 'POST',
      //       data: data,
      //       success: function() {
      //          // alert('BAD WOLF');
      //       }
      //    });
      //},
      //editTrack: function(elem, csrf)
      //{
      //  trackname = $('.trackname-'+elem.id).val();
      //  $.ajax({
      //     url: '/admin/releases/editTrack',
      //     type: 'PATCH',
      //     data: {
      //             track_id: elem.id,
      //             track_name: trackname,
      //             _token: csrf
      //           },
      //     success: function() {
      //
      //     }
      //  });
      //},
      //deleteTrack: function(elem, csrf)
      //{
      //    vm.release.tracks.$remove(elem);
      //
      //    $.ajax({
      //       url: '/admin/releases/deleteTrack',
      //       type: 'DELETE',
      //       data: { track_id: elem.id,
      //               _token: csrf },
      //       success: function() {
      //
      //       }
      //    });
      //},
      //toggle_format: function(elem)
      //{
      //    var i = vm.selected_formats.indexOf(elem.id);
      //    if (i === -1)
      //        vm.selected_formats.push(elem.id);
      //    else
      //        vm.selected_formats.splice(i,1);
      //},
      //addRelease: function(elem, title, artist, csrf)
      //{
      //    $.ajax({
      //       url: '/admin/releases/addRelatedRelease',
      //       type: 'POST',
      //       data: {
      //           release_id: vm.id,
      //           related_release_id: elem.id,
      //           _token: csrf
      //       },
      //       success: function(result)
      //       {
      //           vm.release.related_releases.push({
      //               title: title,
      //               artist: {name: artist},
      //               id: result.id
      //           });
      //       }
      //    });
      //},
      //deleteRelease: function(elem, csrf)
      //{
      //    vm.release.related_releases.$remove(elem);
      //
      //    $.ajax({
      //       url: '/admin/releases/deleteRelatedRelease',
      //       type: 'DELETE',
      //       data: {
      //           release_id: vm.id,
      //           related_release_id: elem.id,
      //           _token: csrf
      //       }
      //    });
      //}
   }

});

Vue.filter('slugify', function (value) {
   return value.replace(/ /g,'').toLowerCase();
});

vm.$watch('release.tracks', function() {}, {
    deep: true
})
