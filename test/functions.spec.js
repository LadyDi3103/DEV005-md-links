const fs = require('fs');
const path = require('path');
const axios = require('axios')
const {
    validatePath,
    readFiles,
    validateLink,
    recursivity,
    stats,
    broken,
    statsBroken
} = require('../functions.js');

// Mocks
jest.mock('fs');
jest.mock('axios');

describe('validatePath', () => {
    test('should throw an error when the path does not exist', () => {
        fs.existsSync.mockReturnValue(false);

        expect(() => {
            validatePath('/path/to/non-existing-file.txt');
        }).toThrow('La ruta no existe');
    });
    test('should return the absolute path when given an absolute path', () => {
        fs.existsSync.mockReturnValue(true);
        path.isAbsolute.mockReturnValue(true);

        const absolutePath = '.test\\prueba2\\test1.md';
        const result = validatePath(absolutePath);
        expect(result).toBe(absolutePath);
    });
})  