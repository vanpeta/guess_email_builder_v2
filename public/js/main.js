var checkboxes = $('.brands');
var calendar = $("#datepicker");
var brand;

//Generating Calendar
calendar.datepicker();
//Cleaning checkboxes when clicked on them
checkboxes.on('click', function () {
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
	this.checked = 'checked';
});
//Grabing # of images per row and generating rowSetting
var numImages;
$('#numImages').on('change', function() {
	numImages = $(this).val();
	for (var i = 0; i < numImages; i++) {
		$('.rowSettings').append('<div><input type="file" id="image'+i+'" onchange="validator(this.files)"/></div>');
	}
});
//Making sure one brand is chosen and triggering send image to backend
function validator (image) {
	for (var i = 0; i < checkboxes.length; i++) {
		if (checkboxes[i].checked) {
			brand = checkboxes[i].value;
		}
	}
	if (brand == undefined) {
		return alert('Choose one brand');
	}
	sendData (image);
};
//Sending image and data to backend
function sendData (image) {
	convertTo64(image).then(function (imageData){
		var datePicked = calendar.datepicker('getDate');
		var year = datePicked.getFullYear();
		var month = datePicked.toLocaleString('en-us', {month: 'long'});
		var monthNumber = datePicked.getMonth()+1;
		var imageName = $('#image').val().split('\\').pop().replace(/\s+/g, '_');
		if (monthNumber < 10) {
			monthNumber = '0'+monthNumber
		}
		var day = datePicked.getDate();
		if (day < 10) {
			day = '0'+ day;
		}
		day = monthNumber + '.' + day;
		$.ajax({
			url: '/connect',
			type: 'POST',
			data: {
				image: imageData,
				brand: brand,
				year: year,
				month: month,
				day: day,
				imageName: imageName
			},
			success: function (res) {
				addImages (res.url);
			}
		})
	})
};
//Converting image to base64 before sending it to backend
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
};
//Generating preview and code to be donwloaded
function addImages (url) {
	var contentRowAndTable = '<tr><td class="content" align="left"><table width="100%" border="0" align="center" cellpadding="0" cellspacing="0"><tr>';
	var closeContentRowAndTable = '</tr></table></td></tr>';
	if (numImages == 1) {
		$('.images').append(contentRowAndTable+'<td width="100%"><a href="#"><img alt="" src="'+url+'" width="582" style="display: block" /></a></td>'+closeContentRowAndTable);
	}
	else if (numImages == 2) {
		$('.images').append(contentRowAndTable+'<td width="50%"><a href="#"><img alt="" src="'+url+'" width="291" style="display: block" /></a></td><td width="50%"><a href="#"><img alt="" src="'+url+'" width="291" style="display: block" /></a></td>'+closeContentRowAndTable);
	}
	else if (numImages == 3) {
		$('.images').append(contentRowAndTable+'<td width="33.33%"><a href="#"><img alt="" src="'+url+'" width="194" style="display: block" /></a></td><td width="33.33%"><a href="#"><img alt="" src="'+url+'" width="194" style="display: block" /></a></td><td width="33.33%"><a href="#"><img alt="" src="'+url+'" width="194" style="display: block" /></a></td>'+closeContentRowAndTable);
	}
	else if (numImages == 4) {
		$('.images').append(contentRowAndTable+'<td width="25%"><a href="#"><img alt="" src="'+url+'" width="145.5" style="display: block" /></a></td><td width="25%"><a href="#"><img alt="" src="'+url+'" width="145.5" style="display: block" /></a></td><td width="25%"><a href="#"><img alt="" src="'+url+'" width="145.5" style="display: block" /></a></td><td width="25%"><a href="#"><img alt="" src="'+url+'" width="145.5" style="display: block" /></a></td>'+closeContentRowAndTable);
	}
};








