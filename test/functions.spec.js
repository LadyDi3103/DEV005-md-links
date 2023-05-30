const { mdLinks } = require('../index');
// const {obtainLinks} = require('../functions')

describe('mdLinks', () => {
    it('should be a function', () => {
        expect(typeof mdLinks).toBe('function');
    });
    // it('should reject when the path doesnt exist', () => {
    //     return mdLinks('/no/existe/path.md').catch((error) => {
    //         expect(error).toBe('La ruta no existe');
    //     });
    // });
    // it("test_path_exists_and_is_absolute", () => {
    //     const pathUser = "/Users/username/Documents";
    //     const result = validatePath(pathUser);
    //     expect(result).toEqual(pathUser);
    // });
    //     it.only("test_obtain_links_returns_array_of_objects_with_href_text_and_file_properties_when_given_valid_input", () => {
    //     const input = "This is a [link](https://www.google.com) to Google.";
    //     const file = "example.md";
    //     const expectedOutput = [{ href: "https://www.google.com", text: "link", file: "example.md" }];
    //     expect(obtainLinks(input, file)).toEqual(expectedOutput);
    // });
});
