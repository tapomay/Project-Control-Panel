'use strict';

/* Controllers */

var Controllers = function(projectId) {    
  
  var _project = projectId;

  /**
    Controller for dashboard
  **/
  var ProjectController = function(projectId){
    var _project = projectId;

    this.execute = function($scope, projectSvc) {
      //populate dashboard entities in $scope
      $scope.jobs = projectSvc.query();
    }
  };

  /**
    Controller for /resources
  **/
  var ResourceController = function(projectId){
    var _project = projectId;

    this.execute = function($scope, $routeParams, resourceSvc) {
      //populate dashboard entities in $scope
      $scope.resources = resourceSvc.query();
    }  
  };

  /**
    Controller for /tasks
  **/
  var TaskController = function(projectId) {
    var _project = projectId;

    this.execute = function($scope, $routeParams, taskSvc) {
      //populate dashboard entities in $scope
      $scope.tasks = taskSvc.getTasks(_project);
    }

  };

  /**
    Controller for /jobs
  **/
  var JobController = function(projectId) {
    var _project = projectId;

    this.execute = function($scope, $routeParams, projectSvc) {
      //populate dashboard entities in $scope
      $scope.jobs = projectSvc.getJobs(_project);
    }
  };


  this.projectController = new ProjectController(projectId);
  this.resourceController = new ResourceController(projectId);
  this.taskController = new TaskController(projectId);
  this.jobController = new JobController(projectId);

  Controllers.init = function(projectId) {
    return new Controllers(projectId); 
  };

};