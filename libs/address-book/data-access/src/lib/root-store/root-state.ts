import { UserAddressStoreState } from './user-address-store';
import { UserTodosStoreState } from './todos-store';

export interface RootState {
    addressBook: UserAddressStoreState.State;
    todos: UserTodosStoreState.State;
}

