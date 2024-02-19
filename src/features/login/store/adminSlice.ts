import { createSlice } from "@reduxjs/toolkit";
import { ICurrentAdmin } from "../loginInterface";

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
