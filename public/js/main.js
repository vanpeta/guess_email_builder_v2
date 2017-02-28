var checkboxes = $('.brands');
var calendar = $("#datepicker");
calendar.datepicker();

function convertTo64 (image) {
	return new Promise(function (resolve, reject) {
		var reader = new FileReader()
		var b64 = ""
		reader.onload = function () {
			b64 = reader.result.split(',')[1];
			resolve(b64)
		};
		reader.readAsDataURL(image[0]);
	})
}


function getInfo (image) {
	convertTo64(image).then(function (imageData){
		console.log(imageData)
		var datePicked = calendar.datepicker('getDate');
		var year = datePicked.getFullYear();
		var month = datePicked.toLocaleString('en-us', {month: 'long'});
		var monthNumber = datePicked.getMonth()+1;
		if (monthNumber < 10) {
			monthNumber = '0'+monthNumber
		}
		var day = datePicked.getDate();
		if (day < 10) {
			day = '0'+ day;
		}
		day = monthNumber + '.' + day;
		var brand;
		for (var i = 0; i < checkboxes.length; i++) {
			if (checkboxes[i].checked) {
				brand = checkboxes[i].value;
			}
		}
		$.ajax({
			url: '/connect',
			type: 'POST',
			data: { 
				image: imageData,
				brand: brand,
				year: year,
				month: month,
				day: day
			},
			success: function (res) {
				console.log(res);
			}
		})
	})
}



// function handleImage (image) {
// 	console.log (image);
// 	$.ajax({
// 		url: '/upload',
// 		method: 'POST',
// 		data: { image: image},
// 		processData:false,
// 		contentType: false,
// 		success: function (res) {
// 			console.log('this is the response',res);
// 		}
// 	});
// };
