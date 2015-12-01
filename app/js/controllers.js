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

    this.execute = function($scope, $routeParams, $uibModal, projectSvc) {
      //populate dashboard entities in $scope
      $scope.resources = projectSvc.getAllResources();
     //this.open1 = $scope.open1;
	 $scope.open1 = function(){
			
			var modalInstance = $uibModal.open({
			templateUrl: 'partials/myModalContent.html',
			controller: 'ModalInstanceCtrl',
		});
   modalInstance.result.then(function () {
      
    }, function () {
      window.console.info('Modal dismissed at: ' + new Date());
    });
  	
	
	};
	
	  $scope.deleteResource = function (resource_passed) {
			

		// Setup the new data to be inserted
			$scope.newResource = {};
			
			$scope.newResource.name = resource_passed.name;
			$scope.newResource.cost = resource_passed.cost;
			$scope.newResource.type = resource_passed.resourceType;	
			$scope.newResource.id = projectSvc.getProjectId();
			
			projectSvc.deleteResource($scope.newResource);
	  };	
	  
		$scope.editResource = function(resource_passed){
			
	
			var modalEditInstance = $uibModal.open({
			templateUrl: 'partials/myModalEditContent.html',
			controller: 'ModalEditInstanceCtrl',
			resolve: {
			name_passed: function () {
				return resource_passed.name;
				},
			cost_passed: function () {
				return resource_passed.cost;
				},
			type_passed: function () {
				return resource_passed.resourceType;
				}				
			}			
		});
	   modalEditInstance.result.then(function () {
		  
		}, function () {
		  window.console.info('Edit Modal dismissed at: ' + new Date());
		});
	
		};	  
	  
	  
	  

	};
  
  };

 var ModalInstanceCtrl = function($scope, $uibModalInstance) {
  this.execute = function($scope, $routeParams, $uibModalInstance, projectSvc) {

  $scope.ok = function () {

	// Setup the new data to be inserted
		$scope.newResource = {};
	  	$scope.newResource.name = $scope.r_name;
		$scope.newResource.cost = $scope.r_cost;
		$scope.newResource.type = $scope.data.singleSelect;	
		$scope.newResource.id = projectSvc.getProjectId();
		
		projectSvc.addResource($scope.newResource);
		
		$uibModalInstance.close();  
				
//    $uibModalInstance.close({rname1: $scope.r_name, rcost1: $scope.r_cost, rtype1: $scope.data.singleSelect, resources1: $scope.resources});  
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel','');
  };

  };  
}; 

 var ModalEditInstanceCtrl = function($scope, $uibModalInstance, name_passed, cost_passed, type_passed) {
		
	 
  this.execute = function($scope, $routeParams, $uibModalInstance, projectSvc, name_passed, cost_passed, type_passed) {

    $scope.r_name = name_passed;
    $scope.r_cost = cost_passed;
    $scope.data_singleSelect = type_passed;
	
	$scope.oldResource = {};
	$scope.oldResource.name = name_passed;
	$scope.oldResource.cost = cost_passed;
	$scope.oldResource.type = type_passed;	
	$scope.oldResource.id = projectSvc.getProjectId();	
		
  $scope.ok = function () {

	// Setup the new data to be inserted
		$scope.newResource = {};
	  	$scope.newResource.name = $scope.r_name;
		$scope.newResource.cost = $scope.r_cost;
		$scope.newResource.type = $scope.data_singleSelect;	
		$scope.newResource.id = projectSvc.getProjectId();

		
		projectSvc.deleteResource($scope.oldResource);
			
		projectSvc.addResource($scope.newResource);
		
		$uibModalInstance.close();  
				
//    $uibModalInstance.close({rname1: $scope.r_name, rcost1: $scope.r_cost, rtype1: $scope.data.singleSelect, resources1: $scope.resources});  
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel','');
  };

  };  
}; 


  
  /**
    Controller for /tasks
  **/
  var TaskController = function() {

    this.execute = function($scope, $routeParams, projectSvc) {
      //populate dashboard entities in $scope
      $scope.tasks = projectSvc.getAllTasks();
    }

  };

  /**
    Controller for /jobs
  **/
  var JobController = function() {

    this.execute = function($scope, $routeParams, $uibModal, projectSvc) {
      //populate dashboard entities in $scope
      $scope.jobs = projectSvc.getAllJobs();
       
    	$scope.openTaskDetails = function(j) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'TaskDetailsModalCtrl',
          resolve: {
            task: function () {
              return j.getTask();
            }
          }
        });
    	};
    };

    this.taskDetailsController = function($scope, $uibModalInstance, task) {
      $scope.t = task;

      $scope.ok = function () {
        $uibModalInstance.close();
      };
    };

  };

  this.projectController = new ProjectController();
  this.resourceController = new ResourceController();
  this.modalInstanceController = new ModalInstanceCtrl();
  this.modalEditInstanceController = new ModalEditInstanceCtrl();

  this.taskController = new TaskController();
  this.jobController = new JobController();

};

Controllers._INSTANCE = new Controllers();

Controllers.init = function() {
  return Controllers._INSTANCE; 
};
