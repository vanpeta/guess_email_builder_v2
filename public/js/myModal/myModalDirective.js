(function modalDirective() {
	angular
		.module('guessBuilderV2')
		.directive('modalDirective', modalDirective)

		function modalDirective() {
			return {
				restrict: 'EA',
				scope: {
					title: '=modalTitle',
					header: '=modalHeader',
					body: '=modalBody',
					footer: '=modalFooter',
					callbackbuttonleft: '&ngClickLeftButton',
					callbackbuttonright: '&ngClickRightButton',
					handler: '=lolo'
				},
				transclude: true,
				templateUrl: '/js/myModal/modal-directive.html',
				controlke: function ($scope) {
					$scope.handler = 'pop'
				}
			}
		}
})();
