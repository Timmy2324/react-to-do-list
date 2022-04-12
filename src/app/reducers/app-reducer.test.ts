import {appReducer, InitialAppStateType, setAppError, setAppStatus} from "./app-reducer";

let startState: InitialAppStateType;

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
    };
})

test('correct error message should be set', () => {
   const endState = appReducer(startState, setAppError('Some error'));

   expect(endState.error).toBe('Some error');
});

test('correct status should be set', () => {
    const endState = appReducer(startState, setAppStatus('loading'));

    expect(endState.status).toBe('loading');
});