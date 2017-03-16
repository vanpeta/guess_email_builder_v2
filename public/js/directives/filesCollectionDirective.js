(function filesCollection() {
	angular
		.module('guessBuilderV2')
		.directive("filesCollection", filesCollection)

		function filesCollection() {
			return {
				restrict: "E",
				replace: true,
				scope: {
					collection: '=',
					getFolder: '='

				},
				template: "<div><ftp-file ng-repeat='file in collection' file='file' data-ng-click-get-folder='getFolder()'></ftp-file></div>",
			}
		}
})();
