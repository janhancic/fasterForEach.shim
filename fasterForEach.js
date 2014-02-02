// ;if (...) {
Array.prototype.forEach = function(itemProcessor, context) {
	context = context || null;

	var itemProcessorSource = itemProcessor.toString(),
		loopHeader = '',
		innerLoop = '',
		argumentNames;

	argumentNames = itemProcessorSource.slice(itemProcessorSource.indexOf('(') + 1, itemProcessorSource.indexOf(')'));
	argumentNames = argumentNames.match(Array.prototype.forEach.__fasterForEachItemProcessorMatcher__) || [];

	// TODO:
	// - only add forEach if it isn't already present (duh)

	if (argumentNames[0]) {
		loopHeader = 'var ' + argumentNames[0];
		innerLoop = argumentNames[0] + ' = __array__[__i__]; ';
	}

	if (argumentNames[1]) {
		loopHeader = loopHeader.concat(', ' + argumentNames[1]);
		innerLoop = innerLoop.concat(argumentNames[1] + ' = __i__; ');
	}

	if (argumentNames[2]) {
		loopHeader = loopHeader.concat(', ' + argumentNames[2] + ' = __array__');
	}

	loopHeader = loopHeader.concat('; for ( ; __i__ < __len__; __i__++) { if (!(__i__ in __array__)) { continue; }', innerLoop);

	itemProcessorSource = loopHeader + itemProcessorSource.substr(itemProcessorSource.indexOf('{') + 1);

	(new Function('__i__', '__len__', '__array__', itemProcessorSource)).call(context, 0, this.length, this);
};

Array.prototype.forEach.__fasterForEachItemProcessorMatcher__ = new RegExp('([^\s,]+)', 'g');
// }