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

    this.execute = function($scope, $routeParams, projectSvc) 
    {
      //populate dashboard entities in $scope
      $scope.tasks = projectSvc.getAllTasks();
    };

  };

  /**
    Controller for /jobs
  **/
  var JobController = function() {

    this.execute = function($scope, $routeParams, $uibModal, projectSvc) {
      //populate dashboard entities in $scope
      $scope.jobs = projectSvc.getAllJobs();

	 $scope.open1 = function(){
			var modalInstance = $uibModal.open({
			templateUrl: 'partials/addJobModalContent.html',
			controller: 'ModalAddJobInstanceCtrl',
		});
	   modalInstance.result.then(function () {
    }, function () {
      window.console.info('Add Job Modal dismissed at: ' + new Date());
    });
	};
	
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

    this.graphController = function($scope, $routeParams, $uibModal, projectSvc) {
      $scope.jobs = projectSvc.getAllJobs();
      $scope.flows = [];//projectSvc.getAllJobs();

      $scope.openJobEdit = function(j) {
        if(j){
          //EDIT JOB
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
       }
       else {
          //NEW JOB

       }
    };

  };
};

var GanttController= function(){
	this.execute=function($scope,$routeParams,projectSvc){
		$scope.jobs = projectSvc.getAllJobs();
		var jobs=$scope.jobs;
		
		g = new JSGantt.GanttChart('g',document.getElementById('GanttChartDIV'), 'day');
		
		g.setShowRes(1); // Show/Hide Responsible (0/1)
		g.setShowDur(1); // Show/Hide Duration (0/1)
		g.setShowComp(0); // Show/Hide % Complete(0/1)
		g.setCaptionType('Resource');  // Set to Show Caption
		//g.setDateInputFormat('mm/dd/yyyy');
		//g.setDateDisplayFormat('MM/DD/YYYY')

		if(g){

		for(var i=0; i<jobs.length; i++) {
			var job = jobs[i];
			//console.log(task.endDate.format("MM/DD/YYYY"));
			var endTime = moment(job.startTime).add(job.getTask().durationDays,'days').toDate();
			g.AddTaskItem(
				new JSGantt.TaskItem(
					job.id,   
					job.name,
					new moment(job.startTime).format("MM/DD/YYYY"),
					new moment(endTime).format("MM/DD/YYYY"),
					'ff00ff', 
					'', 
					0,
					'Harika',
					0, 
					0, 
					'', 
					0,
					job.dependsOn
					));
		}		
			g.Draw();	
			g.DrawDependencies();

		}else {
			console.log("problem in drawing");
		}
	};
};
var JobScheduleController=function(){
       this.execute=function($scope,$routeParams,projectSvc){
               var jobs=projectSvc.getAllJobs();
               var agenda=[];
               var jobSchedule=[],index;
               $scope.schedule=jobSchedule;
               for(var i=0; i<jobs.length; i++) {
               val = jobs[i];
               for(var j=0;j<val.getTask().durationDays;j++){
                               var item={};
                       item.day=new moment(val.startTime).add('days',j).toDate();
                       item.jobName=val.name;
                       agenda.push(item);
               }
               }
               for (var i = 0; i < agenda.length;i++){
               index = dayContains(agenda[i].day);
                   if (index == -1){
                       jobSchedule.push({day: agenda[i].day, jobName: agenda[i].jobName});
                   } else {
                       jobSchedule[index].jobName += ','+agenda[i].jobName;
                   }
               }
        
               function dayContains(key){
                   for (var i=0; i < jobSchedule.length; i++){
                      if (JSON.stringify(jobSchedule[i].day) == JSON.stringify(key)) {
                           return i;
                           break;
                       }
                   }
                   return -1;
               }
     };
 };

var ModalAddJobInstanceCtrl = function($scope, $uibModalInstance) {
	  this.execute = function($scope, $routeParams, $uibModalInstance, projectSvc) {

	  $scope.ok = function () {

		// Setup the new data to be inserted
			$scope.newJob = {};
			$scope.newJob.name = $scope.j_name;
			$scope.newJob.description = $scope.j_description;
			$scope.newJob.myTime = $scope.dt;
			window.console.log('Date is: ' + $scope.dt);			
			//$scope.newJob.startTime = $scope.j_startTime;	
			//$scope.newJob.task = $scope.j_task;	
			
			$scope.newJob.projectId = projectSvc.getProjectId();
			
			projectSvc.addJob($scope.newJob);
			
			$uibModalInstance.close();  
					
	//    $uibModalInstance.close({rname1: $scope.r_name, rcost1: $scope.r_cost, rtype1: $scope.data.singleSelect, resources1: $scope.resources});  
	  };

	  $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel','');
	  };

	  };  
	};   


  this.projectController = new ProjectController();
  this.resourceController = new ResourceController();
  this.modalInstanceController = new ModalInstanceCtrl();
  this.modalEditInstanceController = new ModalEditInstanceCtrl();
  this.modalAddJobInstanceController = new ModalAddJobInstanceCtrl();

  this.taskController = new TaskController();
  this.jobController = new JobController();
  this.ganttController=new GanttController();
this.jobScheduleController=new JobScheduleController();
};

Controllers._INSTANCE = new Controllers();

Controllers.init = function() {
  return Controllers._INSTANCE; 
};
var g; //global for gantt
