function _each (list, iter) {
	var keys = _keys(list);
	for (var i = 0; i < keys.length; i++) {
		iter(list[keys[i]], keys[i]);
	}
}
exports._each = _each;

function _map (list, mapper) {
	var newList = [];
	_each(list, function (val, key) {
		newList.push(mapper(val, key));
	});
	return newList;
}
exports._map = _map;

function _filter (list, predi) {
	var newList = [];
	_each(list, function (val, key) {
		if (predi(val, key)) newList.push(val);
	});
	return newList;
}
exports._filter = _filter;

function _reduce (list, iter, memo) {
	if (memo === undefined) {
		memo = _get(list, _keys(list)[0]);
		console.log('asdflaksdfaisb', memo);
		_each(_rest(list), function (item, key) {
			memo = iter(memo, item, key);
		});
	} else {
		_each(list, function (item, key) {
			memo = iter(memo, item, key);
		});
	}
	return memo;
}
exports._reduce = _reduce;

function _get (obj, key) {
	return obj === null ? undefined : obj[key];
}
exports._get = _get;

function _curry (fn) {
	return function (a) {
		return function (b) {
			return fn(a, b);
		};
	};
}
exports._curry = _curry;

function _curryR (fn) {
	return function (a, b) {
		return arguments.length === 2 ? fn(a, b) : function (b) { return fn(b, a); };
	};
}
exports._curryR = _curryR;

function _pipe () {
	var fns = arguments;
	return function (arg) {
		return _reduce(fns, function (memo, fn) {
			return fn(memo);
		}, arg);
	};
}
exports._pipe = _pipe;

function _go (arg) {
	var fns = _rest(arguments);
	return _pipe.apply(null, fns)(arg);
}
exports._go = _go;

function _rest (list, index) {
	if (!index || index <= 0) index = 1;
	var newList = [];
	_each(list, (item, innerIndex) => {
		if (innerIndex < index) return;
		newList.push(item);
	});
	return newList;
}
exports._rest = _rest;

function _length (collection) {
	return _get(collection, 'length');
}
exports._length = _length;

function _isObject (obj) {
	return typeof obj === 'object' && !!obj;
}
exports._isObject = _isObject;

function _keys (obj) {
	return _isObject(obj) ? Object.keys(obj) : [];
}
exports._keys = _keys;

function _identity (val) {
	return val;
}
exports._identity = _identity;

function _values (data) {
	return _map(data, _identity);
}
exports._values = _values;

function _plcuk (data, key) {
	return _map(data, function (obj) {
		return obj[key];
	});
}
exports._plcuk = _plcuk;

function _negate (func) {
	return function (val) {
		return !func(val);
	};
}
exports._negate = _negate;

function _reject (data, predi) {
	return _filter(data, _negate(predi));
}
exports._reject = _reject;

function _compact (obj) {
	return _filter(obj, _identity);
}
exports._compact = _compact;

function _find (list, predi) {
	var keys = _keys(list);
	for (var i = 0; i < keys.length; i++) {
		var val = list[keys[i]];
		if (predi(val)) return list[keys[i]];
	}
}
exports._find = _find;

function _findIndex (list, predi) {
	var keys = _keys(list);
	for (var i = 0; i < keys.length; i++) {
		if (predi(list[keys[i]])) return i;
	}
	return -1;
}
exports._findIndex = _findIndex;

function _some (list, predi) {
	return (_findIndex(list, predi || _identity) !== -1);
}
exports._some = _some;

function _every (list, predi) {
	return _findIndex(list, _negate(predi || _identity)) === -1;
}
exports._every = _every;

function _min (data, iter) {
	if (!iter) iter = _identity;
	return _reduce(data, function (a, b) {
		return iter(a) < iter(b) ? a : b;
	});
}
exports._min = _min;

function _max (data, iter) {
	if (!iter) iter = _identity;
	return _reduce(data, function (a, b) {
		return iter(a) > iter(b) ? a : b;
	});
}
exports._max = _max;

function _groupBy (data, iter) {
	return _reduce(data, function (grouped, val) {
		var key = iter(val);
		(grouped[key] = grouped[key] || []).push(val);
		return grouped;
	}, {});
}
exports._groupBy = _groupBy;

function _countBy (data, iter) {
	return _reduce(data, function (count, val) {
		var key = iter(val);
		count[key] = (count[key]) ? count[key]++ : 1;
		return count;
	});
}
exports._countBy = _countBy;

function _first (list) {
	return _get(list, 0);
}
exports._first = _first;

function _pairs (data) {
	return _map(data, (val, key) => [key, val]);
}
exports._pairs = _pairs;

function then (fn, a) {
	return _curry((fn, a) => a instanceof Promise ? a.then(fn) : fn(a));
}
exports.then = then;
