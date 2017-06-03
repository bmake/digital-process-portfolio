$( document ).ready(function() {


    function getParameterByName(name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }


    $id = getParameterByName('id');


    $('body').hide();

    $.getJSON( "https://bmake.th-brandenburg.de/apps/directus/api/1/tables/process/rows/" + $id + "?access_token=bJhldMj734uvz6wO", function( data ) {
        $('#process-name').text(data.process_name);
        //$('#authors').text(data.authors);
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
        $('#digital-level .total').text('Medien-bruchfrei');
        $('#digital-level .amount').css('height', data.digitalization_level * 10 + '%');

        if(data.bpmn_model){
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
            $.get( data.bpmn_model, importXML, 'text');
        }

        $('body').show();
    });

});