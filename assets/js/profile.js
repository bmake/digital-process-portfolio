$( document ).ready(function() {


    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }


    $id = getParameterByName('id');

    var loadingTimeout;
    $('#loading').hide()
        .ajaxStart(function() {
            var element = $(this);
            loadingTimeout = setTimeout(function() {
                element.show();
                $('#content').hide();
            }, 500);
        })
        .ajaxStop(function() {
            clearTimeout(loadingTimeout);
            $(this).hide();
            $('#content').show();
        });

    $.getJSON( "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows/" + $id + "?access_token=bJhldMj734uvz6wO", function( data ) {

        var converter = new showdown.Converter();

        converter.setOption('disableForced4SpacesIndentedSublists', 'true');

        $('#process-name').text(data.process_name);
        $('#authors').text(data.Authors);
        $('#abstract').html(converter.makeHtml(data.abstract));

        $('#description').text(data.description);

        switch(data.category) {
            case 'dCM':
                $categoryText = 'Digitaler Campus';
                break;
            case 'dAD':
                $categoryText = 'Digitale Verwaltung';
                break;
            case 'dT':
                $categoryText = 'Digitale Lehre';
                break;
            case 'dR':
                $categoryText = 'Digitale Forschung';
                break;
        }

        $('#category').text($categoryText);

        $('#digital-level .total').css('bottom', data.digitalization_level * 10 + '%');

        var dLevel = data.digitalization_level
        switch(true){
            case (dLevel >=0 && dLevel < 3):
                $dLevelText = "nicht digital";
                break;
            case (dLevel >= 3 && dLevel < 8):
                $dLevelText = "teilweise digital";
                break;
            case (dLevel >= 8 && dLevel <= 10):
                $dLevelText = "nicht digital";
                break;
        }

        $('#digital-level .total').text($dLevelText);
        $('#digital-level .amount').css('height', data.digitalization_level * 10 + '%');

        if(data.bpmn_model){

            $bpmn_model = "https://cdn.rawgit.com/bmake/DigitalUniversity/master/" + data.bpmn_model;

            var BpmnNavigatedViewer = window.BpmnJS;
            var bpmnViewer = new BpmnNavigatedViewer({
                container: '#canvas'
            });
            function importXML(xml) {
                bpmnViewer.importXML(xml, function(err) {
                    if (err) {
                        return console.error('could not import BPMN 2.0 diagram', err);
                    }
                    var canvas = bpmnViewer.get('canvas'),
                        overlays = bpmnViewer.get('overlays');
                    canvas.zoom('fit-viewport');
                });
            }
            $.get( $bpmn_model, importXML, 'text');
        }

        //.split(/\r|\n/)




        $('#analysis').html(converter.makeHtml(data.analysis));
        $('#improvements').html(converter.makeHtml(data.Improvements));




    }).done(function() {
        $('#content').show();
        $('#loading').hide();

    }).fail(function() {
        console.log( "error" );
        $('#content').html("<h1>Error</h1>");
    });




});