'use strict';

/* App Module */
var PROJECT_ID = 'DEMO_PROJECT_1';
ProjectService._INSTANCE.loadProject(PROJECT_ID);

var controllers = Controllers.init();

var pcpBlueApp = angular.module('pcpBlueApp', [
  'ngRoute',
  // 'pcpBlueAnimations',
  'pcpBlueControllers',
  // 'pcpBlueFilters',
  'pcpBlueServices', 
  'ui.bootstrap'
]);

var pcpBlueServices = angular.module('pcpBlueServices', []);
pcpBlueServices.factory('ProjectDataSvc', [ServiceFactory]);


var pcpBlueControllers = angular.module('pcpBlueControllers', []);
pcpBlueControllers.controller('ProjectCtrl', ['$scope', 'ProjectDataSvc', controllers.projectController.execute]);
pcpBlueControllers.controller('ResourceCtrl', ['$scope', '$routeParams', '$uibModal', 'ProjectDataSvc', controllers.resourceController.execute]);
pcpBlueControllers.controller('ModalInstanceCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'ProjectDataSvc', controllers.modalInstanceController.execute]);
pcpBlueControllers.controller('ModalEditInstanceCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'ProjectDataSvc', 'name_passed', 'cost_passed', 'type_passed', controllers.modalEditInstanceController.execute]);
pcpBlueControllers.controller('TaskCtrl', ['$scope', '$routeParams', 'ProjectDataSvc', controllers.taskController.execute]);
pcpBlueControllers.controller('JobCtrl', ['$scope', '$routeParams', 'ProjectDataSvc', controllers.jobController.execute]);

pcpBlueApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/dashboard', {
        templateUrl: 'partials/dashboard.html',
        controller: 'ProjectCtrl'
      }).
      when('/resources', {
        templateUrl: 'partials/resources.html',
        controller: 'ResourceCtrl'
      }).
      when('tasks', {
        templateUrl: 'partials/tasks.html',
        controller: 'TaskCtrl'
      }).
      when('jobs', {
        templateUrl: 'partials/jobs.html',
        controller: 'JobCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);

