(function ftpService() {
	angular
		.module('guessBuilderV2')
		.factory("ftpService", ftpService)


		ftpService.$inject = ['$http'];

		function ftpService($http) {

			function convertTo64 (image) {
				return new Promise(function (resolve, reject) {
					var params = null
					var reader = new FileReader()
					var b64 = ""
					reader.onload = function () {
						b64 = reader.result.split(',')[1];
						resolve(b64)
					};
					reader.readAsDataURL(image);
				})
			}

			function uploadImage (image, location, name) {
				return $http({
					method: 'POST',
					url: '/ftp',
					data: {
						image: image,
						location: location,
						imageName: name
					}
				})
			}

			function getServerinfo () {
				return $http({
					method: 'GET',
					url: '/ftp'
				})
			}


			return {
				uploadImage: uploadImage,
				convertTo64: convertTo64,
				getServerinfo: getServerinfo
			}

		}
})();
