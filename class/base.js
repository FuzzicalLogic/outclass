"use strict";

Object.defineProperty(BaseClass, 'prototype', {
	writable: false,
	value: Object.create(null)
});

module.exports = BaseClass;

function BaseClass() { 
	// This is a simple no-op
}
