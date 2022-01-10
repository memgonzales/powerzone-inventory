import {
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow,
	getStatusFromIcon
} from './transaction-util.js';

import {
	extractId,
	toTwoDecimalPlaces
} from './general-util.js';

$(function() {
	$('.prices').each(function() {
		$(this).text('₱ ' + toTwoDecimalPlaces($(this).text().substring(2)));
	});

	$('.edit-transaction-clickable').each(function() {
		const transactionId = extractId($(this).attr('id'));

		if (getStatusFromIcon($('#status-img-' + transactionId).attr('src')) == 'completed') {
			$('#edit-' + transactionId).css('pointer-events', 'none');
		} else {
			$('#edit-' + transactionId).css('pointer-events', 'auto');
		}
	})

	$('.edit-transaction-status').on('click', function() {
		const transactionId = extractId($(this).attr('id'));

		$('#edit-transaction-status-form-id').val(transactionId);
		$('#edit-transaction-status-form-display-id').text($('#id-' + transactionId).text());
		$('#edit-transaction-status-form-customer').text($('#customer-' + transactionId).text());
	});

	const transactionTableId = 'transaction-table';

	$('#reset-sort-transaction').on('click', function() {
		$('input').val('');
		$('input').prop('checked', false);

		$('#' + transactionTableId).html($('#' + transactionTableId + '-orig').html());
	});

	$('input').on('change', function() {
		/* Sort first before filtering. */
		if ($('#sort-transaction-customer-name-az').is(':checked')) {
			sortAtoZ(transactionTableId);
		} else if ($('#sort-transaction-customer-name-za').is(':checked')) {
			sortZtoA(transactionTableId);
		} else if ($('#sort-transaction-price-lohi').is(':checked')) {
			sortLowToHigh(transactionTableId);
		} else if ($('#sort-transaction-price-hilo').is(':checked')) {
			sortHighToLow(transactionTableId);
		}

		const statusTypes = ['pending', 'completed', 'cancelled'];
		const selectedStatusTypes = [];

		for (const statusType of statusTypes) {
			if ($('#sort-transaction-' + statusType + '-status').is(':checked')) {
				selectedStatusTypes.push(statusType);
			}
		}

		filterBy(transactionTableId, selectedStatusTypes, $('#transaction-date').val());
	});

	$('#cancel-transaction-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const transactionId = $('#edit-transaction-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusCancelled',
			method: 'POST',
			data: $('#edit-transaction-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + transactionId).attr('src', '/assets/rejected.png');
					$('#edit-transaction-status-modal').modal('hide');

					$('#edit-' + transactionId).css('pointer-events', 'auto');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	$('#complete-transaction-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const transactionId = $('#edit-transaction-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusCompleted',
			method: 'POST',
			data: $('#edit-transaction-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + transactionId).attr('src', '/assets/accepted.png');
					$('#edit-transaction-status-modal').modal('hide');

					$('#edit-' + transactionId).css('pointer-events', 'none');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});

	$('#pend-transaction-btn').on('click', function(e) {
		/* Override the default submit behavior and insert AJAX. */
		const transactionId = $('#edit-transaction-status-form-id').val();
		e.preventDefault();

		$.ajax({
			url: '/postEditStatusPendingTransaction',
			method: 'POST',
			data: $('#edit-transaction-status-form').serialize(),
			statusCode: {

				/* If the editing is successful, redirect the user to the landing page. */
				200: function() {
					$('#status-img-' + transactionId).attr('src', '/assets/pending.png');
					$('#edit-transaction-status-modal').modal('hide');

					$('#edit-' + transactionId).css('pointer-events', 'auto');
				},

				/* Otherwise, display an error message. */
				401: function() {
					alert('Error!');
				}
			}
		});
	});
});
