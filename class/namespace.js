"use strict";
module.exports = (SuperClass) => {
	SuperClass = typeof SuperClass === 'function'
		? SuperClass : Object;

	var internal = new WeakMap();
	return class Namespace extends SuperClass {
		constructor() {
			super();
		}

		expose(name, value) {
			return Object.defineProperty(this, name, {
				enumerable: true,
				get: () => { return value; }
			});
		}
	};
};
