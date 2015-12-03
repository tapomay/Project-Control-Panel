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
			_project = new Project(name, [], [], [], []);
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

// Task: projectId, name, description, durationDays, resourcesRequired, deliverables
        var t1 = new Task(projectId, 'task1', 'task1 desc', 3, [r1], null);

        var t2 = new Task(projectId, 'task2', 'task2 desc', 1, [r2], null);

        var j1 = new Job(projectId, 'job1', t1.getEntityId(), new Date('11-20-2015'), 0, JobStates.READY);
        var j2 = new Job(projectId, 'job2', t2.getEntityId(), new Date('11-23-2015'), 0, JobStates.READY);

        var f1 = new Flow(j1.getEntityId(), j2.getEntityId());
        f1.setFromJob(j1);
        f1.setToJob(j2);

        var p = new Project('DEMO_PROJECT_1', [r1,r2], [t1, t2], [j1, j2], [f1]);
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

	this.getAllFlows = function() {
		return _project.getAllFlows();		
	};

	this.getProjectId = function() {
		return _project.name;		
	};
	
	this.addResource = function(resObj) {
		if(_project.getResourceById(resObj.getEntityId()))
			throw "Resource already exists: " + resObj.getEntityId();

		var type = ResourceType.get(resObj.type);
			
		var r = new Resource(resObj.projectId, resObj.name, resObj.cost, resObj.type);
		_project.addResource(r);
		return r;
	};

	this.addTask = function(taskObj) {
		if(_project.getTaskById(taskObj.getEntityId()))
			throw "Task already exists: " + taskObj.getEntityId();
		_project.addTask(taskObj);
		return taskObj;
	};

	this.deleteResource = function(resObj) {
		var type = ResourceType.get(resObj.type);
			
		var r = new Resource(resObj.projectId, resObj.name, resObj.cost, resObj.type);
		_project.deleteResource(r);
	};

	this.addJob = function(jobObj) {
		// window.console.log('service - addJob');	
		// var j1 = new Job(jobObj.projectId, jobObj.name, 'task1', jobObj.myTime, '50', 'RUNNING');
		if(_project.getJobById(jobObj.getEntityId()))
			throw "Job already exists: " + jobObj.getEntityId();
		_project.addJob(jobObj);
		return jobObj;
	};
	
	this.validate = function(job, startTime, durationDays, resources) {
		
		// check parentJob conditions
		// if parentJob:
		// 	startime >= parentJob.startime and endTime < parentJob.endTime

		// for each dependsOn:
		// 	check startTime >= dependsOn.endTime

		// for each enables:
		// 	enables.startime >= endTime

		// for each resource
		// 	isAvailable(r, startime, endTime)

		return true; //TODO
	};

	this.dependsOn = function(job) {
		// flowMap[job]
		// ret = [];
		// for f in flowMap:
		// 	if f.toJob == job
		// 		ret.push(f.fromJob)
		return [];
	};

	this.enables = function(job) {
		return [];
	};

	this.addFlow = function(fromJob, toJob) {
		_project.addFlow(fromJob, toJob);
	};
	
	dummyData();
};

ProjectService._INSTANCE = new ProjectService();

var ServiceFactory = function() {
	return ProjectService._INSTANCE;
};