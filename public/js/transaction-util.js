/**
 * Converts the file path of the status icon to its equivalent value in the database.
 *
 * @param {string} icon File path of the status icon.
 * @return {string} Equivalent value of the status icon in the database.
 */
const getStatusFromIcon = function(icon) {
	switch (icon) {
		case '/assets/pending.png':
			return 'pending';
		case '/assets/accepted.png':
		case '/assets/completed.png':
			return 'completed';
		case '/assets/rejected.png':
			return 'cancelled';
		default:
			break;
	}
};

const showAll = function(tableId) {
	$('#' + tableId + ' > tbody > tr').each(function() {
		$(this).show();
	});
};

const filterBy = function(tableId, statusTypes, dateString) {
	const filterDate = new Date(dateString);

	/* Set the time component to 0 in preparation for time-agnostic date comparison. */
	filterDate.setHours(0, 0, 0);

	$('#' + tableId + ' > tbody > tr').each(function() {
		if (statusTypes.length == 0 && dateString.length == 0) {
			$(this).show();
		} else if (statusTypes.length > 0 && dateString.length == 0) {
			const statusTypeRow = getStatusFromIcon($(this).find('td:eq(4) img').attr('src'));

			if (statusTypes.indexOf(statusTypeRow) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else if (statusTypes.length == 0 && dateString.length > 0) {
			const dateStringRow = $(this).find('td:eq(1)').text();
			const dateRow = new Date(dateStringRow);

			/* Set the time component to 0 in preparation for time-agnostic date comparison. */
			dateRow.setHours(0, 0, 0);

			if (filterDate.getTime() == dateRow.getTime()) {
				$(this).show();
			} else {
				$(this).hide();
			}
		} else {
			const statusTypeRow = getStatusFromIcon($(this).find('td:eq(4) img').attr('src'));
			const dateStringRow = $(this).find('td:eq(1)').text();
			const dateRow = new Date(dateStringRow);

			/* Set the time component to 0 in preparation for time-agnostic date comparison. */
			dateRow.setHours(0, 0, 0);

			if (filterDate.getTime() == dateRow.getTime() && statusTypes.indexOf(statusTypeRow) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		}
	});
};

const sortAtoZ = function(tableId) {
	let stillSorting = true;

	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;
			const name1 = rows[i].getElementsByTagName('td')[2].textContent;
			const name2 = rows[i + 1].getElementsByTagName('td')[2].textContent;

			if (name1 > name2) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

const sortZtoA = function(tableId) {
	let stillSorting = true;

	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;
			const name1 = rows[i].getElementsByTagName('td')[0].textContent;
			const name2 = rows[i + 1].getElementsByTagName('td')[0].textContent;

			if (name1 < name2) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

const sortLowToHigh = function(tableId) {
	let stillSorting = true;

	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;

			/* Ignore the peso sign and the space after the peso sign. */
			const price1 = rows[i].getElementsByTagName('td')[3].textContent.substring(2);
			const price2 = rows[i + 1].getElementsByTagName('td')[3].textContent.substring(2);

			if (parseInt(price1) > parseInt(price2)) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

const sortHighToLow = function(tableId) {
	let stillSorting = true;

	while (stillSorting) {
		const rows = $('#' + tableId + ' > tbody > tr');
		stillSorting = false;
		let swap;
		let i;

		for (i = 0; i < rows.length - 1; i++) {
			swap = false;

			/* Ignore the peso sign and the space after the peso sign. */
			const price1 = rows[i].getElementsByTagName('td')[3].textContent.substring(2);
			const price2 = rows[i + 1].getElementsByTagName('td')[3].textContent.substring(2);

			if (parseInt(price1) < parseInt(price2)) {
				swap = true;
				break;
			}
		}

		if (swap) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			stillSorting = true;
		}
	}
};

export {
	showAll,
	filterBy,
	sortAtoZ,
	sortZtoA,
	sortLowToHigh,
	sortHighToLow,
	getStatusFromIcon
};
