/* source: vladmalik/pasteimage https://github.com/vladmalik/pasteimage */
(function($) {
	$.pasteimage = function(callback) {
		
		var allowPaste = true;
		var foundImage = false;
		console.log('allowpaste:'+allowPaste);
		console.log('foundImage:'+foundImage);
		if(typeof(callback) == "function") {
			$.event.props.push('clipboardData');
			$(document).bind("paste", doPaste);
			if (!window.Clipboard) {
				var pasteCatcher = $(document.createElement("div"));
				pasteCatcher.attr("contenteditable","true").css({"position" : "absolute", "left" : "-999", 	width : "0", height : "0", "overflow" : "hidden", outline : 0});
				$(document.body).prepend(pasteCatcher);
			}
		}
		function doPaste(e)  { 

			if(allowPaste == true) {
				if (e.clipboardData.items) {
					var items = e.clipboardData.items;
					if (items) {
						console.log(items);
						
						for (var i = 0; i < items.length; i++) {
							if (items[i].type.indexOf("image") !== -1) {
								var blob = items[i].getAsFile();
								var reader = new FileReader();
								reader.onload = function(event){
									callback(event.target.result); 
								};
								reader.readAsDataURL(blob);
							}
						}
					} else { 
						alert("Nothing found in the clipboard!");
					}
				} else {
					pasteCatcher.get(0).focus();
					foundImage = true;
					setTimeout(checkInput, 100);
				}
			}
		}
		
		function checkInput() {	
			if(foundImage == true) {
				var child = pasteCatcher.children().last().get(0);
				if (child) {

					if (child.tagName === "IMG" && child.src.substr(0, 5) == 'data:') {
						callback(child.src);
						foundImage = false;
					} else { 
						alert("This is not an image!");
					}
					pasteCatcher.html("");
				} else { 
					alert("No children found in pastecatcher DIV.");
				}
			} else { 
				alert("No image found in the clipboard!");
			}
		}	
	}
})(jQuery);
