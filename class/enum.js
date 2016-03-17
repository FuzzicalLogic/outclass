"use strict";
module.exports = (SuperClass) => {
	SuperClass = typeof SuperClass === 'function'
		? SuperClass : require('./base');

	class Enum extends SuperClass {
		constructor(options) {
			super();
			
			this._idxStart = 1;
			this._idxCurrent = 1;
			this.prefix = options.prefix || '';
			this.prefix = toConstCase(this.prefix + ' ');
		}

		add(name, value) {
			this[name] = new Key(name, value, this.prefix);
			return this;
		}

		get(value) {
			var o = undefined;
			Object.keys(this).forEach((v, k, a) => {
				if (this[v] == value)
					o = this[v];
			});
			return o;
		}
	}

	class Key extends SuperClass {
		constructor(name, value, prefix) {
			super();

			this.name = toConstCase(prefix + name);
			this.value = value;
		}

		toString() {
			return this.name;
		}

		valueOf() {
			return this.value;
		}
	}
	return Enum;
}

function toConstCase(s) {
	var rexpCamel = /([a-z])([A-Z])/g;

	return s.replace(rexpCamel, (match, p1, p2) => {
			return p1 + '_' + p2;
		})
		.replace(/\s+/g, '_')
		.toUpperCase();
}
