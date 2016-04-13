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
		$(this).keypress(function ()
		{
			$("#password2").val("");
			if(passInitialCheck($(this))){
				$(this).next("span").remove();
				$(this).after("<span class='passwordStrength' id='passwordStrength'>Password strength: </span>");
				for(var i = 0; i <= checkPassStrength($(this).val()); i++)
				{
					$("#passwordStrength").append("*");
				}
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

	var passInitialCheck = function(temp)
	{
		if(temp.val() == ($("#name").val()+$("#surname").val()))
		{
			$("#password1").next("span").remove();
			$("#password1").after("<span class='error'>Password cannot be like NameSurname</span>");
			return false;
		}
		if(temp.val() == $("#email").val())
		{
			$("#password1").next("span").remove();
			$("#password1").after("<span class='error'>Password cannot be like email</span>");
			return false;
		}

		return true;
	};

	var checkPassStrength = function(temp)
	{
		var strength = 0;
		if(temp.length > 3) strength++;
		if(temp.length > 5) strength++;
		if(temp.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength ++;
		if(temp.match(/([a-zA-Z])/) && temp.match(/([0-9])/))  strength ++;
		if((temp.length %2 == 1) && (temp.length > 5)) strength ++;
		for (var i = 0; i<temp.length; i++)
			{
				if(temp[i].match(/@/)) strength ++;
			}
		return strength;
	};

	$.fn.validatePostCode = function(options){
        
        var settings = $.extend({
			pattern: "[0-9]{2}-[0-9]{3}$"
		}, options);

		var pattern = new RegExp(settings.pattern);

        $(this).change(function(){
        	$(this).toggleClass("invalid", !pattern.test(this.value));
        	$(this).next("span").remove();
            pattern.test(this.value) ? getCity(this.value) : $(this).after("<span class='error' id='post'>Enter XX-XXX format</span>");    
        });
    }

    var getCity = function(tempcode)
    {
        $.ajax({
            url: "codes.json",
            type: "GET",
            dataType: "json",
            success: function(data) {
            	console.log(data);
            	console.log(tempcode);
            	$.each(data, function(key, value){
            		if(key == tempcode) $("#city").val(value);
            	});
            }
        });
    };

})(jQuery);