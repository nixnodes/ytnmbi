var items_per_row = 8;
var posts_per_row = 8;
var target_style = "--ytd-rich-grid-items-per-row:"+items_per_row+"; --ytd-rich-grid-posts-per-row:"+posts_per_row+"; --ytd-rich-grid-movies-per-row:9;";

function ytmo(ts)
{		
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver; 
	
	var oe = new MutationObserver(function(mutations, observer) {
		var e = mutations[0].target;		
		if ( e.getAttribute("style") !== ts) {
			e.setAttribute("style", ts);
		}
	});
	
	var op = new MutationObserver(function(mutations, observer) { 
		var p = document.getElementById("primary");
		if (p) {
			var t = p.firstChild;
			if ( t && t.tagName === "YTD-RICH-GRID-RENDERER" ) {
				t.setAttribute("style", ts);
				op.disconnect();
				oe.observe(t, { 
					attributes: true
				});
			}
		}
	});
	
	op.observe(document, { 
		subtree: true, childList: true,
	});
}

if ( window.location.hostname.match(/\.youtube\.com$/)) {
	ytmo(target_style);
}