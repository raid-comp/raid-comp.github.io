/****************************************************
Small helper functions
****************************************************/

// Thank you https://www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// Stolen from the intraweb
function show_props(obj, obj_name) {
	   var result = "";
	   for (var i in obj)
		  result += obj_name + "." + i + " = " + obj[i] + "\n";
	   return result;
}	