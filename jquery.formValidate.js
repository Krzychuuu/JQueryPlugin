(function($) {
	
	$.fn.validateText = function(options) 
	{
		var settings = $.extend({
			pattern: "^[A-Z][a-z]*$"
		}, options);

		var pattern = new RegExp(settings.pattern);

		$(this).change(function ()
		{
			$(this).toggleClass("invalid", !pattern.test(this.value));
			pattern.test(this.value) ? $(this).next("span").remove() : $(this).after("<span class='error' id='post'>Start with upper case</span>");
			checkInputs(this);
		});
		
		return this;
	};

	$.fn.validateEmail = function(options) 
	{
		var settings = $.extend({
            pattern: "[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}"
        }, options );

		var pattern = new RegExp(settings.pattern);

		$(this).change(function ()
		{
			$(this).toggleClass("invalid", !pattern.test(this.value));
			pattern.test(this.value) ? $(this).next("span").remove() : $(this).after("<span class='error' id='post'>Must be email format</span>");
			checkInputs(this);
		});
		
		return this;
	};

	$.fn.validatePassword1 = function(options) 
	{
		$(this).change(function ()
		{
			$("#password2").val("");
			checkInputs(this);
		});
		
		return this;
	};

	$.fn.validatePassword2 = function(options) 
	{
		$(this).change(function ()
		{
			$(this).toggleClass("invalid", $("#password1").val()!=$("#password2").val());
			checkInputs(this);
		});
		
		return this;
	};

	var checkInputs = function(obj)
	{		
		var form = $(obj).parents('form');
		var submit = form.find('input[type="submit"]');
		var inputs = form.find('input[type!="submit"]');
		
		var validated = false;
		$(inputs).each(function()
		{
			if($(this).hasClass('invalid') || !$(this).val()){
				validated = false;
				return false;
			}
			validated = true;
		});

		validated ? submit.attr('disabled',false) : submit.attr('disabled',true);
	};

})(jQuery);