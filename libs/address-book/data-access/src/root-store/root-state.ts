import { UserAddressStoreState } from './user-address-store';

export interface RootState {
    addressBook: UserAddressStoreState.State;
}

