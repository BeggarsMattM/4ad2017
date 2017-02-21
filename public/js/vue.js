'use strict';

var FormatCheckboxes = Vue.extend({
    props: ['formats', 'format_ids'],
    methods: {
        toggle_format: function toggle_format(elem) {
            var i = vm.selected_formats.indexOf(elem.id);
            if (i === -1) vm.selected_formats.push(elem.id);else vm.selected_formats.splice(i, 1);
        }
    },
    template: '\n    <template v-for="format in formats">\n        <template v-if="format_ids.indexOf(format.id) > -1">\n            <input type="checkbox"\n                   class="format_chk"\n                   name="formats[]"\n                   value="{{ format.id }}"\n                   @click="this.toggle_format(format)"\n                   checked />\n            {{ format.name }}\n        </template>\n        <template v-if="format_ids.indexOf(format.id) < 0">\n            <input type="checkbox"\n                   class="format_chk"\n                   multiple\n                   name="formats[]"\n                   @click="this.toggle_format(format)"\n                   value="{{ format.id }}" />\n            {{ format.name }}\n        </template>\n        <br />\n    </template>\n    '
});

var TracklistEditor = Vue.extend({
    props: ['tracks', 'format', 'token'],
    methods: {
        editTrack: function editTrack(elem, csrf) {
            trackname = $('.trackname-' + elem.id).val();
            $.ajax({
                url: '/admin/releases/editTrack',
                type: 'PATCH',
                data: {
                    track_id: elem.id,
                    track_name: trackname,
                    _token: csrf
                },
                success: function success() {}
            });
        },
        deleteTrack: function deleteTrack(elem, csrf) {
            this.tracks.$remove(elem);

            $.ajax({
                url: '/admin/releases/deleteTrack',
                type: 'DELETE',
                data: {
                    track_id: elem.id,
                    _token: csrf
                },
                success: function success() {}
            });
        },
        addTrack: function addTrack(data) {
            if (!$('#track_format_id').val()) {
                alert('Choose a tracklist format using the dropdown first!');
                return false;
            }

            data = {
                title: $('#track_title').val(),
                release_id: $('#release_id').val(),
                format_id: $('#track_format_id').val(),
                _token: this.token
            };
            this.tracks.push(data);

            $.ajax({
                url: '/admin/releases/addTrack',
                type: 'POST',
                data: data,
                success: function success() {
                    // alert('BAD WOLF');
                }
            });
        }
    },
    template: '\n    <ul id="list_main" class="sortable">\n        <li v-for="track in tracks | exactFilterBy format in \'format_id\'| orderBy \'volume_no\' \'side_no\' \'track_no\'"  id="{{ track.id }}">\n\n            <input class="trackname-{{ track.id  }}" value="{{ track.title }}" />{{ track.is_live }}\n            <span class="list_btns">\n                <a id="{{ track.id }}"\n                   @click="editTrack(track, token)">Edit</a>\n                <a class="list_delete"\n                   @click="deleteTrack(track, token)">Delete</a>\n            </span>\n        </li>\n    </ul>\n    <label>Add a track: </label>\n    <input type="text"\n           id="track_title" />\n    <input type="button"\n           value="Add Track"\n           id="add_track"\n           @click="addTrack"/>\n    '
});

var LinkAdder = Vue.extend({
    data: {
        uk_link: [],
        us_link: []
    },
    props: ['format_ids', 'formats', 'release_id', 'token', 'links', 'selected_formats', 'tshirts'],
    computed: {
        currentFormats: function currentFormats() {
            var _this = this;

            return this.formats.filter(function (format) {
                return _this.selected_formats.indexOf(format.id) > -1;
            });
        }
    },
    methods: {
        addLinks: function addLinks(id, where, csrf) {
            var _this2 = this;

            $.ajax({
                url: '/admin/releases/addLink',
                type: 'POST',
                data: {
                    release_id: this.release_id,
                    format_id: id,
                    where: where,
                    link: $('#' + where + '_link' + id).val(),
                    _token: csrf
                },
                success: function success() {
                    vm.fetchRelease(_this2.release_id);
                }
            });
        },

        deleteLinks: function deleteLinks(id, csrf) {
            var _this3 = this;

            $.ajax({
                url: '/admin/releases/deleteLinks',
                type: 'DELETE',
                data: {
                    link_id: id,
                    _token: csrf
                },
                success: function success() {
                    vm.fetchRelease(_this3.release_id);
                }
            });
        }
    },
    template: '\n    <ul id="existingLinks">\n        <li v-for="link in links">\n            {{ link.format.name }} : {{ link.uk_link || \'[none]\' }} (UK), {{ link.us_link || \'[none]\' }} (US)\n            <input type="button" value="delete" class="delete_links" @click="deleteLinks(link.id, token)"/>\n         </li>\n    </ul>\n\n    Tshirts: {{ tshirts ? \'1\' : \'0\' }}\n\n    <ul id="links">\n        <li v-for="format in currentFormats">\n            <label>Add {{ format.name }} link: </label>\n\n            <input id="uk_link{{format.id}}"\n               type="text"\n               placeholder="uk link"/>\n            <input type="button"\n               value="add UK"\n               class="add_links_uk"\n               @click="addLinks(format.id, \'uk\', token)"/>\n\n             <input id="us_link{{format.id}}"\n               type="text"\n               placeholder="us_link"/>\n             <input type="button"\n               value="add US"\n               class="add_links_us"\n               @click="addLinks(format.id, \'us\', token)"/>\n        </li>\n    </ul>\n\n    '
});

