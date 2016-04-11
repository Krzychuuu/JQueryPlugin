(function($) {
	
	$.fn.validateText = function(options) 
	{
		var settings = $.extend({
            pattern: "^[A-Z][a-z]*$",
        }, options );

		var pattern = new RegExp(settings.pattern);

		$(this).change(function ()
		{

			if (pattern.test(this.value))
			{
				if($(this).hasClass("invalid");
				{
					$(this).removeClass("invalid")
				}
			}
			else
			{
				$(this).addClass("invalid")
			}
		});
		
		return this;
	};

	$.fn.validateEmail = function(options) 
	{
		var settings = $.extend({
            pattern: "[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}",
        }, options );

		var pattern = new RegExp(settings.pattern);

		$(this).change(function ()
		{
			if (pattern.test(this.value))
			{
				if($(this).hasClass("invalid"))
				{
					$(this).removeClass("invalid");
				}
			}
			else
			{
				$(this).addClass("invalid");
			}

		});
		
		return this;
	};

})(jQuery);