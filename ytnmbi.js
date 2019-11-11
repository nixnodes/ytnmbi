var items_per_row = 8;
var posts_per_row = 8;

function ytmo(ipr, ppr)
{	
	var target_style = "--ytd-rich-grid-items-per-row:"+ipr+"; --ytd-rich-grid-posts-per-row:"+ppr+"; --ytd-rich-grid-movies-per-row:9;";
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver; 
	
	var oe_lock = false;
	var oe = new MutationObserver(function(mutations, observer) {
		var e = mutations[0].target;		
		if ( e.getAttribute("style") !== target_style) {
			e.setAttribute("style", target_style);
		}
	});
	
	var op = new MutationObserver(function(mutations, observer) { 
		var p = document.getElementById("primary");
		if (p) {
			var t = p.firstChild;
			if ( t && t.tagName === "YTD-RICH-GRID-RENDERER" ) {
				t.setAttribute("style", target_style);
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
	ytmo(items_per_row, posts_per_row);
}