var BuylinkAdder = Vue.extend({
    props: ['buylinks', 'token', 'release_id'],
    methods: {
        addBuylink: function addBuylink(data) {
            var _this4 = this;

            $.ajax({
                url: '/admin/releases/addBuylink',
                type: 'POST',
                data: data,
                success: function success(response) {
                    data.id = response.id;
                    data.is_live = true;
                    _this4.buylinks.push(data);
                }
            });
        },
        toggleBuylink: function toggleBuylink(elem, csrf) {
            elem.is_live = !elem.is_live;

            $.ajax({
                url: '/admin/releases/toggleBuylink',
                type: 'POST',
                data: { buylink_id: elem.id,
                    is_live: elem.is_live,
                    _token: csrf }
            });
        },
        deleteBuylink: function deleteBuylink(elem, csrf) {
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
    template: '\n    <ul id="list_main">\n        <li v-for="buylink in buylinks" :class="{\'hidden\' : !buylink.is_live }">\n            <a class="reorder">\n                <img src="/images/admin/nav.png" alt="reorder" />\n            </a>\n            {{ buylink.retailer }} - {{ buylink.link }}\n            <span class="list_btns">\n                <a class="list_hide"\n                   @click="toggleBuylink(buylink, token)">{{ buylink.is_live? \'\' : \'Un-\' }}Hide</a>\n                <a class="list_delete"\n                   @click="deleteBuylink(buylink, token)">Delete</a>\n            </span>\n        </li>\n    </ul>\n    <label>Add a link: </label>\n        <input id="retailer"\n               type="text"\n               placeholder="Retailer Name"\n               v-model="retailer">\n        <input id="link"\n               type="text"\n               placeholder="link"\n               v-model="link">\n        <input type="button"\n               value="add"\n               id="add_buylink"\n               @click="addBuylink({\n                 retailer: retailer,\n                 link: link,\n                 release_id: release_id,\n                 _token: token\n               })">\n    '
});

var RelatedReleaseAdder = Vue.extend({
    props: ['related_releases', 'releases', 'release_id', 'token'],
    methods: {
        addRelease: function addRelease(elem, title, artist, csrf) {
            var _this5 = this;

            $.ajax({
                url: '/admin/releases/addRelatedRelease',
                type: 'POST',
                data: {
                    release_id: this.release_id,
                    related_release_id: elem.id,
                    _token: csrf
                },
                success: function success(result) {
                    _this5.related_releases.push({
                        title: title,
                        artist: { name: artist },
                        packshot_url: result.packshot_url,
                        id: result.id
                    });
                }
            });
        },
        deleteRelease: function deleteRelease(elem, csrf) {
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
    template: '\n     <ul id="list_main">\n        <li v-for="rr in related_releases">\n            <a class="reorder">\n                <img src="/images/admin/nav.png"\n                     alt="reorder" />\n            </a>\n            <img class="homepagepackshot"\n                 :src="rr.packshot_url.startsWith(\'http\')\n                 ?  rr.packshot_url\n                 :  \'http://cdn.beggars.com/fourad/site/images/releases/packshots/\'+rr.packshot_url" />\n            {{ rr.artist.name }}: {{ rr.title }}\n            <span class="list_btns">\n                <a class="list_delete"\n                   @click="deleteRelease(rr, token)">\n                   Delete\n                </a>\n            </span>\n        </li>\n    </ul>\n\n    <label>Add a release: </label>\n    <input type="text"\n           placeholder="search"\n           v-model="release_hunter">\n    <ul>\n        <li v-for="r in releases | notIfEmpty release_hunter | filterBy release_hunter in \'title\' \'artist_name\'"\n            @click="addRelease(r, r.title, r.artist.name, token)">{{ r.title }}</li>\n    </ul>\n    '
});

Vue.component('format-checkboxes', FormatCheckboxes);
Vue.component('tracklist-editor', TracklistEditor);
Vue.component('buylink-adder', BuylinkAdder);
Vue.component('related-release-adder', RelatedReleaseAdder);
Vue.component('link-adder', LinkAdder);

Vue.filter('matching_format_id', function (value, format_id) {
    return value.filter(function (item) {
        return item.format_id === parseInt(format_id);
    });
});

Vue.filter('format_filter', function (value) {
    return value.filter(function (format) {
        if (format.id === 0) return true;
        return $.inArray(format.id, vm.selected_formats) > -1;
    });
});

Vue.filter('exactFilterBy', function (arr, needle, inKeyword, key) {
    if (!arr) return false;
    return arr.filter(function (i) {
        return i[key] == needle;
    });
});

Vue.filter('filterUnlessEmpty', function (array, needle, inKeyword, key, key2) {
    if (!needle) {
        return [];
    }
    var needle = needle.toLowerCase();
    return array.filter(function (item) {
        return item[key].toLowerCase().indexOf(needle) > -1 || item[key2].toLowerCase().indexOf(needle) > -1;
    });
});

Vue.filter('notIfEmpty', function (array, needle) {
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
        selected_formats: [],
        links: []
    },
    computed: {
        filteredTracks: function filteredTracks() {
            return this.release.tracks.filter(function (track) {
                return track.format_id === parseInt(vm.track_format);
            });
        }
    },
    ready: function ready() {
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
        fetchArtists: function fetchArtists() {
            $.getJSON('/api/relevantArtists', function (artists) {
                vm.artists = artists;
                for (i = 0; i < artists.length; i++) {
                    vm.artist_options.push({
                        text: artists[i].name,
                        value: artists[i].id
                    });
                }
            });
        },
        fetchRelease: function fetchRelease(id) {
            $.getJSON('/api/release/' + id, function (release) {
                vm.release = release;
                $(release).each(function () {
                    if ($(this.artists).length === 0) {
                        vm.artist_ids.push(0);
                    }
                    $(this.artists).each(function () {
                        vm.artist_ids.push(this.id);
                    });
                });
                $(release.territories).each(function () {
                    vm.territory_ids.push(this.id);
                });
                $(release.tracks).each(function () {
                    if ($.inArray(this.format_id, vm.format_ids) === -1) {
                        vm.format_ids.push(this.format_id);
                        vm.selected_formats.push(this.format_id);
                    }
                });
                vm.links = release.links;
            });
        },
        fetchReleaseImages: function fetchReleaseImages(id) {
            $.getJSON('/api/release/' + id, function (release) {
                vm.release.packshot_url = release.packshot_url;
                vm.release.productshots = release.productshots;
                vm.release.alt_desktop_header_image_url = release.alt_desktop_header_image_url;
                vm.release.alt_mobile_header_image_url = release.alt_mobile_header_image_url;
            });
        },
        fetchTerritories: function fetchTerritories() {
            $.getJSON('/api/territories', function (territories) {
                vm.territories = territories;
            });
        },
        fetchReleases: function fetchReleases() {
            $.getJSON('/api/relevantReleases', function (releases) {
                vm.releases = releases;
                $(vm.releases).each(function (i) {
                    if (!vm.releases[i].artist) {
                        vm.releases[i].artist_name = 'Various';
                    } else vm.releases[i].artist_name = vm.releases[i].artist.name;
                });
            });
        },
        fetchFormats: function fetchFormats() {
            $.getJSON('/api/formats', function (formats) {
                vm.formats = formats;
                // vm.formats.unshift({id: 0, name: 'UNIVERSAL TRACKLIST (ALL FORMATS)'});
            });
        },
        fetchTracks: function fetchTracks(id) {
            $.getJSON('/api/release/' + id + '/tracks', function (tracks) {
                vm.tracks = tracks;
                format_ids = tracks.reduce(function (a, b) {
                    a.push(b);
                    return a;
                }, []);
                vm.format_ids = format_ids;
            });
        },
        checkAllTerritories: function checkAllTerritories() {
            $('.chkterr').prop('checked', true);
        },
        addPackshot: function addPackshot(csrf) {
            var release_id = $('#release_id').val();
            var the_file = $('#packshot').get(0).files[0];

            if (the_file.size > 2000000) {
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
                success: function success() {
                    vm.fetchReleaseImages(release_id);
                }
            });
        },
        addDesktopHeader: function addDesktopHeader(csrf) {
            var release_id = $('#release_id').val();
            var the_file = $('#alt_desktop_header_image').get(0).files[0];

            if (the_file.size > 2000000) {
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
                success: function success() {
                    vm.fetchReleaseImages(release_id);
                }
            });
        },
        addMobileHeader: function addMobileHeader(csrf) {
            var release_id = $('#release_id').val();
            var the_file = $('#alt_mobile_header_image').get(0).files[0];

            if (the_file.size > 2000000) {
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
                success: function success() {
                    vm.fetchReleaseImages(release_id);
                }
            });
        },
        addProductShot: function addProductShot(csrf) {
            var the_file = $('#productshot').get(0).files[0];

            if (the_file.size > 2000000) {
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
                success: function success() {
                    vm.fetchReleaseImages(release_id);
                }
            });
        },
        addBuylink: function addBuylink(data) {
            var release_id = $('#release_id').val();

            $.ajax({
                url: '/admin/releases/addBuylink',
                type: 'POST',
                data: data,
                success: function success(response) {
                    data.id = response.id;
                    data.is_live = true;
                    vm.release.buylinks.push(data);
                }
            });
        }
    }

});

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
Vue.filter('slugify', function (value) {
    return value.replace(/ /g, '').toLowerCase();
});

