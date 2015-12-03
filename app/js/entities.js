/**
 * New node file
 */
// (function(){ 

// var app = angular.module('pcpBlueApp',[]);

var Enum = require('enum');
var uuid = require('node-uuid');
// var exports = module.exports = {};

var ResourceType = new Enum([ 'LABOR', 'EQUIPMENT', 'MATERIAL' ]);
// exports.ResourceType = ResourceType;

var Resource = function(projectId, name, cost, resourceType) {
	
	Resource.create = function(obj) {
		var type = ResourceType.get(obj.resourceType);
		var ret = new Resource(obj.projectId, obj.name, obj.cost, type);
		ret.entityId = obj.entityId;
		return ret;
	};

	this.projectId = projectId;
	this.name = name;
	this.cost = cost;
	this.resourceType = resourceType;
	this.entityId = uuid.v4();
	
	if (isNaN(this.cost)) {
		throw "Invalid cost: " + String(this.cost);
	}

	if (!(this.resourceType in ResourceType)) {
		throw "Invalid resource type: " + String(this.resourceType);
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

	this.getEntityId = function() {
		return this.entityId;
	};

};
// exports.Resource = Resource;

var Task = function(projectId, name, description, durationDays, laborRequired,
		equipmentRequired, materialRequired, deliverables, resourceList) {

	Task.create = function(obj) {
		var ret = new Task(obj.projectId, obj.name, obj.description, obj.durationDays, obj.laborRequired,
		obj.equipmentRequired, obj.materialRequired, obj.deliverables, obj.resourceList);
		ret.entityId = obj.entityId;
		return ret;
	};

	this.projectId = projectId;
	this.name = name;
	this.description = description;
	this.durationDays = durationDays;
	this.laborRequired = laborRequired;
	this.equipmentRequired = equipmentRequired;
	this.materialRequired = materialRequired;
	this.deliverables = deliverables; //TODO:
	this.resourceList = resourceList;
	this.entityId = uuid.v4();

	var _attribs = {
		'duration' : this.durationDays,
		'laborRequired' : this.laborRequired,
		'equipmentRequired' : this.equipmentRequired,
		'materialRequired' : this.materialRequired
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

	this.getEntityId = function() {
		return this.entityId;
	};
};
// exports.Task = Task;

var JobStates = new Enum([ 'READY', 'RUNNING', 'COMPLETE' ]);
// exports.JobStates = JobStates;

var Job = function(projectId, name, task, startTime, percentComplete, state) {

	Job.create = function(obj) {
		var d = new Date(obj.startTime);
		var ret = new Job(obj.projectId, obj.name, obj.task, d, obj.percentComplete, obj.state);
		ret.entityId = obj.entityId;
		return ret;
	};
	this.projectId = projectId;
	this.name = name;
	this.task = task;
	this.startTime = startTime;
	this.percentComplete = percentComplete;
	this.state = state;
	this.entityId = uuid.v4();
	var _taskObj = null;

/*
	if (!(this.startTime instanceof Date)) {
		throw "StartTime Invalid: Must be a Date() - " + Object.keys(this.startTime);
	}    
*/

	this.getTask = function(){
		return _taskObj;
	};

	this.setTask = function(t){
		if(!(t instanceof Task)){
			throw "Invalid task: " + t;
		}
		_taskObj = t;
	};

	this.getName = function() {
		return this.name;
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

	this.getEntityId = function() {
		return this.entityId;
	};

};
// exports.Job = Job;

var Flow = function(fromJob, toJob) {
	this.fromJob = fromJob;
	this.toJob = toJob;
};