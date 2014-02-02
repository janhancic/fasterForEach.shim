Array.prototype.forEach = function(itemProcessor, context) {
	var itemProcessorSource = itemProcessor.toString(),
		loopHeader;

	loopHeader = 'var item;\n' +
				'for (var \$__i = 0, \$__len = this.length; \$__i < \$__len; \$__i++) {\n' +
					'\tif (typeof this[\$__i] === "undefined") { continue; }\n' +
					'\titem = this[\$__i];\n' +
					'\tidx = $__i;\n' +
					'\tarray = this;\n';

	itemProcessorSource = itemProcessorSource.replace('function (item, idx, array) {', loopHeader);

	console.log(itemProcessorSource);
	console.log(context);

	eval(itemProcessorSource);
};