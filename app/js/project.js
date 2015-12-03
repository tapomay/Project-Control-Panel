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

var Project = function(name, resources, tasks, jobs, flows) {

	this.name = name;
	this.tasks = tasks;//array expected
	this.jobs = jobs;//array expected
	this.resources = resources;//array expected
	this.flows = flows;

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

		var flows = [];
		for(var i=0; i<obj.flows.length; i++) {
			var f = obj.flows[i];
			var fmod = new Flow(f.fromJob, f.toJob);
			flows.push(fmod);
		}

		var ret = new Project(obj.name, res, tasks, jobs, flows);

		for(var i=0; i<jobs.length; i++) {
			var j = jobs[i];
			var task = ret.getTaskById(j.task);
			j.setTask(task);
		}

		for(var i=0; i<flows.length; i++) {
			var f = flows[i];
			var fromJobObj = ret.getJobById(f.fromJob);
			f.setFromJob(fromJobObj);
			var toJobObj = ret.getJobById(f.toJob);
			f.setToJob(toJobObj);
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

	this.getAllFlows = function() {
		return this.flows;
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

	this.getResourceById = function(entityId) {
		var ret = _resourcesMap[entityId];
		return ret;
	};

	this.getTaskById = function(entityId) {
		var ret = _tasksMap[entityId];
		return ret;
	};

	this.getJobById = function(entityId) {
		var ret = _jobsMap[entityId];
		return ret;
	};

	this.addFlow = function(fromJob, toJob) {
		
		var foundFlows = this.flows.filter(function(f) {
		    return (f.fromJob === fromJob.entityId && f.toJob === toJob.entityId);
	  	});
	  	
	  	if(foundFlows.length > 0) {
	  		throw "Flow exists : " + fromJob.entityId + " => " + toJob.entityId;
	  	}
	  	
		var f1 = new Flow(fromJob.getEntityId(), toJob.getEntityId());
        f1.setFromJob(fromJob);
        f1.setToJob(toJob);
        this.flows.push(f1);
	};

};
