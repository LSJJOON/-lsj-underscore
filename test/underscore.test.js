const {
	_each,
	_map,
	_filter,
	_reduce,
	_identity
} = require('../src/lsj_underscore');
const mockCollection = [ // please do not modify this data
	{
		name: 'HG',
		age: 35
	},
	{
		name: 'JH',
		age: 35
	},
	{
		name: 'KH',
		age: 34
	},
	{
		name: 'GW',
		age: 30
	},
	{
		name: 'SJ',
		age: 30
	},
	{
		name: 'JH2',
		age: 25
	}
];

describe('underscore library tests', () => {
	describe('_each tests', () => {
		it('_each tests iterable', () => {
			var count = 0;
			_each(mockCollection, () => {
				count++;
			});
			expect(count).toBe(mockCollection.length);
		});
		it('_each tests object', () => {
			const obj = mockCollection[0];
			_each(obj, (val, key) => {
				expect(val).toBe(obj[key]);
			});
		});
		it('_each tests not error occur when insert undefined', () => {
			expect(() => {
				_each(undefined, (item) => item);
			}).not.toThrow();
		});
	});

	describe('_map tests', () => {
		it('_map tests values test', () => {
			const lists = _map(mockCollection, obj => obj.name);
			const expected = ['HG', 'JH', 'KH', 'GW', 'SJ', 'JH2'];
			expect(lists).toEqual(expect.arrayContaining(expected));
		});
		it('_map tests referential value diffrent', () => {
			const lists = _map(mockCollection, _identity);
			expect(lists).toEqual(expect.arrayContaining(mockCollection));
			expect(lists).not.toBe(mockCollection);
		});
		it('_map insert data undefined and null return empty array', () => {
			expect(_map(undefined, (item) => item.name)).toEqual([]);
		});
	});

	describe('_filter tests', () => {
		it('_filter functionality test', () => {
			const filtered = _filter(mockCollection, (item) => item.age < 30);
			_each(filtered, (item) => {
				expect(item.age < 30).toBe(true);
			});
		});
		it('_filter object test', () => {
			const filtered = _filter(mockCollection[0], (val) => typeof val === 'string');
			_each(filtered, (item) => {
				expect(typeof item).toBe('string');
			});
		});
		it('_filter tests not error occur when insert undefined', () => {
			expect(() => {
				_filter(undefined, (item) => item);
			}).not.toThrow();
		});
	});

	describe('_reduce tests', () => {
		it('_reduce functionality test', () => {
			const result = _reduce(mockCollection, (memo, item) => memo + item.age, 0);
			var expected = 0;
			for (var i = 0; i < mockCollection.length; i++) {
				expected += mockCollection[i].age;
			}
			expect(result).toBe(expected);
		});
		it('_reduce functionality test without assign memo', () => {
			const ages = _map(mockCollection, (item) => item.age);
			const result = _reduce(ages, (memo, age) => memo + age);
			var expected = 0;
			for (var i = 0; i < mockCollection.length; i++) {
				expected += mockCollection[i].age;
			}
			expect(result).toBe(expected);
		});
		it('_reduce object test', () => {
			const result = _reduce(mockCollection[0], (memo, val) => memo + val + ' ', '');
			var expected = '';
			_each(mockCollection[0], (item) => {
				expected += item + ' ';
			});
			expect(result).toBe(expected);
		});
	});
});
