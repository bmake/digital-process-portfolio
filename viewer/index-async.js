/**
 * bpmn-js-seed - async
 *
 * This is an example script that loads a bpmn diagram <diagram.bpmn> and opens
 * it using the bpmn-js viewer.
 *
 * YOU NEED TO SERVE THIS FOLDER VIA A WEB SERVER (i.e. Apache) FOR THE EXAMPLE TO WORK.
 * The reason for this is that most modern web browsers do not allow AJAX requests ($.get and the like)
 * of file system resources.
 */


function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}




(function(BpmnViewer, $) {

  // create viewer
  var bpmnViewer = new BpmnViewer({
    container: '#canvas'
  });


  // import function
  function importXML(xml) {

    // import diagram
    bpmnViewer.importXML(xml, function(err) {

      if (err) {
        return console.error('could not import BPMN 2.0 diagram', err);
      }

      var canvas = bpmnViewer.get('canvas'),
          overlays = bpmnViewer.get('overlays');


      // zoom to fit full viewport
      canvas.zoom('fit-viewport');

    });
  }


    // load external diagram file via AJAX and import it
    //https://cdn.rawgit.com/EduGraph/EduGraph-Integration/master/src/main/resources/edu-graph.bpmn
  $.get(getParameterByName('src'), importXML, 'text');


})(window.BpmnJS, window.jQuery);
