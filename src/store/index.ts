import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/users/userStore/userSlice";
import adminSlice from "../features/login/store/adminSlice";
const store = configureStore({
	reducer: {
		users: userSlice,
		admin: adminSlice,
	},
});

export default store;

export type TypeDispatch = typeof store.dispatch;
