$(function(){

  // DOM USER INTERACTION LOGIC////////////////////////////////////
  // NOTE : jQuery methods to manipulate the users input and to render ui
  //        changes.
  // /////////////////////////////////////////////
  $('.rendered').toggle();

  $('.edit').attr('contenteditable', true);

  $('.content').keyup(function(){
    $('.rendered').html($('.content').text());
  });

  $('.toggle').click(function(){
    $(this).toggleClass('green');
  });

  $('.trender').click(function(){
    $('.rendered').toggle();
  });


  // DRAG AND DROP////////////////////////////////////
  // NOTE :
  // /////////////////////////////////////////////
  var $result = $('#sortable');

  //Initialize the drop zone
  $( "#draggableIMAGE" ).draggable({
      connectToSortable: "#sortable",
      opacity: 0.7,
      helper: "clone",
      revert: "invalid"
    });

  $( "#draggableTEXT" ).draggable({
      connectToSortable: "#sortable",
      opacity: 0.7,
      helper: "clone",
      revert: "invalid"
    });
    $( "#draggableBOXEDTEXT" ).draggable({
        connectToSortable: "#sortable",
        opacity: 0.7,
        helper: "clone",
        revert: "invalid"
      });

    $( "#sortable" ).droppable({
      revert: true,
      placeholder: "ui-state-highlight",
      drop: function(e, ui) {
            console.log('element: ',e);
            outputResult(ui.draggable);
        }
    });

    function outputResult(elm) {
      var id = $(elm).prop('id'); // new way
       console.log('elementID:  ',id);
      if ( id === 'draggableTEXT' ) {
            $result.append('<p>I\'m a paragraph!</p>');
        } else if ( id === 'draggableIMAGE' ) {
            $result.append('<img src=\'/Users/robertrosario/Downloads/winning.gif\'/>');
        }
    }
});
