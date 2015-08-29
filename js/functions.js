//Detect if Mac, Linux, Unix, Win for instructions screenshots
var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="win";
else if (navigator.appVersion.indexOf("Mac")!=-1) OSName="mac";
else if (navigator.appVersion.indexOf("X11")!=-1) OSName="unix";
else if (navigator.appVersion.indexOf("Linux")!=-1) OSName="linux";
console.log(OSName);
$( "#zone" ).append( '<div class="'+OSName+'">' );


$(".loading").hide();

function paste(src) {

  $( ".loading" ).show();

  $.post("http://p.mk/process.php", { bytes: src },
    function(result){
        $(".border").html(
          '<img src="'+result+'"/>'
        );
        $("input.output").val(result);
        $(".linkhref").html(result);
      }
    );
  $( ".loading" ).hide();

}

$(function() {
  $.pasteimage(paste);
});

$("input[type='text']").on("click", function () {
   $(this).select();
});