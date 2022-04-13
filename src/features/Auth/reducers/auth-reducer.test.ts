import {InitialStateType, authReducer, setIsLoggedIn} from "./auth-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        isLoggedIn: false
    };
})

test('correct authorization', () => {
    const endState = authReducer(startState, setIsLoggedIn(true));

    expect(endState.isLoggedIn).toBe(true);
});