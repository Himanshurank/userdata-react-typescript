import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserState, UserInfo } from "../userInterface";

const initialState: UserState = { userList: [] };

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUserList: (state: UserState, action: PayloadAction<UserInfo[]>) => {
			state.userList = action.payload;
		},
		addNewUser: (state: UserState, action: PayloadAction<UserInfo>) => {
			state.userList.push(action.payload);
		},
		updateUser: (state, action: PayloadAction<UserInfo>) => {
			const existingUserIndex = state.userList.findIndex((user) => user.id === action.payload.id);
			state.userList[existingUserIndex] = action.payload;
		},
		deleteUser: (state: UserState, action: PayloadAction<string>) => {
			const removedUser: UserInfo[] = state.userList.filter((user: UserInfo) => user.id !== action.payload);
			state.userList = removedUser;
		},
	},
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
