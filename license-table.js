angular.module('LicenseTable', ['ngSKOS'])
.run(['$rootScope','$http', function($rootScope, $http) {
  $http.get('licenses.json').success(function(data){
    $rootScope.licenses = data;
  });
}])
.directive('knownIdentifier', function() {
  return {
    restrict: 'A',
    scope: { 
      concept: '=knownIdentifier'
    },
    template: '<span ng-repeat="id in ids"><a href="{{id.url}}">{{id.title}}</a>{{$last ? "" : ", "}}</span>',
    link: function(scope) {
      var c = scope.concept;
      scope.ids = [ ]; // { title: "URI", url: c.uri } ];
      if (c.identifier) {
        c.identifier.forEach(function(id) {
          if (id.match(/^http:\/\/bartoc\.org/)) {
            scope.ids.push({title:"BARTOC",url:id});
          } else if (id.match(/^http:\/\/www\.wikidata\.org/)) {
            scope.ids.push({title:"Wikidata",url:id});
          } else if (id.match(/^http:\/\/purl\.org\/NET\/rdflicense/)) {
            scope.ids.push({title:"RDFLicense",url:id});
          } else {
            scope.ids.push({title:id, url:id});
          }
        });
      }
    }
  };
});
