var checkboxes = $('.brands');
var calendar = $("#datepicker");
calendar.datepicker();

function getInfo () {
	var datePicked = calendar.datepicker('getDate');
	var year = datePicked.getFullYear();
	var month = datePicked.toLocaleString('en-us', {month: 'long'});
	var day = datePicked.getDate();
	var checked;
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			checked = checkboxes[i].value;
		}
	}
	$.ajax({
		url: '/connect?brand='+checked,
		method: 'GET',
		success: function (res) {
			console.log(res);
		}
	})
}



function handleImage (image) {
	console.log (image);
	$.ajax({
		url: '/upload',
		method: 'POST',
		data: { image: image},
		processData:false,
		contentType: false,
		success: function (res) {
			console.log('this is the response',res);
		}
	});
};
