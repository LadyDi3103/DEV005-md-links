const { mdLinks } = require('../index');

describe('mdLinks', () => {
    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
    it('should reject when the path doesnt exist', () => {
        return mdLinks('/no/existe/path.md').catch((error) => {
            expect(error).toBe('La ruta no existe');
        });
    });
    it("test_path_exists_and_is_absolute", () => {
        const pathUser = "/Users/username/Documents";
        const result = validatePath(pathUser);
        expect(result).toEqual(pathUser);
    });
});
