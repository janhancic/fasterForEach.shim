// ;if (...) {
Array.prototype.forEach.__itemProcessorMatcher = '';

Array.prototype.forEach = function(itemProcessor, context) {
	var itemProcessorSource = itemProcessor.toString(),
		loopHeader;

	// TODO:
	// - parse out the itemProcessor argument names, right now it's all hardcoded
	// - add support for the context argument
	// - only add forEach if it isn't already present (duh)

	loopHeader = 'var item, idx, array;\n' +
				// 'var __i__ = 0, __len__ = this.length;\n' +
				'for (var __i__ = 0, __len__ = $__array.length; __i__ < __len__; __i__++) {\n' +
				// 'while (++__i__ < __len__) {\n' +
					'\tif (!(__i__ in $__array)) { continue; }\n' +
					'\titem = $__array[__i__];\n' +
					'\tidx = __i__;\n' +
					'\tarray = $__array;\n';

	itemProcessorSource = itemProcessorSource.replace('function(item, idx, array) {', loopHeader);

	// console.log(itemProcessorSource);
	// console.log(context);

	// eval(itemProcessorSource);
	(new Function('$__array', itemProcessorSource))(this);
};
// }