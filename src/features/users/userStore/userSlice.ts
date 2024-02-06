import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface user {
	id: number;
	name: string;
	email: string;
	phone: number;
	age: number;
}

export interface UserState {
	userList: user[] | never[];
}

const initialState: UserState = { userList: [] };

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUserList: (state: UserState, action: PayloadAction<user[]>) => {
			state.userList = action.payload;
		},
		deleteUser: (state: UserState, action: PayloadAction<user>) => {
			const removedUser: user[] = state.userList.filter((user: any) => user.id !== action.payload);
			state.userList = removedUser;
		},
	},
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
