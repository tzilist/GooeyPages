// DOM USER INTERACTION LOGIC////////////////////////////////////
// NOTE : jQuery methods to manipulate the users input and to render ui
//        changes.
// /////////////////////////////////////////////
  $('.rendered').toggle();
  $('.edit').attr('contenteditable', true);
  $('.content').keyup(function(){
    $('.rendered').html($('.content').text());
  });
  $('.save-button').click(function(){
    alert('This feature is not ready');
  });
  $('.toggle').click(function(){
    $(this).toggleClass('green');
  });
  $('.trender').click(function(){
    $('.rendered').toggle();
  });
