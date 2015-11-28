'use strict';

/* Controllers */

var Controllers = function() {    
  
  /**
    Controller for dashboard
  **/
  var ProjectController = function(){

    this.execute = function($scope, projectSvc) {
      //populate dashboard entities in $scope
      var d = new Date();
      $scope.currentJobs = [];//projectSvc.getCurrentJobs(d);

    }
  };

  /**
    Controller for /resources
  **/
  var ResourceController = function(){

    this.execute = function($scope, $routeParams, projectSvc) {
      //populate dashboard entities in $scope
      $scope.resources = projectSvc.getAllResources();
      window.console.log($scope.resources);
    }  
  };

  /**
    Controller for /tasks
  **/
  var TaskController = function() {

    this.execute = function($scope, $routeParams, projectSvc) {
      //populate dashboard entities in $scope
      $scope.tasks = taskSvc.getTasks();
    }

  };

  /**
    Controller for /jobs
  **/
  var JobController = function() {

    this.execute = function($scope, $routeParams, projectSvc) {
      //populate dashboard entities in $scope
      $scope.jobs = projectSvc.getJobs();
    }
  };


  this.projectController = new ProjectController();
  this.resourceController = new ResourceController();
  this.taskController = new TaskController();
  this.jobController = new JobController();

};

Controllers._INSTANCE = new Controllers();

Controllers.init = function() {
  return Controllers._INSTANCE; 
};
