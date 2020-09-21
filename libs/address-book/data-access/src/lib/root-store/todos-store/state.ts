import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { UserTodos } from '@leng2/address-book/utilities';

export const userTodosAdapter: EntityAdapter<UserTodos> = createEntityAdapter<UserTodos>({
    selectId: userTodos => userTodos.userid,
});

export interface State extends EntityState<UserTodos> {
    isLoading?: boolean;
    error?: string;
}

export const initialState: State = userTodosAdapter.getInitialState(
    {
        isLoading: false,
        error: null
    }
);