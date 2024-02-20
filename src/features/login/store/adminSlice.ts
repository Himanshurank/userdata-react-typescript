import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
		addCurrentAdmin: (state, action: PayloadAction<ICurrentAdmin>) => {
			return { ...action.payload };
		},
	},
});

export const { addCurrentAdmin } = adminSlice.actions;
export default adminSlice.reducer;
