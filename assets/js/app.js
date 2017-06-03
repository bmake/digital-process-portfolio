

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

            $.getJSON( "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows?in[active]=1&in[category]=" + $category + "&access_token=bJhldMj734uvz6wO", function( data ) {
                $('.process-list').html("");
                $.each(data.rows, function( key, value ) {
                    $('.process-list').append('<li><a href="profile.html?id=' + value.id + '">'+ value.process_name +'</a></li>');
                });
            });
        }
        else {
            $.getJSON( "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows?in[active]=1&access_token=bJhldMj734uvz6wO", function( data ) {
                $('.process-list').html("");
                $.each(data.rows, function( key, value ) {
                    $('.process-list').append('<li><a href="profile.html?id=' + value.id + '">'+ value.process_name +'</a></li>');
                });
            });
        }


    }








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




    $( ".nav-pane" ).click(function() {
        $category = $(this).data("category");

        $.getJSON( "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows?in[active]=1&in[category]=" + $category + "&access_token=bJhldMj734uvz6wO", function( data ) {

            $('tbody').html("");

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
    });
});