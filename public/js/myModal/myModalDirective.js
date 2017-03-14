(function modalDirective() {
	angular
		.module('guessBuilderV2')
		.directive('modalDirective', modalDirective)

		function modalDirective() {
			return {
				restrict: 'EA',
				require: '^ngModel',
				scope: {
						header: '=modalHeader',
						callbackgeturl: '&ngClickGetUrl',
						handler: '=handler'
					},
				transclude: true,
				templateUrl: '/js/myModal/modal-directive.html'
			}
		}
})();

