import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState, IUserInfo } from "../userInterface";

const initialState: IUserState = { userList: [] };

const userSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addUserList: (state: IUserState, action: PayloadAction<IUserInfo[]>) => {
			state.userList = action.payload;
		},
		addNewUser: (state: IUserState, action: PayloadAction<IUserInfo>) => {
			state.userList.push(action.payload);
		},
		updateUser: (state, action: PayloadAction<IUserInfo>) => {
			const existingUserIndex = state.userList.findIndex((user) => user.id === action.payload.id);
			state.userList[existingUserIndex] = action.payload;
		},
		deleteUser: (state: IUserState, action: PayloadAction<IUserInfo>) => {
			const removedUser: IUserInfo[] = state.userList.filter((user: IUserInfo) => user.id !== action.payload.id);
			state.userList = removedUser;
		},
	},
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
