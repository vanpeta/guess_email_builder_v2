(function modalDirective() {
	angular
		.module('guessBuilderV2')
		.directive("modalDirective", modalDirective)

		function modalDirective() {
			return {
				restrict: 'E',
				scope: =,
				template: 'modal-directive.html',
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
