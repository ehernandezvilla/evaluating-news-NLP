import { handleSubmit } from './formHandler';

// Mocking dependencies
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
    })
);

global.alert = jest.fn();

// Mock the document object
global.document = { getElementById: jest.fn() };

describe('handleSubmit', () => {
    let mockElement;

    beforeEach(() => {
        mockElement = { value: '' };
        global.document.getElementById.mockReturnValue(mockElement);
    });

    it('should alert when input is empty', () => {
        const event = {
            preventDefault: jest.fn(),
        };
        mockElement.value = ' ';
        handleSubmit(event);
        expect(alert).toHaveBeenCalledWith('The input field cannot be blank.');
    });

});
