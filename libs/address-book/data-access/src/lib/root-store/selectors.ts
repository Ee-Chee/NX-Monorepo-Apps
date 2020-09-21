import { createSelector, MemoizedSelector } from '@ngrx/store';
import { UserAddressStoreSelectors } from './user-address-store';
import { UserTodosStoreSelectors } from './todos-store';

export const selectError: MemoizedSelector<object, string> = createSelector(
    UserAddressStoreSelectors.selectRequestError,
    UserTodosStoreSelectors.selectRequestError,
    (addressBookError: string, todosError: string) => {
        return addressBookError || todosError;
    }
);

export const selectIsLoading: MemoizedSelector<object, boolean> = createSelector(
    UserAddressStoreSelectors.selectRequestIsLoading,
    UserTodosStoreSelectors.selectRequestIsLoading,
    (addressBookloading: boolean, todosLoading: boolean) => {
        return addressBookloading || todosLoading;
    }
);