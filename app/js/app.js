'use strict';

/* App Module */
var PROJECT_ID = 'DEMO_PROJECT_1';
var svcFactory = new ServiceFactory();
var projectService = svcFactory.createProjectService(PROJECT_ID);
var controllers = Controllers.init(PROJECT_ID);

var pcpBlueApp = angular.module('pcpBlueApp', [
  'ngRoute',
  // 'pcpBlueAnimations',
  'pcpBlueControllers',
  // 'pcpBlueFilters',
  'pcpBlueServices'
]);

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
      when('/tasks', {
        templateUrl: 'partials/tasks.html',
        controller: 'TaskCtrl'
      }).
      when('/jobs', {
        templateUrl: 'partials/jobs.html',
        controller: 'JobCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });
  }]);

var pcpBlueServices = angular.module('pcpBlueServices', ['ngResource']);
pcpBlueServices.factory('Project', ['$resource', projectService.projectFactory]);
pcpBlueServices.factory('Resources', ['$resource', projectService.resourceFactory]);
pcpBlueServices.factory('Tasks', ['$resource', projectService.taskFactory]);
pcpBlueServices.factory('Jobs', ['$resource', projectService.jobFactory]);


var pcpBlueControllers = angular.module('pcpBlueControllers', []);
pcpBlueControllers.controller('ProjectCtrl', ['$scope', 'Project', controllers.projectController.execute]);
pcpBlueControllers.controller('ResourceCtrl', ['$scope', '$routeParams', 'Resources', controllers.projectController.execute]);
pcpBlueControllers.controller('TaskCtrl', ['$scope', '$routeParams', 'Tasks', controllers.taskController.execute]);
pcpBlueControllers.controller('JobCtrl', ['$scope', '$routeParams', 'Jobs', controllers.jobController.execute]);

