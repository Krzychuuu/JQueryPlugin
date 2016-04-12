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
			$(this).next("span").remove()
			$(this).after("<span class='passwordStrength' id='passwordStrength'>Password strength: </span>");
			for(var i = 0; i < checkPassStrength($("#password1").val()); i++)
			{
				$("#passwordStrength").append("*");
			}

			checkInputs(this);
		});
		
		return this;
	};

	$.fn.validatePassword2 = function(options) 
	{
		$(this).change(function ()
		{
			$(this).toggleClass("invalid", $("#password1").val()!=$("#password2").val());
			$("#password1").val()==$("#password2").val() ? $(this).next("span").remove() : $(this).after("<span class='error' id='post'>Passwords do not match</span>");
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

	var checkPassStrength = function(temp)
	{
		console.log(temp);
		var strength = 0;
		if(temp.length > 3) strength++;
		console.log(strength);
		if(temp.length > 5) strength++;
		console.log(strength);
		if(temp.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength ++;
		console.log(strength);
		if(temp.match(/([a-zA-Z])/) && temp.match(/([0-9])/))  strength ++;
		console.log(strength);
		if(temp.length %2 == 1) strength ++;
		console.log(strength);
		return strength;
	}

})(jQuery);