$(document).ready(function() {
    $('#artists').tokenize();
    $('#datepicker').datepicker();
    $('#golivepicker').datetimepicker({
        timeFormat: 'HH:mm z'
    });
    CKEDITOR.replace('uk_press_release');
    $('#chkAllTerrs').click(function(){
        $('.chkterr').prop('checked', true);
    });
    $('#publish').click(function(e){
        $('#is_live').val(1);
    });
    $('#save').click(function(e){
        $('#is_live').val(0);
    });
    var release_id = $('#release_id').val();
    var csrf_token = $('[name=_token]').val();
    var addImage = function(elem, action, imgFolder, callback){

        var callback = (typeof callback === 'undefined')
            ? function(response) {
            if ($(elem + '_img').length == 0) {
                $(elem + '_div')
                    .append('<img class="thumb" id="'+elem.substring(1)+'_img">');
            }
            $(elem + '_img')
                .attr('src', 'http://cdn.beggars.com/fourad/site/images/releases/' + imgFolder + '/' + response);

        }
            : callback;

        var the_file = $(elem).get(0).files[0];

        if (the_file.size > 2000000)
        {
            alert('Max filesize: 2M');
            return false;
        }

        var formData = new FormData();
        formData.append('_token', csrf_token);
        formData.append('photofile', the_file);
        formData.append('release_id', release_id);
        $.ajax({
            url: '/admin/releases/'+action,
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: callback
        });
    }
    var addPackshot = function(){
        return addImage('#packshot', 'addPackshot', 'packshots')
    }
    var addDesktopHeader = function(){
        return addImage('#alt_desktop_header_image', 'addDesktopHeader', 'desktop_headers');
    };
    var addMobileHeader = function(){
        return addImage('#alt_mobile_header_image', 'addMobileHeader', 'mobile_headers');
    }
    var addProductShot = function(){
        return addImage('#productshot', 'addProductShot', 'product_shots', function() {
            window.location.reload();
        });
    }
    $('#addpackshot').click(addPackshot);
    $('#adddesktopheader').click(addDesktopHeader);
    $('#addmobileheader').click(addMobileHeader);
    $('#addproductshot').click(addProductShot);

    $('.deleteProductShot').click(function (e)
    {
        e.preventDefault();
        id = $(this).attr('id');
        url = $(this).attr('url');
        console.log("id="+id+";url="+url);

        $('#productshotspan_'+id).hide();

        $.ajax({
            url: '/api/productshot_delete',
            type: 'delete',
            data: { productshot_id: id,
                url: url,
                _token: csrf_token },
            success: function() {

            }
        });
    });
    $('.sortable').sortable({
        cursor: 'move',
        axis: 'y',
        update: function (event, ui) {
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
