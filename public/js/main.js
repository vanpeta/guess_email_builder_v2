console.log('loaded');

function handleImage (image) {
	console.log (image);
	var image = new FormData ();
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
