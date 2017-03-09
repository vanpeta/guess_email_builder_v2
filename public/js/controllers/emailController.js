(function emailController() {
	angular
		.module('guessBuilderV2')
		.controller("emailController", emailController)


		emailController.$inject = ['$scope'];

		function emailController($scope) {
			var vm = this;
			vm.showBrands = "";
			vm.showMenu = showMenu;
			vm.showDatePicker = "";
			$scope.$watch('showDatePicker', function (showDatePicker) {
				vm.showDatePicker = showDatePicker;
				return showDatePicker;
			});
			vm.showCalendar = showCalendar;
			vm.email = {};
			vm.selectBrand = selectBrand;
			vm.selected = "";
			vm.rowsCounter = 1
			vm.imageCounter;
			vm.createImages = createImages;
			vm.image = {};
			vm.images = [];
			vm.email.rows = [vm.images];

			function showMenu() {
				$scope.showDatePicker = ""
				if (vm.showBrands == "") {
					vm.showBrands = "show";
				}
				else vm.showBrands = "";
				return vm.showBrands 
			}

			function selectBrand(selectedBrand) {
				vm.email.brand = selectedBrand.target.textContent;
				for (var i = 0; i < document.getElementsByClassName('show').length; i++) {
					document.getElementsByClassName('show')[i].id = "";
				}
				selectedBrand.target.id = "selected"
			}

			function showCalendar () {
				vm.showBrands = ""
				if (!vm.showDatePicker) {
					$scope.showDatePicker = "show";
					vm.email.date = "";
				}
				else $scope.showDatePicker = "";
				return vm.showDatePicker 
			}

			$scope.$watch('date', function (date) {
				if (date) {
					vm.email.date = date
				}
			})

			function createImages () {
				vm.images = [];
				for (var i = 0; i < vm.imageCounter; i++) {
					vm.image = {
						alt : "alt"+i,
						href : "href"+i,
						src : "src"+i
					}
					vm.images.push(vm.image);
				}
			}

		}
})();







