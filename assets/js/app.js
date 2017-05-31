

$( document ).ready(function() {

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