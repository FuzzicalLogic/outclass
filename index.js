"use strict";
const __LOG__ = console.log.bind(console);
const __LOG_ERROR__ = (error) => {
	__LOG__(error.stack);
}

module.exports = {
	initialize: initialize,
	inject: inject
};

function instantiate(Namespace) {
	return new Namespace();
}
async function inject(config) {
	const {Promise} = config || self || global;
}

async function initialize(config) {
	const {Promise} = config || self || global;

	try {
		let [Base, PropertyList] = await Promise.all([
			bindModuleToPromise('./class/base'),
			bindModuleToPromise('./class/property-list')
		]);

		let [Enum, Namespace] = await Promise.all([
			bindModuleToPromise('./class/enum', onBaseClass),
			bindModuleToPromise('./class/namespace', Base)
		]);
	}
	catch(ex) {
		__LOG_ERROR__(ex);
	}

	return new Namespace()
		.expose('Namespace', Namespace)
		.expose('Base', Base)
		.expose('PropertyList', PropertyList)
		.expose('Enum', Enum);
}

async function bindModuleToPromise(location, dependencies) {
	var onLoaded;

	if (dependencies instanceof Array) {
		onLoaded = Promise.all(dependencies).then((injections) => {
			return bindModuleToPromise(location).then((configure) => {
				return Promise.resolve(configure.apply(this, injections));
			});
		});
	}
	else if (dependencies instanceof Promise) {
		onLoaded = dependencies.then((injection) => {
			return bindModuleToPromise(location).then((configure) => {
				return Promise.resolve(configure.call(this, injection));
			});
		});
	}
	else onLoaded = Promise.resolve(require(location));

	return onLoaded.catch(__LOG_ERROR__);
}
