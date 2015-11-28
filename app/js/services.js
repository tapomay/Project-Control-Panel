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
		var r1 = new Resource('DEMO_PROJECT_1', 'res1', 10, ResourceType.LABOR);		
		var r2 = new Resource('DEMO_PROJECT_1', 'res2', 20, ResourceType.LABOR);

		// var t1 = new Task();

		// var j1 = new Job();

		var p = new Project('DEMO_PROJECT_1', [r1,r2], [], [])
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
	dummyData();
};

ProjectService._INSTANCE = new ProjectService();

var ServiceFactory = function() {
	return ProjectService._INSTANCE;
};