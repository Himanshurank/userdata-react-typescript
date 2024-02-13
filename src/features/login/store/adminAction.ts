import { TypeDispatch } from "../../../store";
import { AdminInfo, adminAction } from "./adminSlice";

export const postAdminUser: any = (adminInfo: AdminInfo) => {
	return async () => {
		await fetch("http://localhost:8000/loginUsers", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(adminInfo),
		});
	};
};

export const updateAdminUser: any = (adminInfo: AdminInfo, id: string) => {
	return async () => {
		await fetch(`http://localhost:8000/loginUsers/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(adminInfo),
		});
	};
};

export const getAdminUser: any = (id: string) => {
	return async (dispatch: TypeDispatch) => {
		const response = await fetch(`http://localhost:8000/loginUsers/${id}`);
		const resData = await response.json();
		if (resData) {
			dispatch(adminAction.addCurrentAdmin(resData));
		}
	};
};
