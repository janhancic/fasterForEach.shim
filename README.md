# fasterForEach
A hack to see if I can make a faster forEach shim for IE8.

## About
This is a hack that adds support for `Array#forEach` to IE8 but in a different way than the [ES5 shim](https://github.com/es-shims/es5-shim).

This basically rewrites the item processor (callback you pass into forEach) into a regular `for` loop and executes that (as oposed to executing the callback on each iteration). The result is that instead of `1 + n` function invocations that you get with native or shimed `forEach` you get only two function invocations.

I created two nearly identical versions, the only difference is how the rewriten code gets executed. One uses `eval` and the other uses `new Function()`.

Testing shows that both versions are faster than the ES5 shim. However I only have access to a VM from [modern.ie](http://modern.ie) running on a Macbook Air. But please visit this [jsPerf test page](http://jsperf.com/faster-foreach-shim) and give it a spin so I can collect more data.

## Is it usable?
I haven't tested this in any real project, but in theory I don't see why it couldn't be used.

## License
Licensed under MIT. See `LICENSE.md` file for details.