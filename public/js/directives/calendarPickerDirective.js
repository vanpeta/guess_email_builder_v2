(function jqdatepicker() {
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
								scope.$apply(function () {
									scope.date = date;
									scope.showDatePicker = "";
								});
							}
						})
					})
				}
			}
		}
})();
