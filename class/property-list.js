"use strict";
module.exports = (function() {
	var internal = new WeakMap();
	return class PropertyList extends WeakMap {
		constructor(keys) {
			super();
			internal.set(this, cloneKeys(keys));
		}

		initialize(o) {
			this.set(o, cloneKeys(this.properties));
			return this.get(o);
		}

		get properties() {
			return internal.get(this);
		}
	};
}) ();

function cloneKeys(o) {
	var clone = Object.create(null);
	Object.keys(o).forEach((key) => {
		clone[key] = o[key];
	});
	return clone;
}
