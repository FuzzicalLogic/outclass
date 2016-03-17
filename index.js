"use strict";
var onBaseClass = bindModuleToPromise('./class/base'),
	onPropertyList = bindModuleToPromise('./class/property-list'),
	onEnum = bindModuleToPromise('./class/enum', onBaseClass),
	onNamespace = bindModuleToPromise('./class/namespace', onBaseClass);

module.exports = {
	initialize: () => {
		return onNamespace.then((Namespace) => {
			var __namespace__ = new Namespace()
				.expose('Base', onBaseClass)
				.expose('PropertyList', onPropertyList)
				.expose('Namespace', onNamespace)
				.expose('Enum', onEnum);

			return __namespace__;
		});
	}
};

function bindModuleToPromise(location, dependencies) {
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

	return onLoaded.catch(catchEvaluationException);
}

function catchEvaluationException(error) {
	console.log(error.stack);
}
