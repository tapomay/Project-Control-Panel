'use strict';

// var db = require('diskdb');
// db.connect('collections', ['projects', 'resources', 'tasks', 'jobs']);
// db.connect('collections', ['projects']);

var ProjectService = function() {
	
	var db = require('diskdb');
	db.connect('collections', ['projects']);

	var _project = null;

	this.loadProject = function(name) {
		var projects = db.projects.find({'name':name});
		if(projects.length == 0) {
			_project = new Project(name, [], [], []);
		} else {
			var p = projects[0];
			_project = Project.create(p);
		}
		alert('Loaded:' + _project.name);
	};

	this.saveProject = function(){
      
	};

	this.activeProject = function(){
      
	return _project.name;
	}

    var dummyData = function() {
        var projectId = 'DEMO_PROJECT_1'
        var r1 = new Resource(projectId, 'res1', 10, ResourceType.LABOR);
        var r2 = new Resource(projectId, 'res2', 20, ResourceType.LABOR);

        var t1 = new Task(projectId, 'task1', 'task1 desc', 3, 2,
        0, 0, null);

        var t2 = new Task(projectId, 'task2', 'task2 desc', 1, 0,
        1, 1, null);

        var j1 = new Job(projectId, 'job1', t1.getEntityId(), new Date('11-20-2015'), 0, JobStates.READY);
        var j2 = new Job(projectId, 'job2', t2.getEntityId(), new Date('11-23-2015'), 0, JobStates.READY);

        var p = new Project('DEMO_PROJECT_1', [r1,r2], [t1, t2], [j1, j2]);
        db.projects.save(p);
    };
	this.getAllResources = function() {
		      
		return _project.getAllResources();
	};

	this.getAllJobs = function() {
		return _project.getAllJobs();
	};

	this.getAllTasks = function() {
		return _project.getAllTasks();		
	};

	this.getProjectId = function() {
		return _project.name;		
	};
	
	this.addResource = function(resObj) {
		var type = ResourceType.get(resObj.type);
			
		var r = new Resource(resObj.projectId, resObj.name, resObj.cost, resObj.type);
		_project.addResource(r);
	};
	this.addTask = function(taskObj) {
		var type = ResourceType.get(taskObj.type);
			
		var t = new Task(taskObj.projectId, taskObj.name, taskObj.description, taskObj.durationDays);
		_project.addTask(t);
	};

	this.deleteResource = function(resObj) {
		var type = ResourceType.get(resObj.type);
			
		var r = new Resource(resObj.projectId, resObj.name, resObj.cost, resObj.type);
		_project.deleteResource(r);
	};

	this.addJob = function(jobObj) {
		window.console.log('service - addJob');	
		var j1 = new Job(jobObj.projectId, jobObj.name, 'task1', jobObj.myTime, '50', 'RUNNING');
		_project.addJob(j1);
	};
	
	dummyData();
};

ProjectService._INSTANCE = new ProjectService();

var ServiceFactory = function() {
	return ProjectService._INSTANCE;
};