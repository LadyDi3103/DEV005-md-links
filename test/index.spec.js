const mdLinks = require('../index');

describe('mdLinks', () => {
    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('Should return a promiss', () =>{
        const pathRoute = './prueba/hijo.md'
        expect(mdLinks(pathRoute)).toBeInstanceOf(Promise);
    })
});