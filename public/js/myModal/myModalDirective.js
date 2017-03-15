(function modalDirective() {
	angular
		.module('guessBuilderV2')
		.directive('modalDirective', modalDirective)

		function modalDirective($compile) {
			return {
				restrict: 'EA',
				scope: {
						header: '=modalHeader',
						callbackgeturl: '&ngClickGetUrl',
						handler: '=handler',
						collection: '=collection'
					},
				templateUrl: '/js/myModal/modal-directive.html',
				link: function (scope, element, attrs) {
					scope.$watch('collection', function (collection) {
						if (angular.isArray(scope.collection)) {
							var collectionSt = "<files-collection collection='collection'></files-collection>";
							$compile(collectionSt)(scope, function(cloned, scope) {
								$('.modal-body').html(cloned)
							});
						}
					})
				}
			}
		}
})();

