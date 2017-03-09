(function emailController() {
	angular
		.module('guessBuilderV2')
		.directive("jqdatepicker", jqdatepicker)

		function jqdatepicker() {
			return {
				restrict: 'A',
				require: 'ngModel',
				link: function (scope, element, attrs, ngModelCtrl) {
					$(function () {
						element.datepicker({
							dateFormat: 'DD, d MM, yy',
							onSelect: function (date) {
								scope.date = date;
								scope.showDatePicker = "";
								scope.$apply();
							}
						})
					})
				}
			}
		}
})();
