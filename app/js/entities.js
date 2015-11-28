/**
 * New node file
 */
// (function(){ 

// var app = angular.module('pcpBlueApp',[]);

var Enum = require('enum');
// var exports = module.exports = {};

var ResourceType = new Enum([ 'LABOR', 'EQUIPMENT', 'MATERIAL' ]);
// exports.ResourceType = ResourceType;

var Resource = function(projectId, name, cost, resourceType) {
	
	Resource.create = function(obj) {
		var type = ResourceType.get(obj.resourceType);
		var ret = new Resource(obj.projectId, obj.name, obj.cost, type);
		ret._id = obj._id;
		return ret;
	};

	this.projectId = projectId;
	this.name = name;
	this.cost = cost;
	this.resourceType = resourceType;
	
	if (isNaN(this.cost)) {
		throw "Invalid cost: " + String(this.cost);
	}

	if (!(this.resourceType in ResourceType)) {
		throw "Invalid resourceType: " + String(this.resourceType);
	}

	this.getName = function() {
		return this.name;
	};

	this.getCost = function() {
		return this.cost;
	};

	this.getResourceType = function() {
		return this.resourceType;
	};

};
// exports.Resource = Resource;

var Task = function(projectId, name, description, durationDays, laborRequired,
		equipmentRequired, materialRequired, deliverables) {

	Task.create = function(obj) {
		var ret = new Task(obj.projectId, obj.name, obj.description, obj.durationDays, obj.laborRequired,
		obj.equipmentRequired, obj.materialRequired, obj.deliverables);
		ret._id = obj._id;
		return ret;
	};

	this.projectId = projectId;
	this.name = name;
	this.description = description;
	this.durationDays = durationDays;
	this.laborRequired = laborRequired;
	this.equipmentRequired = equipmentRequired;
	this.materialRequired = materialRequired;
	// this.deliverables = deliverables; //TODO:

	var _attribs = {
		'duration' : _durationDays,
		'laborRequired' : _laborRequired,
		'equipmentRequired' : _equipmentRequired,
		'materialRequired' : _materialRequired
	};

	for ( var key in _attribs) {
		if (isNaN(_attribs[key])) {
			throw "Invalid " + key + ": " + String(_attribs[key]);
		}
	}

	this.createJob = function(name, startTime) {
		var j = new Job(name, this, startTime);
		return j;
	};

	this.getName = function() {
		return this.name;
	};

	this.getDescription = function() {
		return this.description;
	};

	this.getDuration = function() {
		return this.durationDays;
	};

	this.getlaborRequired = function() {
		return this.laborRequired;
	};

	this.getMaterialRequired = function() {
		return this.materialRequired;
	};

	this.getEquipmentRequired = function() {
		return this.equipmentRequired;
	};
};
// exports.Task = Task;

var JobStates = new Enum([ 'READY', 'RUNNING', 'COMPLETE' ]);
// exports.JobStates = JobStates;

var Job = function(projectId, name, task, startTime, percentComplete, state) {

	Job.create = function(obj) {
		var ret = new Job(obj.projectId, obj.name, obj.task, obj.startTime, obj.percentComplete, obj.state);
		ret._id = obj._id;
		return ret;
	};
	this.projectId = projectId;
	this.name = name;
	this.task = task;
	this.startTime = startTime;
	this.percentComplete = percentComplete;
	this.state = state;

	if (!(this.task instanceof Task)) {
		throw "Task Invalid: Must be a Task() - " + Object.keys(this.task);
	}

	if (!(this.startTime instanceof Date)) {
		throw "StartTime Invalid: Must be a Date() - " + Object.keys(this.startTime);
	}

	this.getName = function() {
		return this.name;
	};

	this.getTask = function() {
		return this.task;
	};

	this.getStartTime = function() {
		return this.startTime;
	};

	this.getPercentComplete = function() {
		return this.percentComplete;
	};

	this.getState = function() {
		return this.state;
	};
	
	this.changeState = function(newState) {
		if(!(newState in JobStates)) {
			throw "Invalid JobState: " + String(newState);
		}
		this.state = newState;
	};
};
// exports.Job = Job;

// })();