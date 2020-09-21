import { Actions, ActionTypes } from './actions';
import { userTodosAdapter, initialState, State } from './state';

export function userTodosReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.READ_DATA: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.READ_SUCCESS: {
            return userTodosAdapter.addAll(action.payload.items, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.REQUEST_FAILURE: {
            return {
                ...state,
                isLoading: false,
                error: action.payload.error
            };
        }
        case ActionTypes.UPDATE_TODOS: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.UPDATE_SUCCESS: {
            return userTodosAdapter.setOne(action.payload.item, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.ADD_USER: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.ADD_SUCCESS: {
            return userTodosAdapter.addOne(action.payload.item, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        default: {
            return state;
        }
    }
}