(function filesCollection() {
	angular
		.module('guessBuilderV2')
		.directive("filesCollection", filesCollection)

		function filesCollection() {
			return {
				restrict: "E",
				replace: true,
				scope: {
					collection: '='
				},
				template: "<div><ftp-file ng-repeat='file in collection' file='file'></ftp-file></div>",
			}
		}
})();
