const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {
    validatePath,
    readFiles,
    validateLink,
    recursivity,
    statsOption,
    statsValidate,
    obtainLinks
} = require('../functions.js');
// Mocks
jest.mock('fs');
jest.mock('axios');

const cwd = process.cwd();
const objectValidate = [
    {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\filePrueba.md',
        status: 200,
        ok: 'ok'
    },
    {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\filePrueba.md',
        status: 200,
        ok: 'ok'
    },
    {
        href: 'about:blank#9-checklist',
        text: '9. Checklist',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\filePrueba.md',
        status: 404,
        ok: 'fail'
    },
    {
        href: 'http://www.google.com.pe/',
        text: 'www.google.com.pe',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\hija\\sobrina.md',
        status: 200,
        ok: 'ok'
    }
]
const objectWithoutValidate = [
    {
        href: 'https://nodejs.org/es/',
        text: 'Node.js',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\filePrueba.md'
    },
    {
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\filePrueba.md'
    },
    {
        href: 'about:blank#9-checklist',
        text: '9. Checklist',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\filePrueba.md'
    },
    {
        href: 'http://www.google.com.pe/',
        text: 'www.google.com.pe',
        file: 'C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\hija\\sobrina.md'
    }
]
const validateStats =



jest.mock('node:process', () => ({
    argv: ['', '', 'prueba'], // node  cli.. prueba
}));

describe('validatePath', () => {
    it('should be a function', () => { //pasa
        expect(typeof validatePath).toBe('function');
    });
    it('should return false if there is not path', () => { //NO PASA
        expect(validatePath('')).toBeFalsy();
    });
    it('should return true if there is a path', () => {
        expect(validatePath(cwd)).toBeTruthy();
    });
    it('should return the absolute path when given a valid path', () => {
        const pathUser = './prueba/hija/sobrina.md';
        const result = validatePath(pathUser);
        expect(result).toEqual('C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba\\hija\\sobrina.md');
    });
    it('should throw an error when given an invalid path', () => {
        const pathUserInvalid = './invalid/path';
        expect(() => {
            validatePath(pathUserInvalid);
        }).toThrowError('La ruta no existe');
    });
});
describe('statsValidate', () => {
    it('should return the correct statistics when given an array of validated links', () => {
        const result = statsValidate(objectValidate);
        const expected = `
        Final Stats-Validate
        TOTAL: 4
        UNIQUE: 4
        BROKEN: 1
        `;
        expect(result).toEqual(expected);
    });
})
describe('statsOption', () => {
    it('should return the correct statistics when given an array of links', () => {
        const result = statsOption(objectValidate);
        const expected = `
        Final Stats:
        TOTAL: 4
        UNIQUE: 4
        `;
        expect(result).toEqual(expected);
    });
    // Add more test cases
});
describe('recursivity', () => {
    it('should return an array of file paths when given a directory path', () => {
        const resultPath = './directory';
        const result = recursivity(resultPath);
        const expected = ['./directory/file1.md', './directory/file2.md'];
        expect(result).toEqual(expected);
    });

    // Add more test cases
});
describe('validateLink', () => {
    it('should return an array of validated links when given an array of links', async () => {
        const result = await validateLink(objectValidate);
        expect(result).toEqual(objectValidate);
    });

    // Add more test cases
}); // agregar un set time out trabajar con .then 
describe('readFiles', () => {
    it('should return an array of links when given an array of file paths', async () => {
        const arrFiles = ['./file1.md', './test1.md', './vacio.md'];
        const result = await readFiles(arrFiles);
        expect(result).toBeEqual(objectValidate);
    });

    // Add more test cases
});