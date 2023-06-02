const mdLinks = require('../index');

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
describe('mdLinks', () => {
    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('Should return a promiss', () => {
        const pathRoute = './prueba/hijo.md'
        const options = { validate: false };
        expect(mdLinks(pathRoute, options)).toBeInstanceOf(Promise);
    })
    it('Should reject the promiss when the path does not exist', () => {
        return mdLinks('./prueba/noExiste.md').catch((error) => {
            expect(error.message).toBe(`La ruta es inválida`);
        })
    })
    it('Should return an array showing href, text, file, status y statusText if user digits opcion --validate', () => {
        const resPromise = mdLinks('C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba', {validate: true});
        return resPromise.then((res)=>{
            expect(res).toEqual(objectValidate);
        })
    })
    it('Should return an array showing href, text and file if there are any opcion but the path', () => {
        const resPromise = mdLinks('C:\\Users\\LABORATORIA\\Desktop\\MDLINKS(1)\\DEV005-md-links\\prueba', {validate: false});
        return resPromise.then((res)=>{
            expect(res).toEqual(objectWithoutValidate);
        })
    })
});

