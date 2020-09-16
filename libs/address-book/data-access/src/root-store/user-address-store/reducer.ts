import { Actions, ActionTypes } from './actions';
import { userAddressesAdapter, initialState, State } from './state';

export function userAddressesReducer(state = initialState, action: Actions): State {
    switch (action.type) {
        case ActionTypes.READ_DATA: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.READ_SUCCESS: {
            return userAddressesAdapter.addAll(action.payload.items, {
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
        case ActionTypes.UPDATE_INFO: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.UPDATE_SUCCESS: {
            return userAddressesAdapter.setOne(action.payload.item, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.DELETE_USER: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.DELETE_SUCCESS: {
            return userAddressesAdapter.removeOne(action.payload.id, {
                ...state,
                isLoading: false,
                error: null
            });
        }
        case ActionTypes.CREATE_USER: {
            return {
                ...state,
                isLoading: true,
                error: null
            };
        }
        case ActionTypes.CREATE_SUCCESS: {
            return userAddressesAdapter.addOne(action.payload.item, {
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