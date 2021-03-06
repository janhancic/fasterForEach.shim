Array.prototype.fasterForEach = function(itemProcessor, context) {
	context = context || null;

	var itemProcessorSource = itemProcessor.toString(),
		loopHeader = '',
		innerLoop = '',
		argumentNames;

	argumentNames = itemProcessorSource.slice(itemProcessorSource.indexOf('(') + 1, itemProcessorSource.indexOf(')'));
	argumentNames = argumentNames.match(Array.prototype.fasterForEach.__fasterForEachItemProcessorMatcher__) || [];

	if (argumentNames[0]) {
		loopHeader = 'var ' + argumentNames[0];
		innerLoop = argumentNames[0] + ' = __array__[__i__]; ';
	}

	if (argumentNames[1]) {
		loopHeader += ', ' + argumentNames[1];
		innerLoop += argumentNames[1] + ' = __i__; ';
	}

	if (argumentNames[2]) {
		loopHeader += ', ' + argumentNames[2] + ' = __array__';
	}

	loopHeader += '; for ( ; __i__ < __len__; ++__i__) { if (!(__i__ in __array__)) { continue; }' + innerLoop;

	itemProcessorSource = loopHeader + itemProcessorSource.substr(itemProcessorSource.indexOf('{') + 1);

	(new Function('__i__', '__len__', '__array__', itemProcessorSource)).call(context, 0, this.length, this);
};

Array.prototype.fasterForEach.__fasterForEachItemProcessorMatcher__ = new RegExp('([^\s,]+)', 'g');

Array.prototype.fasterForEachEval = function(itemProcessor, context) {
	context = context || null;

	var itemProcessorSource = itemProcessor.toString(),
		loopHeader = '',
		innerLoop = '',
		argumentNames;

	argumentNames = itemProcessorSource.slice(itemProcessorSource.indexOf('(') + 1, itemProcessorSource.indexOf(')'));
	argumentNames = argumentNames.match(Array.prototype.fasterForEachEval.__fasterForEachItemProcessorMatcher__) || [];

	if (argumentNames[0]) {
		loopHeader = 'var ' + argumentNames[0];
		innerLoop = argumentNames[0] + ' = __array__[__i__]; ';
	}

	if (argumentNames[1]) {
		loopHeader += ', ' + argumentNames[1];
		innerLoop += argumentNames[1] + ' = __i__; ';
	}

	if (argumentNames[2]) {
		loopHeader += ', ' + argumentNames[2] + ' = __array__';
	}

	loopHeader += '; for ( ; __i__ < __len__; ++__i__) { if (!(__i__ in __array__)) { continue; }' + innerLoop;

	itemProcessorSource = loopHeader + itemProcessorSource.substr(itemProcessorSource.indexOf('{') + 1);

	eval('var tmpFnc = function (__i__, __len__, __array__) {' + itemProcessorSource + '};');
	tmpFnc.call(context, 0, this.length, this);
};

Array.prototype.fasterForEachEval.__fasterForEachItemProcessorMatcher__ = new RegExp('([^\s,]+)', 'g');
