/**
 * New node file
 */

// var exports = module.exports = {};

var Project = function(name, resources, tasks, jobs) {

	this.name = name;
	this.tasks = tasks;
	this.jobs = jobs;
	this.resources = resources;
	
	Project.create = function(obj) {
		var res = [];
		for(i in obj.resources) {
			var r = obj.resources[i];
			var rmod = Resource.create(r);
			res.push(rmod);
		}
		var tasks = [];
		for(i in obj.tasks) {
			var t = obj.tasks[i];
			var tmod = Task.create(t);
			tasks.push(tmod);
		}
		var jobs = [];
		for(i in obj.jobs) {
			var j = obj.jobs[i];
			var jmod = Job.create(j);
			jobs.push(jmod);
		}
		var ret = new Project(obj.name, res, tasks, jobs);
		ret._id = obj._id;
		return ret;
	};

	this.getAllResources = function() {
		return this.resources;
	};

	this.getAllTasks = function() {
		return this.tasks;
	};

	this.getAllJobs = function() {
		return this.jobs;
	};

	this.addTask = function(task) {
		this.tasks.push(task);
	};
	
	this.addResource = function(resource) {
		this.resources.push(resource);
	};
	
	this.addJob = function(job) {
		this.jobs.push(job);
	};
	
	this.getName = function() {
		return this.name;
	};
};
