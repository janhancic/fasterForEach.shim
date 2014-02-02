// ;if (...) {
Array.prototype.forEach = function(itemProcessor, context) {
	context = context || null;

	var itemProcessorSource = itemProcessor.toString(),
		loopHeader = '',
		innerLoop = '',
		argumentNames;

	argumentNames = itemProcessorSource.slice(itemProcessorSource.indexOf('(') + 1, itemProcessorSource.indexOf(')'));
	argumentNames = argumentNames.match(Array.prototype.forEach.__fasterForEachItemProcessorMatcher__);

	// TODO:
	// - only add forEach if it isn't already present (duh)

	if (argumentNames[0]) {
		loopHeader = 'var ' + argumentNames[0] + ';\n';
		innerLoop = '\t' + argumentNames[0] + ' = __array__[__i__];\n';
	}

	if (argumentNames[1]) {
		loopHeader += 'var ' + argumentNames[1] + ';\n';
		innerLoop += '\t' + argumentNames[1] + ' = __i__;\n';
	}

	if (argumentNames[2]) {
		loopHeader += 'var ' + argumentNames[2] + ' = __array__;\n';
	}

	loopHeader += 'for ( ; __i__ < __len__; __i__++) {\n' +
					'\tif (!(__i__ in __array__)) { continue; }\n' +
					innerLoop;

	itemProcessorSource = loopHeader + '\n' + itemProcessorSource.substr(itemProcessorSource.indexOf('{') + 1);

	(new Function('__i__', '__len__', '__array__', itemProcessorSource)).call(context, 0, this.length, this);
};

Array.prototype.forEach.__fasterForEachItemProcessorMatcher__ = new RegExp('([^\s,]+)', 'g');
// }