var checkboxes = $('.brands');
var calendar = $("#datepicker");
var brand;
var counter = 1;
var rowNum ='row'+counter;
var url = [];
var alt = [];
var href = [];
//Generating Calendar
calendar.datepicker({
	onSelect: function (date) {
		$('.rowPicker').removeClass('hide');
		$('#buttons').removeClass('hide');
		$('#calendar').addClass('hide');
	}
});
//Cleaning checkboxes when clicked on them
checkboxes.on('click', function () {
	for (var i = 0; i < checkboxes.length; i++) {
		checkboxes[i].checked = false;
	}
	this.checked = 'checked';
	$('#calendar').removeClass('hide');
	$('.brands-section').addClass('hide');
});
//Grabing # of images per row and generating rowSetting
var numImages;
$('#numImages').on('change', function() {
	$('.rowSettings').empty();
	numImages = $(this).val();
	for (var i = 0; i < numImages; i++) {
		$('.rowSettings').append('<div id="imageSettings"><label for="imageAlt'+i+'">Alt:</label><input type="text" class="imageAlt" id="imageAlt'+i+'" value="" /><label for="imageHref'+i+'">href:</label><input type="text" class="imageHref" id="imageHref'+i+'" value="" /><label for="image'+i+'" class="button">ADD IMAGE</label><input type="file" id="image'+i+'" style="visibility:hidden;" onchange="validator(this)"/></div>');
	}
	addEventsAlt ();
	addEventsHref ();
});
var row1images;
var row2images;
var row3images;
var row4images;
function addEventsAlt () {
	return (
		$('.imageAlt').on('change', function() {
			var i = $(this).attr('id').slice(-1);
			alt[i] = $(this).val();
			addData (i);
		})
	)
};
function addEventsHref () {
	return (
		$('.imageHref').on('change', function() {
			var i = $(this).attr('id').slice(-1);
			href[i] = $(this).val();
			addData (i);
		})
	)
};

function addData (i) {
	switch (i) {
		case '0':
			return row1images = '<td width="100%"><a href="'+href[0]+'"><img id="image0" alt="'+alt[0]+'" src="'+url[0]+'" width="582" style="display: block" /></a></td>'
		break;
		case '1':
			return row2images = '<td width="50%"><a href="'+href[0]+'"><img id="image0" alt="'+alt[0]+'" src="'+url[0]+'" width="291" style="display: block" /></a></td><td width="50%"><a href="'+href[1]+'"><img id="image1" alt="'+alt[1]+'" src="'+url[1]+'" width="291" style="display: block" /></a></td>'
		break;
		case '2':
			return row3images = '<td width="33.33%"><a href="'+href[0]+'"><img id="image0" alt="'+alt[0]+'" src="'+url[0]+'" width="194" style="display: block" /></a></td><td width="33.33%"><a href="'+href[1]+'"><img id="image1" alt="'+alt[1]+'" src="'+url[1]+'" width="194" style="display: block" /></a></td><td width="33.33%"><a href="'+href[2]+'"><img id="image2" alt="'+alt[2]+'" src="'+url[2]+'" width="194" style="display: block" /></a></td>'
		break;
		case '3':
			return row4images = '<td width="25%"><a href="'+href[0]+'"><img id="image0" alt="'+alt[0]+'" src="'+url[0]+'" width="145.5" style="display: block" /></a></td><td width="25%"><a href="'+href[1]+'"><img id="image1" alt="'+alt[1]+'" src="'+url[1]+'" width="145.5" style="display: block" /></a></td><td width="25%"><a href="'+href[2]+'"><img id="image2" alt="'+alt[2]+'" src="'+url[2]+'" width="145.5" style="display: block" /></a></td><td width="25%"><a href="'+href[3]+'"><img id="image3" alt="'+alt[3]+'" src="'+url[3]+'" width="145.5" style="display: block" /></a></td>'
		break
	}
}
//HTML Row Code
var contentRowAndTable = '<tr class="'+rowNum+'"><td><table width="582" border="0" cellspacing="0" cellpadding="0"><tr class="imagesContainer"></tr></table></td></tr>';

//Adding new row
$('#newRowButton').on('click', function () {
	numImages = null;
	$('#numImages').val('');
	$('.rowSettings').empty();
	$('.content > tbody:last-child').append(contentRowAndTable);
	counter++;
	rowNum = 'row'+counter;
	contentRowAndTable = '<tr class="'+rowNum+'"><td><table width="582" border="0" cellspacing="0" cellpadding="0"><tr class="imagesContainer"></tr></table></td></tr>';
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
	var id = $(image).attr('id');
	sendData (image.files, id);
};
//Sending image and data to backend
function sendData (image, id) {
	convertTo64(image).then(function (imageData){
		var datePicked = calendar.datepicker('getDate');
		var year = datePicked.getFullYear();
		var month = datePicked.toLocaleString('en-us', {month: 'long'});
		var monthNumber = datePicked.getMonth()+1;
		var imageName = $('#'+id).val().split('\\').pop().replace(/\s+/g, '_');
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
				console.log(res);
				id = id.slice(-1);
				url[id] = res.url;
				addData(id)
				counter--
				rowNum = 'row'+counter;
				addRow (id, rowNum);
				counter++
				rowNum = 'row'+counter;
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

function addRow (numRows, rowNum) {
	console.log (rowNum, numRows);
	switch (numRows) {
		case '0':
			$('.content > tbody >.'+rowNum).find('.imagesContainer').html(row1images);
			break;
		case '1':
			$('.content > tbody >.'+rowNum).find('.imagesContainer').html(row2images);
			break;
		case '2':
			$('.content > tbody >.'+rowNum).find('.imagesContainer').html(row3images);
			break;
		case '3':
			$('.content > tbody >.'+rowNum).find('.imagesContainer').html(row4images);
	}
};

function downloadInnerHtml(filename, elId, mimeType) {
    var elHtml = $(elId).html();
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';

    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click(); 
}
$('#downloadButton').on('click', function(){
	downloadInnerHtml('testTen.html', '.content', 'text/html');
});




