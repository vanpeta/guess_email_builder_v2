(function ftpFile() {
	angular
		.module('guessBuilderV2')
		.directive("ftpFile", ftpFile)

		function ftpFile($compile) {
			return {
				restrict: "E",
				replace: true,
				scope: {
					file: '='
				},
				template: '<div class="file"><div><div class="arrow-right"></div>{{file.name}}</div></div>',
				// link: function (scope, element, attrs) {
				// 	var collectionSt = "<collection collection='scope.file'></collection>";
				// 	if (angular.isArray(scope.file)) {
				// 		$compile(collectionSt)(scope, function(cloned, scope) {
				// 			element.append(cloned)
				// 		});
				// 	}
				// }
			}
		}
})();
