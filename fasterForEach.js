// ;if (...) {
Array.prototype.forEach.__itemProcessorMatcher = '';

Array.prototype.forEach = function(itemProcessor, context) {
	context = context || null;

	var itemProcessorSource = itemProcessor.toString(),
		loopHeader;

	// TODO:
	// - parse out the itemProcessor argument names, right now it's all hardcoded
	// - only add forEach if it isn't already present (duh)

	loopHeader = 'var item, idx, array;\n' +
				'for ( ; __i__ < __len__; __i__++) {\n' +
					'\tif (!(__i__ in __array__)) { continue; }\n' +
					'\titem = __array__[__i__];\n' +
					'\tidx = __i__;\n' +
					'\tarray = __array__;\n';

	itemProcessorSource = itemProcessorSource.replace('function (item, idx, array) {', loopHeader);

	// console.log(itemProcessorSource);
	// console.log(context);

	// eval(itemProcessorSource);
	(new Function('__i__', '__len__', '__array__', itemProcessorSource)).call(context, 0, this.length, this);
};
// }