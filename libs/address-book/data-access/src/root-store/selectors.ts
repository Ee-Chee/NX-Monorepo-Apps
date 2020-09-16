import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserAddressStoreSelectors } from './user-address-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    UserAddressStoreSelectors.selectRequestError,
    (addressBookError: string) => {
        return addressBookError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    UserAddressStoreSelectors.selectRequetIsLoading,
    (loading: boolean) => {
        return loading;
    }
);