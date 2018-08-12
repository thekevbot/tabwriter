const $command = $('.command');
const $editor = $('#editor');

function openCmd(par){
  const command = '.command';
  const el = '<input type="text" class="command"/>';
  $(par).find(command).remove();
  $(par).append(el);
  $(par).find(command).focus();
}
function dismissCmd(){
  $command.remove();
  $editor.focus();
}
function createMarker(divider){
  var d = new Date();
  var marker = ("0" + (d.getMonth() + 1)).slice(-2) + divider + ("0" + d.getDate()).slice(-2) + divider + d.getFullYear();
  // $(this).append('<div id="' + id + '">=== ' + bookmark + ' ===<br/>==================</div>');
  return marker;
}

//Listens for paste event
document.querySelector("#editor").addEventListener("paste", function(e) {
  // e.preventDefault();
  // var text = e.clipboardData.getData("text/html");
  // document.execCommand("insertHTML", false, text);
  $('#editor').find('p').removeAttr('style');
});

var down = {};
$("#editor")
  .keydown(function(e) {
    down[e.keyCode] = true;
  })
  .keyup(function(e) {
    if ((down[91] || down[93]) && down[16] && down[222]) {
      openCmd(this);
    };
    if ((down[91] || down[93]) && down[16] && down[13]) {
      var count = $('.marker').length+1;
      $(this).append('<div class="marker" id="' + createMarker('') + '-' + count + '"><span>' + createMarker('/') + '</span></div>');
    }
    down[e.keyCode] = false;
  });

$('body').on('keydown', function(e){
  if (e.keyCode == 27 && $('.command').length){
    dismissCmd();
  }
});

$('body').on('keydown', '.command', function(e){
  if (e.which == 13){
    var cmd = $(this).val().toLowerCase();
    e.preventDefault();
    if (cmd === 'help'){
        alert('showing help');
    }
    dismissCmd();
  }
});

$('#editor').on('focus', function(){
  if ($('.command').length){
    $('.command').remove();
  }
});
