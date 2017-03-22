(function($){
    $.fn.composertip = function(options) {
    
    var defaults = {
        zindex: 1000,
        fluff: 10,
        top: 0,
        side: 'left',
        customID: '',
        runArgs: {},
        runOver: function() {},
        runOut: function() {}
    };
    var options = $.extend(defaults, options);
     
    return this.each(function() {
        obj = $(this);
        tooltip = tooltipID(this, options.customID);

        $(obj).mouseover(function (event) {
            
            $('.tooltipwrapper').hide();
            // { top: topPx, left: leftPx}
            var offset = $(event.target).offset();
            var tooltip = tooltipID(this, options.customID);
                
            
            var top = offset.top + options.top;
             
            if(options.side == 'right')
            {
                var left = offset.left + $(this).width() + options.fluff;
                $(tooltip).css({position: 'absolute', top: top, left: left, 'z-index': options.zindex}); 
            }
            else
            {
                
                var right = $(document).width() - offset.left - options.fluff;
                $(tooltip).css({position: 'absolute', top: top, right: right, 'z-index': options.zindex});                  
            }
            
            $(tooltip).show();
            
            options.runOver();
        });
        
        $(obj).mouseout(function (event) {
            
            var tooltip = tooltipID(this, options.customID);
            // { top: topPx, left: leftPx}
            var offset = $(this).offset();
            
            // Find out our boundaries
            var yMax = offset.top + $(this).height();
            var yMin = offset.top;
            var xMax = offset.left + $(this).width();
            var xMin = offset.left;
            
            // Mouse position
            var posY = event.pageY;
            var posX = event.pageX;
  
            if(options.side == 'right')
            {
                 // If the pointer went out above, below or to the left hide the tooltip,
                // otherwise trust the event for the tooltip to hide itself later on
                if(posY >= yMax || posY <= yMin || posX <= xMin)
                {
                    $(tooltip).hide();
                    options.runOut();
                }                 
            }
            else
            {
                // If the pointer went out above, below or to the right hide the tooltip,
                // otherwise trust the event for the tooltip to hide itself later on
                if(posY >= yMax || posY <= yMin || posX >= xMax)
                {
                    $(tooltip).hide();
                    options.runOut();
                }              
            }
 
            
        });
        
        $(tooltip).mouseout(function (event) {
            
            // { top: topPx, left: leftPx}
            var offset = $(this).offset();
            // Find out our boundaries
            var yMax = offset.top + $(this).height();
            var yMin = offset.top;
            var xMax = offset.left + $(this).width() + options.fluff;
            var xMin = offset.left;
            
            //alert(options.fluff);
            
            // Mouse position
            var posY = event.pageY;
            var posX = event.pageX;
            
            // Only hide the tooltip if the mousepointer is outside the area
            // of the tooltip (preventing mainly the tooltip to close if
            // the pointer was pushed to a different layer)
            if(posY >= yMax || posY <= yMin || posX >= xMax || posX <= xMin)
            {
                $(this).hide();
                options.runOut();
            }
            
        });

    });
};
})(jQuery);


function tooltipID(bla, customID)
{
    if(customID != '')
    {
        return customID;      
    }
    else
        return getTipID(bla);
}

function getTipID(bla)
{
    // This might seem pretty stupid at first glance (and it is) but it's due to IE who likes to put "crap"
    // in front of everything (href and rel so far ...) when data is pulled into a document using say AJAX.
    // What below line does is remove above mentioned crap and returns the content of the "rel" attribute. 
    return $(bla).attr("rel").slice($(bla).attr("rel").lastIndexOf("#"), $(bla).attr("rel").length);
}