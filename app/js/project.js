/**
 * New node file
 */

var exports = module.exports = {};

var Project = function(name) {
	var _name = name;
	
	this.tasks = new Array();
	this.jobs = new Array();
	this.resources = new Array();
	
	this.addTask = function(task) {
		this.tasks.push(task);
	};
	
	this.addResource(resource) {
		this.resources.push(resource);
	};
	
	this.addJob(job) {
		this.jobs.add(j);
	};
	
	this.getName = function() {
		return _name;
	}
};
