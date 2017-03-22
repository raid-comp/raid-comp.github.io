/****************************************************
All functionality related to creating a raidcomp
****************************************************/

var dragOpacity = 0.60;

$(document).ready(function(){

	// Activate the "about" dialog	
	$('#dialog').jqm();
	$('#dialog').jqmAddClose('#close'); 
	
	// Activate spec highlighting
	enableCatHighlights("#classes .block");

	// Building blocks
	$(".block").draggable({helper: 'clone', zIndex: 100, opacity: dragOpacity, cursor: 'pointer'});
	
	// Add any blocks found in the url
	parseURL();
	
	// Make the wrapper area destroy blocks
	$("#wrapper").droppable({
		accept: ".block",
		drop: function(ev, ui)
		{
			// Only destroy blocks thats not from the classes list
			if(!$(ui.draggable).parent().is('#classes'))
			{
				$(ui.draggable).draggable("destroy").remove();
				
				// Generate the URL to link to this comp for every change
				generateURL();
				generateStacker();
                                resetClassHighlight();
			}
		}
	});
	
	// The droppable slots
	$(".slot").droppable({
		accept: ".block",
		activeClass: 'slot-active',
		hoverClass: 'slot-hover',
		greedy: true,				
		drop: function(ev, ui)
		{	
			// From the list of classes
			if($(ui.draggable).parent().is('#classes'))
			{
				// Remove any children 
				if($(this).children().length > 0)
					$(this).children().remove();
				
				ui.draggable.clone().appendTo($(this)).draggable({containment: '#wrapper', zIndex: 100, opacity: dragOpacity}).css({ top: 0, left: 0, zIndex: 75});
				
				generateStacker();
			}
			// From another slot in the raid
			else
			{
				// If this slot has a block swap with the incoming block
				if($(this).children().length > 0)
				{
					var tmp = $(this).children().html();
					
					$(this).empty();
					ui.draggable.clone().appendTo($(this)).draggable({containment: '#wrapper', zIndex: 100, opacity: dragOpacity}).css({ top: 0, left: 0, zIndex: 75, opacity: 1.0});
					
					$(ui.draggable).parent().append('<div class="block">' + tmp + '</div>').children().draggable({containment: '#wrapper', zIndex: 100, opacity: dragOpacity}).css({ top: 0, left: 0, zIndex: 75, opacity: 1.0});
					$(ui.draggable).remove();
					
					enableCatHighlights("#layout .block");
				}
				// Just add the incoming block to this slot
				else
				{
					ui.draggable.clone().appendTo($(this)).draggable({containment: '#wrapper', zIndex: 100, opacity: dragOpacity}).css({ top: 0, left: 0, zIndex: 75}).css("opacity", 1.0);
					$(ui.draggable).remove();
					
					generateStacker();
				}
			}
					
			// Generate the URL to link to this comp for every change
			generateURL();
		}
	});
	
	$(".reset").click(function() { 
		clearComposition(); 
		generateURL(); 
		generateStacker();
	} );

	tooltips();
	

	
	generateURL();
	generateStacker();
	

});

// Clear the current raid composition
function clearComposition()
{
	$(".slot .block").each(function () { $(this).remove();});
}

// Generate a URL that links to the composed raid comp
function generateURL()
{
	var url = '?c=';
	
	for(i = 1; i <= 8; i++)
		url += getComp('group' + i);
	
	$('#link').attr('href', url);
}

// Create a raid comp based on the URL
function parseURL()
{
	var max = 40;
	var groupSize = 5;
	
	var comp = gup('c');
	var regex= new RegExp("[a-z0-9]");

	if(regex.test(comp) && comp.length == max)
	{
		// set the comp for each group
		for(i = 1; i <= max/groupSize; i++)
			setComp('group' + i, comp.substr((i - 1) * groupSize, groupSize));
	}
}

// Important: for the function to, well, function the class and spec classes on the spot div has to be the first two classes in the order: class spec
function getComp(grp)
{
	var result = '';
	
	$('.' + grp + ' li').each(function () { 
		
		if($(this).html().length > 0)
		{
			// Get the class and spec classes
			var c = ($(this).children().children().attr('class')).split(' ', 2);
			
			// save the classtoken
			result += classtokens[c[0]][c[1]];
		}
		else
			result += '0';
	});
	
	return result;
}

function setComp(grp, comp)
{
	var i = 0;
	var spot = '';
	var token = '';
	
	$('.' + grp + ' li').each(function ()
	{ 
		if(comp.substr(i,1) != 0)
		{
			token = urltokens[comp.substr(i,1)];
			txt = urltoken2name[comp.substr(i,1)];
			
			spot = '<div class="block">';		
			spot += '<div class="' + token + ' spot">';
			
			spot += '<img src="/img/' + token.replace(' ', '/') + '.gif" alt="' + token.split(' ', 2)[1] + '" />';
			
			spot += '<div class="name">' + txt + '</div>';			
			spot += '</div></div>';
			
			// Add the blcok and make it "come alive"
			$(this).html(spot).children().draggable({containment: '#wrapper', zIndex: 100, opacity: dragOpacity}).css({ top: 0, left: 0, zIndex: 75});
		}
		
		i++;
	});
}