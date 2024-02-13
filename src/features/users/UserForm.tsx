import React, { useEffect, useState } from "react";
import Input from "../../shared/Components/Input";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { UserInfo } from "./userStore/userSlice";
import { useDispatch } from "react-redux";
import { addNewUserAction, getUsersListAction, updateUserAction } from "./userStore/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export interface InputField {
	placeHolder: string;
	error: string;
	name: string;
	type: string;
	value: string | undefined;
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface Error {
	name?: string;
	email?: string;
	age?: string;
	phone?: string;
}

const UserForm: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { updateId } = useParams();

	const userInitialState: UserInfo = { name: "", age: "", email: "", phone: "" };
	const [userInfo, setUserInfo] = useState<UserInfo>(userInitialState);
	const [error, setError] = useState<Error>({});

	const userList: UserInfo[] = useSelector((state: RootState) => state.users.userList);

	const currentUpdateUserIndex: number = userList.findIndex((user) => user.id === updateId);
	const existingUser: UserInfo | undefined = userList.find((user) => user.id === updateId);

	useEffect(() => {
		if (updateId && userList.length === 0) {
			dispatch(getUsersListAction());
		}
		if (existingUser) {
			setUserInfo(existingUser);
		}
	}, [updateId, userList, dispatch, existingUser]);

	const getInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setUserInfo((prev) => ({
			...prev,
			[name]: name === "age" || name === "phone" ? +value : value,
		}));
	};

	const formSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const error: Error = {};
		/*eslint-disable */
		const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (userInfo.name === "") {
			error.name = "Enter Valid Name";
		}
		if (userInfo.age === "" || userInfo.age < "1") {
			error.age = "Enter Valid Age";
		}
		if (userInfo.email === "" || !userInfo.email.match(emailPattern)) {
			error.email = "Enter Valid Email";
		}
		if (userInfo.phone === "" || userInfo.phone.length >= 11 || userInfo.phone.length <= 9) {
			error.phone = "Enter Valid Phone";
		}

		const alreadyAddedUser: UserInfo[] = userList.filter((user) => user.email == userInfo.email || user.phone == userInfo.phone);

		if (updateId) {
			alreadyAddedUser.map((validUser: UserInfo) => {
				if (validUser.id != updateId) {
					if (userInfo.email == validUser.email) {
						error.email = "E-mail Already Added";
					}
					if (userInfo.phone == validUser.phone) {
						error.phone = "Phone Already Added";
					}
				}
			});
			if (Object.keys(error).length > 0) {
				setError(error);
				return;
			}
			dispatch(updateUserAction(userInfo, updateId));
		} else {
			alreadyAddedUser.map((validUser: UserInfo) => {
				if (userInfo.email === validUser.email) {
					error.email = "E-mail Already Added";
				}
				if (userInfo.phone == validUser.phone) {
					error.phone = "Phone Already Added";
				}
			});
			if (Object.keys(error).length > 0) {
				setError(error);
				return;
			}
			dispatch(addNewUserAction(userInfo));
		}
		navigate("/users");
	};

	const onCancel = (): void => {
		navigate("/users");
	};

	const inputFieldProperties: InputField[] = [
		{ placeHolder: "Enter Your Name", error: error.name ? error.name : "", value: userInfo.name, name: "name", type: "text", onchange: (e) => getInputValue(e) },
		{ placeHolder: "Enter Your Age", error: error.age ? error.age : "", value: userInfo.age, name: "age", type: "number", onchange: (e) => getInputValue(e) },
		{ placeHolder: "Enter Your E-mail", error: error.email ? error.email : "", value: userInfo.email, name: "email", type: "text", onchange: (e) => getInputValue(e) },
		{ placeHolder: "Enter Your Phone", error: error.phone ? error.phone : "", value: userInfo.phone, name: "phone", type: "number", onchange: (e) => getInputValue(e) },
	];

	const goPreviousUser = (): void => {
		const count = currentUpdateUserIndex - 1;

		if (count >= 0) {
			navigate(`/users/edit/${userList[count].id}`);
			setUserInfo(userList[count]);
		}
	};

	const goNextUser = (): void => {
		const count = currentUpdateUserIndex + 1;

		if (count < userList.length) {
			navigate(`/users/edit/${userList[count].id}`);
			setUserInfo(userList[count]);
		}
	};

	return (
		<div className="w-screen h-90vh bg-blue-100 flex justify-center items-center">
			{existingUser && (
				<button className="py-6 px-1 mx-1 shadow-md drop-shadow-md rounded-l-md bg-blue-700 text-blue-900 hover:bg-blue-300 bg-opacity-50 disabled:hidden " type="button" onClick={goPreviousUser} disabled={currentUpdateUserIndex <= 0}>
					{<GrCaretPrevious />}
				</button>
			)}
			<form onSubmit={(e) => formSubmit(e)} className="w-1/3 h-3/4 bg-blue-200 flex flex-col justify-between items-center rounded-md shadow-md drop-shadow-md">
				<div className="mt-6">
					<h3 className="text-3xl font-bold text-blue-950">User Form</h3>
				</div>
				<div className="flex flex-col justify-between items-center w-9/12">
					{inputFieldProperties.map((input: InputField) => {
						return <Input key={input.name} error={input.error} value={input.value} placeHolder={input.placeHolder} name={input.name} type={input.type} onchange={(e) => input.onchange(e)} />;
					})}
				</div>
				<div className="mb-6 w-4/5 flex justify-between">
					<button type="button" onClick={onCancel} className="px-6 py-1 shadow-md drop-shadow-md bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
						Cancel
					</button>
					<button type="submit" className="px-6 py-1 shadow-md drop-shadow-md bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
						Save
					</button>
				</div>
			</form>
			{existingUser && (
				<button className="py-6 px-1 mx-1 shadow-md drop-shadow-md rounded-r-md bg-blue-700 text-blue-900 hover:bg-blue-300 bg-opacity-50 disabled:hidden" type="button" onClick={goNextUser} disabled={currentUpdateUserIndex >= userList.length - 1}>
					{<GrCaretNext />}
				</button>
			)}
		</div>
	);
};

export default UserForm;
