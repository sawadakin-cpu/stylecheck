// $(function () {
// 	$('.view_timer').each(function (index, target) {
// 		let startDate = jQuery(this).attr('data-start-date'),
// 				endDate = jQuery(this).attr('data-end-date'),
// 				nowDate = new Date();

// 		let url = location.href,
// 				preDate = '';
// 				params = url.split('?');

// 		if (params.length > 1) {
// 			spparams = params[1].split('&');

// 			var paramArray = [];
// 			for (i = 0; i < spparams.length; i++) {
// 				keyvalue = spparams[i].split('=');
// 				if (keyvalue[0] == 'view_timer') {
// 					preDate = decodeURI(keyvalue[1]);
// 				}
// 			}
// 		}

// 		//alert(preDate);
// 		if (preDate) {
// 			nowDate = new Date(preDate);
// 			if (startDate) {
// 				startDate = new Date(startDate);
// 			} else {
// 				startDate = nowDate;
// 			}
// 			if (endDate) {
// 				endDate = new Date(endDate);
// 			}
// 		} else {
// 			if (startDate) {
// 				startDate = new Date(startDate);
// 			} else {
// 				startDate = nowDate;
// 			}
// 			if (endDate) {
// 				endDate = new Date(endDate);
// 			}
// 		}

// 		if (startDate <= nowDate && (!endDate || nowDate < endDate)) {
// 			jQuery(this).show();
// 		} else {
// 			jQuery(this).remove();
// 		}
// 	});
// });
