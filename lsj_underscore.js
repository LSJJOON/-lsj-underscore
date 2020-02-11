function _each (list, iter) {
	for (var i = 0; i < list.length; i++) {
		iter(list[i]);
	}
}

function _map (list, mapper) {
	var newList = [];
	_each(list, function (val, key) {
		newList.push(mapper(val, key));
	});
	return newList;
}

function _filter (list, predi) {
	var newList = [];
	_each(list, function (val, key) {
		if (predi(val, key)) newList.push(val);
	});
	return newList;
}

function _reduce (list, iter, memo) {
	if (memo === undefined) {
		memo = list[0];
		for (let i = 1; i < list.length; i++) {
			memo = iter(memo, list[i]);
		}
	} else {
		for (let i = 0; i < list.length; i++) {
			memo = iter(memo, list[i]);
		}
	}
	return memo;
}

function _get (obj, key) {
	return obj === null ? undefined : obj[key];
}

function _curryR (fn) {
	return function (a, b) {
		return arguments.length === 2 ? fn(a, b) : function (b) { return fn(b, a); };
	};
}

function _pipe () {
	var fns = arguments;
	return function (arg) {
		return _reduce(fns, function (memo, fn) {
			return fn(memo);
		}, arg);
	};
}
