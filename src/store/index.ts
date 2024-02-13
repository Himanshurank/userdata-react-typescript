import { configureStore } from "@reduxjs/toolkit";
import userSlice, { UserState } from "../features/users/userStore/userSlice";
import adminSlice, { ICurrentAdmin } from "../features/login/store/adminSlice";

const store = configureStore({
	reducer: {
		users: userSlice,
		admin: adminSlice,
	},
});

export interface RootState {
	users: UserState;
	admin: ICurrentAdmin;
}

export default store;

export type TypeDispatch = typeof store.dispatch;