vm.$watch('release.tracks', function () {}, {
    deep: true
});

$(document).ready(function () {
    $('#artists').tokenize();
    $('#datepicker').datepicker();
    $('#golivepicker').datetimepicker({
        timeFormat: 'HH:mm z'
    });
    CKEDITOR.replace('uk_press_release');
    $('#chkAllTerrs').click(function () {
        $('.chkterr').prop('checked', true);
    });
    $('#publish').click(function (e) {
        $('#is_live').val(1);
    });
    $('#save').click(function (e) {
        $('#is_live').val(0);
    });
    var release_id = $('#release_id').val();
    var csrf_token = $('[name=_token]').val();
    var addImage = function addImage(elem, action, imgFolder, callback) {

        var callback = typeof callback === 'undefined' ? function (response) {
            if ($(elem + '_img').length == 0) {
                $(elem + '_div').append('<img class="thumb" id="' + elem.substring(1) + '_img">');
            }
            $(elem + '_img').attr('src', 'http://cdn.beggars.com/fourad/site/images/releases/' + imgFolder + '/' + response);
        } : callback;

        var the_file = $(elem).get(0).files[0];

        if (the_file.size > 2000000) {
            alert('Max filesize: 2M');
            return false;
        }

        var formData = new FormData();
        formData.append('_token', csrf_token);
        formData.append('photofile', the_file);
        formData.append('release_id', release_id);
        $.ajax({
            url: '/admin/releases/' + action,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: callback
        });
    };
    var addPackshot = function addPackshot() {
        return addImage('#packshot', 'addPackshot', 'packshots');
    };
    var addDesktopHeader = function addDesktopHeader() {
        return addImage('#alt_desktop_header_image', 'addDesktopHeader', 'desktop_headers');
    };
    var addMobileHeader = function addMobileHeader() {
        return addImage('#alt_mobile_header_image', 'addMobileHeader', 'mobile_headers');
    };
    var addProductShot = function addProductShot() {
        return addImage('#productshot', 'addProductShot', 'product_shots', function () {
            window.location.reload();
        });
    };
    $('#addpackshot').click(addPackshot);
    $('#adddesktopheader').click(addDesktopHeader);
    $('#addmobileheader').click(addMobileHeader);
    $('#addproductshot').click(addProductShot);

    $('.deleteProductShot').click(function (e) {
        e.preventDefault();

        var id = $(this).attr('id');
        var url = $(this).attr('url');
        console.log("id=" + id + ";url=" + url);

        $('#productshotspan_' + id).hide();

        $.ajax({
            url: '/api/productshot_delete',
            type: 'delete',
            data: { productshot_id: id,
                url: url,
                _token: csrf_token },
            success: function success() {}
        });
    });
    $('.sortable').sortable({
        cursor: 'move',
        axis: 'y',
        update: function update(event, ui) {
            var order = $(this).sortable('toArray');
            $.post('/admin/releases/sort_tracks', { order: order,
                release_id: $('#release_id').val(),
                format_id: $('#track_format_id').val(),
                _token: csrf_token
            });
        }
    });
    //$('#add_buylink').click(function() {
    //    data = {
    //        retailer: $('#retailer').val(),
    //        link: $('#link').val(),
    //        release_id: $('#release_id').val(),
    //        _token: csrf_token
    //    };
    //    vm.addBuylink(data);
    //});
    //$('#add_track').click(function() {
    //
    //    if ( ! $('#track_format_id').val() )
    //    {
    //        alert('Choose a tracklist format using the dropdown first!');
    //        return false;
    //    }
    //
    //    data = {
    //        title:      $('#track_title').val(),
    //        release_id: vm.id,
    //        format_id:  $('#track_format_id').val(),
    //        _token:     csrf_token
    //    }
    //    vm.release.tracks.push(data);
    //    vm.addTrack(data);
    //});
});
//# sourceMappingURL=vue.js.map
