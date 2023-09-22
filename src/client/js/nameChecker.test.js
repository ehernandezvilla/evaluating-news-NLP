import { checkForName } from './nameChecker';

global.alert = jest.fn();

describe('checkForName', () => {
    it('should alert when name is in the list', () => {
        checkForName('Picard');
        expect(alert).toHaveBeenCalledWith('¡Great! We are processing your request!');
    });

    it('should not alert when name is not in the list', () => {
        alert.mockClear(); // Clear previous mock calls
        checkForName('RandomName');
        expect(alert).not.toHaveBeenCalled();
    });
});
