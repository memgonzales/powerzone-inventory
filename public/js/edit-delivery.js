/* JavaScript file for handling the front-end of the edit delivery page */

import {
	enableButton,
	disableButton,
	hideErrorMessage,
	displayErrorMessage,
	isBlankField
} from './general-util.js';

import {isValidPhoneNumber} from './transaction-validate-util.js';

$(function() {
	/* Update the selected value in the status dropdown to reflect the value in the database. */
	$('#edit-delivery-status').val($('#edit-delivery-status-hidden').val());

	/* Validate the phone number. */
	$('#edit-delivery-customer-number').on('keyup', function() {
		if (!isValidPhoneNumber($(this).val())) {
			displayErrorMessage($('#edit-delivery-invalid-customer-number'));
			disableButton($('#confirm-edit-delivery-btn'));
		} else {
			hideErrorMessage($('#edit-delivery-invalid-customer-number'));
		}

		/* Hide the error message if no phone number isentered. */
		if ($(this).val() == '') {
			hideErrorMessage($('#edit-delivery-invalid-customer-number'));
		}
	});

	/* Perform client-side validation of all the input fields. */
	$('input').on('keyup change', function() {
		let noBlankFields = true;

		$('input').each(function() {
			if (isBlankField($(this), true)) {
				noBlankFields = false;
				disableButton($('#confirm-edit-delivery-btn'));
			}
		});

		/* Verify that there are no blank input fields. */
		if (noBlankFields && isValidPhoneNumber($('#edit-delivery-customer-number').val())) {
			enableButton($('#confirm-edit-delivery-btn'));
		}
	});

	/* Submit the form for editing the delivery details. */
	$('#edit-delivery-form').on('submit', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		e.preventDefault();

		$.ajax({
			url: '/postEditDelivery',
			method: 'POST',
			data: $('#edit-delivery-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the delivery page. */
				200: function() {
					location.href = '/getDelivery';
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
