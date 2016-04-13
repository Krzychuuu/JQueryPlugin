$(document).ready(function (){

	$("#name").validateText();

	$("#surname").validateText({pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/});

	$("#email").validateEmail();

	$("#password1").validatePassword1();

	$("#password2").validatePassword2();

	$("#postcode").validatePostCode();

});
