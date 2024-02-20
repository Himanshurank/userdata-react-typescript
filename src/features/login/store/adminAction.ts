import { TypeDispatch } from "../../../store";
import { ILogin } from "../loginInterface";
import { addCurrentAdmin } from "./adminSlice";
// import { RootState } from "../../../shared/commonInterface";
// import { Action, ThunkAction } from "@reduxjs/toolkit";

// type AddCurrentAdminAction = ReturnType<typeof addCurrentAdmin>;
// type ThankType<R, S extends Action> = ThunkAction<void, RootState, R, S>;

export const postAdminUser = (adminInfo: ILogin) => {
	return async (): Promise<void> => {
		await fetch("http://localhost:8000/loginUsers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(adminInfo),
		});
	};
};

export const updateAdminUser = (adminInfo: ILogin, id: string) => {
	return async (): Promise<void> => {
		await fetch(`http://localhost:8000/loginUsers/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(adminInfo),
		});
	};
};

export const getAdminUser = (id: string) => {
	return async (dispatch: TypeDispatch): Promise<void> => {
		const response = await fetch(`http://localhost:8000/loginUsers/${id}`);
		const resData = await response.json();
		if (resData) {
			dispatch(addCurrentAdmin(resData));
		}
	};
};
