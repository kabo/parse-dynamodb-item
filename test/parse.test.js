const assert = require('assert');

const parse = require('../parse');

describe('test to parse', () => {
    it('should parse a string', () => {
        const parsed = parse({ S: 'string' });

        assert(parsed === 'string');
    });

    it('should parse a number', () => {
        const parsed = parse({ N: '1' });
        assert(parsed == 1);
    });

    it('should parse a buffer', () => {
        const parsed = parse({ B: Buffer('hola') });

        assert(Buffer.isBuffer(parsed));
    });

    it('should parse a boolean', () => {
        const parsed = parse({ BOOL: 0 });

        assert(parsed == false);
    });

    it('should parse a map', () => {
        const parsed = parse({ test:{
            M: {
                string:{ S:4 }
            }
        }
        });
        assert.deepEqual(parsed, { test: { string: '4' } });
    });

    it('should parse a map with string', () => {
        const parsed = parse({
            string:{ S:4 }
        });
        assert.deepEqual(parsed, { string: '4' });
    });

    it('should parse a map with string', () => {
        const parsed = parse({
            string:{ S:4 },
            number:{ N:'4' },
            array:{ L:[ {N: 1}, {N: 2}, {N: 3}, {N: 4} ] },
            map:{ M:{
                string:{ S:4 },
                number:{ N:'4' },
                array:{ L:[ {N: 1}, {N: 2}, {N: 3}, {N: 4} ] },
                map:{ M:{
                    string: {
                        S: 2343
                    }
                } },
            } },
        });
        assert.deepEqual(parsed, {
            string: '4',
            number: 4,
            array: [ 1, 2, 3, 4 ],
            map:
         { string: '4',
             number: 4,
             array: [ 1, 2, 3, 4 ],
             map: { string: '2343' } } });
    });

    it('should parse string set', () => {
        const parsed = parse({
            SS: [ 'one', 'two', 'three' ]
        });
        assert.deepEqual(parsed, [ 'one', 'two', 'three' ]);
    });

    it('should parse a map with a string set', () => {
        const parsed = parse({
            stringSet: {
                SS: [ 'one', 'two', 'three' ]
            }
        });
        assert.deepEqual(parsed, {
            stringSet: [ 'one', 'two', 'three' ]
        });
    });

    it('should parse number set', () => {
        const parsed = parse({
            NS: [ '1', '2', '3', '4.5' ]
        });
        assert.deepEqual(parsed, [ 1, 2, 3, 4.5 ]);
    });

    it('should list of strings', () => {
        const parsed = parse({
            L: [ { S: 'a-string' } ]
        });
        assert.deepEqual(parsed, [ 'a-string' ]);
    });

    it('should parse a map with a number set', () => {
        const parsed = parse({
            numberSet: {
                SS: [ '1', '2', '3', '4.5' ]
            }
        });
        assert.deepEqual(parsed, {
            numberSet: [ 1, 2, 3, 4.5 ]
        });
    });
});
