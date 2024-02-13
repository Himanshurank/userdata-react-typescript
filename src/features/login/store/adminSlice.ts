import { createSlice } from "@reduxjs/toolkit";

export interface AdminInfo {
	username?: string;
	email: string;
	password: string;
}

export interface ICurrentAdmin {
	username: string;
	email: string;
	id: string;
	password: string;
}

const initialState: ICurrentAdmin = {
	username: "",
	email: "",
	id: "",
	password: "",
};

const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {
		addCurrentAdmin: (state, action) => {
			return { ...action.payload };
		},
	},
});

export const adminAction = adminSlice.actions;
export default adminSlice.reducer;
