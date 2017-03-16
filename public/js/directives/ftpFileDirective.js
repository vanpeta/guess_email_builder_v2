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
				templateUrl: '/js/directives/ftpFileDirectiveTemplate.html'
			}
		}
})();
