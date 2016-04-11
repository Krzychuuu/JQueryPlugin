$(document).ready(function (){

	$("#name").validateText();

	$("#surname").validateText({pattern: /^[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłóńśźż]*$/});

	$("#email").validateEmail();

});
