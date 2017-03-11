(function modalDirective() {
	angular
		.module('guessBuilderV2')
		.directive("modalDirective", modalDirective)

		function modalDirective() {
			return {
				restrict: 'E',
				scope: '=',
				transclude: true,
				templateUrl: '/js/directives/modal-directive.html',
				link: function (scope, element, attrs) {
						$(function () {
							console.log('directive', scope.show)
							scope.hideModal = function () {
								scope.show = false;
							} 
						})
					}
			}
		}
})();
