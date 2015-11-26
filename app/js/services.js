
var ACTION_TMPL = "{query: {method:'GET', params:{__attrib__:'@__attrib__', project: @projectId}, isArray:true};";;

var ProjectService = function() {
	
	var buildResource = function($resource, path, attrib) {
		var url = path;
		if(attrib)
			url = url + '/:' + attrib; //'res/:resId';
		
		var paramDefaults = {};
		var options = {};

		var actionsStr = ACTION_TMPL.replace(/__attrib__/g, attrib);
		var actions = eval(actionsStr);

		var ret = $resource(url, [paramDefaults], [actions], options);
    	return ret;
	};

	this.resourceFactory = function($resource) {
		var ret = buildResource($resource, 'res', 'resId');
    	return ret;
    };

	this.taskFactory = function($resource) {
		var ret = buildResource($resource, 'tasks', 'taskId');
    	return ret;
    };

	this.jobFactory = function($resource) {
		var ret = buildResource($resource, 'jobs', 'jobId');
    	return ret;
    };

	this.projectFactory = function($resource) {
		var ret = buildResource($resource, 'project', 'projId');
    	return ret;
    };

};

var ServiceFactory = function() {
	var createProjectService = function() {
		return new ProjectService();
	};
};