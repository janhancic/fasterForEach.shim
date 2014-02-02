Array.prototype.forEach = function(itemProcessor, context) {
	var itemProcessorSource = itemProcessor.toString(),
		loopHeader;

	// TODO:
	// - parse out the itemProcessor argument names, right now it's all hardcoded
	// - add support for the context argument
	// only add forEach if it isn't already present (duh)

	loopHeader = 'var item;\n' +
				'for (var $__i = 0, $__len = this.length; $__i < $__len; $__i++) {\n' +
					'\tif (!($__i in this)) { continue; }\n'
					'\titem = this[$__i];\n' +
					'\tidx = $__i;\n' +
					'\tarray = this;\n';

	itemProcessorSource = itemProcessorSource.replace('function (item, idx, array) {', loopHeader);

	console.log(itemProcessorSource);
	console.log(context);

	eval(itemProcessorSource);
};