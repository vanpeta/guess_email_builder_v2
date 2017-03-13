(function modalDirective() {
	angular
		.module('guessBuilderV2')
		.directive('modalDirective', modalDirective)

		function modalDirective() {
			return {
				restrict: 'EA',
				scope: {
					header: '=modalHeader',
					callbackupload: '&ngClickUpload',
					callbackgeturl: '&ngClickGetUrl',
					handler: '=handler'
				},
				transclude: true,
				templateUrl: '/js/myModal/modal-directive.html',
				controller: function ($scope) {
					console.log($scope)
					// $scope.handler = 'pop'
				}
			}
		}
})();
