import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userStore/userSlice";
import adminSlice from "../features/login/store/adminSlice";
import { ICurrentAdmin } from "../features/login/loginInterface";
import { UserState } from "../features/users/userInterface";

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
