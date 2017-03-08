(function emailController() {
	angular.module('guessBuilderV2')
		.controller("emailController", emailController)

		emailController.$inject = [];

		function emailController() {
			var vm = this;
			vm.showBrands = "";
			vm.showMenu = showMenu;
			vm.brand = "";
			vm.selectBrand = selectBrand;
			vm.selected = "";

			function showMenu() {
				if (vm.showBrands == "") {
					vm.showBrands = "show";
				}
				else vm.showBrands = "";
				return vm.showBrands 
			}

			function selectBrand(selectedBrand) {
				vm.brand = selectedBrand.target.textContent;
				for (var i = 0; i < document.getElementsByClassName('show').length; i++) {
					document.getElementsByClassName('show')[i].id = "";
				}

				selectedBrand.target.id = "selected"
			}


		}
})();
