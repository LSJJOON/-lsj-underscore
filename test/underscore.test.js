const { _map, _identity } = require('../src/lsj_underscore');
const mockCollection = [
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
	});
});
