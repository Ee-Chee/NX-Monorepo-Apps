import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserAddress } from '@leng2/address-book/utilities';

export const userAddressesAdapter: EntityAdapter<UserAddress> = createEntityAdapter<UserAddress>({
    selectId: userAddress => userAddress.id,
    sortComparer: (a: UserAddress, b: UserAddress): number => a.firstname.localeCompare(b.firstname)
});

export interface State extends EntityState<UserAddress> {
    isLoading?: boolean;
    error?: string;
}

export const initialState: State = userAddressesAdapter.getInitialState(
    {
        isLoading: false,
        error: null // todo type
    }
);
