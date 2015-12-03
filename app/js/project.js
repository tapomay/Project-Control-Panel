/**
 * New node file
 */

// var exports = module.exports = {};

Array.prototype.toMap = function(){
  var ret = {};
  for(var i=0; i<this.length; i++) {
    val = this[i];
    if(val.entityId) {
	    ret[val.entityId] = val;
    }
  }
  return ret;
}

var Project = function(name, resources, tasks, jobs) {

	this.name = name;
	this.tasks = tasks;//array expected
	this.jobs = jobs;//array expected
	this.resources = resources;//array expected

	var _tasksMap = tasks.toMap();
	var _resourcesMap = resources.toMap();
	var _jobsMap = jobs.toMap();

	Project.create = function(obj) {
		var res = [];
		for(var i=0; i<obj.resources.length; i++) {
			var r = obj.resources[i];
			var rmod = Resource.create(r);
			res.push(rmod);
		}
		var tasks = [];
		for(var i=0; i<obj.tasks.length; i++) {
			var t = obj.tasks[i];
			var tmod = Task.create(t);
			tasks.push(tmod);
		}
		var jobs = [];
		for(var i=0; i<obj.jobs.length; i++) {
			var j = obj.jobs[i];
			var jmod = Job.create(j);
			jobs.push(jmod);
		}

		var ret = new Project(obj.name, res, tasks, jobs);

		for(var i=0; i<jobs.length; i++) {
			var j = jobs[i];
			var task = ret.getTaskById(j.task);
			j.setTask(task);
		}
		ret._id = obj._id;
		return ret;
	};

	this.printTasks = function(){
		window.console.log("3PO: " + _tasksMap);
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
		_tasksMap[task.entityId] = task;
	};
	
	this.addResource = function(resource) {
		this.resources.push(resource);
		_resourcesMap[resource.entityId] = resource;
	};
	
	this.deleteResource = function(resource) {
    	this.resources.pop(resource);
    }

	this.addJob = function(job) {
//		if(job.task in _tasksMap) {
		if(1) {
			
			this.jobs.push(job);
			_jobsMap[job.entityId] = job;
		}
		else {
			throw "Invalid task: " + job.task;
		}
	};
	
	this.getName = function() {
		return this.name;
	};

	this.getTaskById = function(entityId) {
		var ret = _tasksMap[entityId];
		return ret;
	};

};
