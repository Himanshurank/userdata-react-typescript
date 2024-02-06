import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "../features/users/userStore/userSlice";

const store = configureStore({
	reducer: {
		users: userSlice,
	},
});

export interface RootState {
	users: UserState;
}

export default store;

export type TypeDispatch = typeof store.dispatch;
