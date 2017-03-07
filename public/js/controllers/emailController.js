(function emailController() {
	angular.module('guessBuilderV2')
		.controller("emailController", emailController)

		emailController.$inject = [];

		function emailController() {
			var vm = this;
			vm.test = "testing controller"
		}

})();
