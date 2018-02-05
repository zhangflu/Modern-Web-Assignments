$(function() {
	$('input').blur(function() {
		if (validator.isFieldValid(this.id, $(this).val()))
			$(this).parent().find('.error').text('');
		else
			$(this).parent().find('.error').text(validator.form[this.id].errorMessage).show();
	});
    $('input.reset').click(function() {
		$('.error').text('');
    });
	$('input.submit').click(function() {
		if(!validator.isFormValid()) {
			return false;
		}
	});
});