import { userAction } from "./userSlice";
import { TypeDispatch } from "../../../store";
import { IUserInfo } from "../userInterface";

export const getUsersListAction = () => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch("http://localhost:8000/usersdata");
		const resData: IUserInfo[] = await response.json();
		dispatch(userAction.addUserList(resData));
	};
};

export const addNewUserAction = (userInfo: IUserInfo) => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch("http://localhost:8000/usersdata", {
			method: "POST",
			headers: {
				"Content-Type": "text/number",
			},
			body: JSON.stringify(userInfo),
		});
		const resData = await response.json();
		dispatch(userAction.addNewUser(resData));
	};
};

export const updateUserAction = (userInfo: IUserInfo, id: string) => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch(`http://localhost:8000/usersdata/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userInfo),
		});
		const resData = await response.json();
		dispatch(userAction.updateUser(resData));
	};
};

export const deleteUser = (id: string | null) => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch(`http://localhost:8000/usersdata/${id}`, {
			method: "DELETE",
		});
		const resData = await response.json();
		dispatch(userAction.deleteUser(resData));
	};
};
