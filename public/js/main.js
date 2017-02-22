console.log('loaded');

function getInfo () {
	console.log('click')
	$.ajax({
		url: '/connect',
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
