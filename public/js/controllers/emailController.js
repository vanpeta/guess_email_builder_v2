(function emailController() {
	angular
		.module('guessBuilderV2')
		.controller("emailController", emailController)


		emailController.$inject = ['$scope', 'ftpService', 'Upload'];

		function emailController($scope, ftpService, Upload) {
			var vm = this;
			vm.email = {};
			vm.showBrands = "";
			vm.showMenu = showMenu;
			vm.showDatePicker = "";
			vm.showCalendar = showCalendar;
			vm.selectBrand = selectBrand;
			vm.selected = "";
			vm.createImages = createImages;
			vm.imageCounter;			
			vm.rowsCounter = 0;
			vm.images = [];
			vm.addNewRow = addNewRow;
			vm.email.rows = [];
			$scope.show = false;
			$scope.header = 'Select an image from the server';
			$scope.upload = upload;
			vm.imageToUpload;
			vm.getHome = getHome;
			$scope.getUrl = getUrl;
			$scope.fileCollection;
			$scope.getFolder = getFolder;

			function showMenu () {
				$scope.showDatePicker = ""
				if (vm.showBrands == "") {
					vm.showBrands = "show";
				}
				else vm.showBrands = "";
				return vm.showBrands 
			};
			$scope.$watch('showDatePicker', function (showDatePicker) {
				vm.showDatePicker = showDatePicker;
				return showDatePicker;
			});

			function showCalendar () {
				vm.showBrands = ""
				if (!vm.showDatePicker) {
					$scope.showDatePicker = "show";
					vm.email.date = "";
				}
				else $scope.showDatePicker = "";
				return vm.showDatePicker 
			};

			function selectBrand (selectedBrand) {
				vm.email.brand = selectedBrand.target.textContent;
				for (var i = 0; i < document.getElementsByClassName('show').length; i++) {
					document.getElementsByClassName('show')[i].id = "";
				}
				selectedBrand.target.id = "selected"
			};

			function createImages () {
				vm.images = [];
				vm.email.rows[vm.rowsCounter] = vm.images;
				for (var i = 0; i < vm.imageCounter; i++) {
					vm.image = {
						imageNumber : i,
						alt : "alt"+i,
						href : "href"+i,
						src : "src"+i,
						ref: "#"+i
					}
					vm.images.push(vm.image);
				}
			};

			function upload(image, imageRef) {
				var name = image.name.replace(/\s+/g, '_');
				console.log(imageRef.target.id)
				var location = {
						brand: vm.email.brand.replace(/\s+/g, ''),
						year: 0,
						month: 0,
						day: 0
					}
				$scope.$watch('datePicked', function (datePicked) {
					location.year = datePicked.getFullYear();
					location.month = datePicked.toLocaleString('en-us', {month: 'long'});
					var monthNumber = datePicked.getMonth()+1;
					// var imageName = $('#'+id).val().split('\\').pop().replace(/\s+/g, '_');
					if (monthNumber < 10) {
						monthNumber = '0'+ monthNumber
					}
					var day = datePicked.getDate();
					if (day < 10) {
						day = '0'+ day;
					}
					location.day = monthNumber + '.' + day;
				});
				ftpService.convertTo64(image)
				.then(function (res) {
					ftpService
					.uploadImage(res, location, name)
					.then(function (response) {
						vm.email.rows[vm.rowsCounter][imageRef.target.id.slice(-1)].src = response.data.url;
					})
				})
			};

			function getFolder () {
				console.log('getFolder')
				// ftpService.getServerInfo()
				// .then(function (res) {
				// 	$scope.fileCollerction = res.data.filesInfolder
				// })
			}

			function addNewRow () {
				vm.rowsCounter++
				vm.images = [];
			}

			function getHome () {
				ftpService.getServerinfo()
				.then(function (res) {
					$scope.fileCollection = res.data.filesInFolder
				})
			}

			function getUrl () {
				console.log('getting url')
			}

			$scope.$watch('date', function (date) {
				if (date) {
					vm.email.date = date
				}
			});

		}
})();







