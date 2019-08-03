const unicornFun = require('.');

test('main', () => {
	expect(() => {
        unicornFun(123);
    }).toThrowError(new TypeError('Expected a string, got number'));

    expect(unicornFun('unicorns')).toEqual('unicorns & rainbows');
});
