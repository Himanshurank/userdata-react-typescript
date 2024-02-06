import { user, userAction } from "./userSlice";
import { TypeDispatch } from "../../../store";

export const getUsersList: any = () => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch("http://localhost:8000/usersdata");
		const resData: user[] = await response.json();
		dispatch(userAction.addUserList(resData));
	};
};

export const deleteUser: any = (id: number) => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch(`http://localhost:8000/usersdata1/${id}`, {
			method: "DELETE",
		});
		const resData = await response.json();
		dispatch(userAction.deleteUser(resData));
	};
};
