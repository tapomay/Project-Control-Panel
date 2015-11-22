/**
 * New node file
 */
var Enum = require('enum');
var exports = module.exports = {};

var ResourceType = new Enum([ 'LABOR', 'EQUIPMENT', 'MATERIAL' ]);
exports.ResourceType = ResourceType;

var Resource = function(name, cost, resourceType) {
	var _name = name;
	var _cost = cost;
	var _resourceType = resourceType;
	
	if (isNaN(_cost)) {
		throw "Invalid cost: " + String(_cost);
	}

	if (!(_resourceType in ResourceType)) {
		throw "Invalid resourceType: " + String(_resourceType);
	}

	this.getName = function() {
		return _name;
	};

	this.getCost = function() {
		return _cost;
	};

	this.getResourceType = function() {
		return _resourceType;
	};
};
exports.Resource = Resource;

var Task = function(name, description, durationDays, laborRequired,
		equipmentRequired, materialRequired, deliverables) {

	var _name = name;
	var _description = description;
	var _durationDays = durationDays;
	var _laborRequired = laborRequired;
	var _equipmentRequired = equipmentRequired;
	var _materialRequired = materialRequired;
	// var _deliverables = deliverables; //TODO:

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
		return _name;
	};

	this.getDescription = function() {
		return _description;
	};

	this.getDuration = function() {
		return _durationDays;
	};

	this.getlaborRequired = function() {
		return _laborRequired;
	};

	this.getMaterialRequired = function() {
		return _materialRequired;
	};

	this.getEquipmentRequired = function() {
		return _equipmentRequired;
	};
};
exports.Task = Task;

var JobStates = new Enum([ 'READY', 'RUNNING', 'COMPLETE' ]);
exports.JobStates = JobStates;

var Job = function(name, task, startTime) {
	var _name = name;
	var _task = task;
	var _startTime = startTime;
	var _percentComplete = 0;
	var _state = JobStates.READY;

	if (!(_task instanceof Task)) {
		throw "Task Invalid: Must be a Task() - " + Object.keys(_task);
	}

	if (!(_startTime instanceof Date)) {
		throw "StartTime Invalid: Must be a Date() - " + Object.keys(_startTime);
	}

	this.getName = function() {
		return _name;
	};

	this.getTask = function() {
		return _task;
	};

	this.getStartTime = function() {
		return _startTime;
	};

	this.getPercentComplete = function() {
		return _percentComplete;
	};

	this.getState = function() {
		return _state;
	};
	
	this.changeState = function(newState) {
		if(!(newState in JobStates)) {
			throw "Invalid JobState: " + String(newState);
		}
		this._state = newState;
	};
};
exports.Job = Job;

