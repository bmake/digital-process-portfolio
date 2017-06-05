

$( document ).ready(function() {

    console.log("Hash: " + $(location).attr('hash'));

    hashPageLoad($(location).attr('hash'));

    $(window).on('hashchange', function () {
        hashPageLoad($(location).attr('hash'));
    });


    function hashPageLoad($identfier){


        console.log($identfier);

        if($identfier){
            $('.header span').text($('a[href="' + $identfier + '"]').text());
            $category = $('a[href="' + $identfier + '"]').data('categoryid');
            $endpoint = "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows?in[active]=1&in[category]=" + $category + "&access_token=bJhldMj734uvz6wO";
        }
        else {
            $endpoint = 'https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows?in[active]=1&access_token=bJhldMj734uvz6wO';
        }

        var loadingTimeout;
        $('.sk-cube-grid')
            .hide()
            .ajaxStart(function() {
                var element = $(this);
                loadingTimeout = setTimeout(function() {
                    element.show();
                    $('.process-list').hide();
                }, 500);
            })
            .ajaxStop(function() {
                clearTimeout(loadingTimeout);
                $(this).hide();
                $('.process-list').show();
            });

        $.getJSON( $endpoint, function( data ) {
            $('.process-list').html("");
            $.each(data.rows, function (key, value) {
                $('.process-list').append('<li><a href="profile.html?id=' + value.id + '">' + value.process_name + '</a></li>');
            });
        }).done(function() {

        }).fail(function() {
            console.log( "error" );
            $('.process-list').html("<h1>Error</h1>");
        });
    }





/*

table
    $.getJSON( "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows?in[active]=1&access_token=bJhldMj734uvz6wO", function( data ) {
        $.each(data.rows, function( key, value ) {
            var $tr = $('<tr>').append(
                $('<th>').text(value.id),
                $('<td>').html("<a href='viewer/?src=" + value.bpmn_model + "' target='_blank'>" + value.process_name + "</a>"),
                $('<td>').text(value.abstract),
                $('<td>').text(value.digitalization_level)
            ).appendTo('tbody');
            $tr;
        });
    });
    */
});