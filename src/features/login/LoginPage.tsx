import React, { useEffect, useState } from "react";
import { AdminInfo, ICurrentAdmin, adminAction } from "./store/adminSlice";
import { InputField } from "../users/UserForm";
import Input from "../../shared/Components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export interface Error {
	username?: string;
	email?: string;
	password?: string;
	authentication?: string;
	existing?: string;
	confirmPassword?: string;
	valid?: string;
}

interface ILogin {
	email: string;
	password: string;
}

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const adminInitialState: ILogin = { email: "", password: "" };
	const [adminInfo, setAdminInfo] = useState<ILogin>(adminInitialState);
	const [error, setError] = useState<Error>({});

	const adminId = localStorage.getItem("adminId");
	useEffect(() => {
		if (adminId) {
			navigate("/home");
		}
	}, [adminId, navigate]);

	const getLoginInputValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setAdminInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const errorObj: Error = {};
		/*eslint-disable */
		const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (adminInfo.password === "") {
			errorObj.password = "Enter Valid Password";
		}
		if (adminInfo.email === "" || !adminInfo.email.match(emailPattern)) {
			errorObj.email = "Enter Valid E-mail";
		}
		if (Object.keys(errorObj).length > 0) {
			setError(errorObj);
			return;
		}
		const currentAdmin: ICurrentAdmin[] = await getAdmin(adminInfo);

		if (currentAdmin.length !== 0) {
			localStorage.setItem("adminId", currentAdmin[0].id);
			dispatch(adminAction.addCurrentAdmin(currentAdmin[0]));
			navigate(`/home`);
		} else {
			setError({ authentication: "Invalid User" });
			return;
		}

		setError({});
	};

	const loginInputProperties: InputField[] = [
		{ placeHolder: "Enter Your Email", error: error.email ? error.email : "", value: adminInfo.email, name: "email", type: "email", onchange: getLoginInputValue },
		{ placeHolder: "Enter Your Password", error: error.password ? error.password : "", value: adminInfo.password, name: "password", type: "password", onchange: getLoginInputValue },
	];

	return (
		<>
			<div className="w-screen h-screen bgimage flex justify-center items-center">
				<form onSubmit={formSubmit} className="w-1/3 h-1/2 bg-blue-300 bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-col justify-between items-center rounded-md">
					<h2 className="mt-6 text-3xl font-bold text-blue-950">Login User</h2>
					<div className="flex flex-col justify-center items-center w-2/3 ">
						{loginInputProperties.map((input: InputField) => {
							return <Input key={input.name} error={input.error} value={input.value} placeHolder={input.placeHolder} name={input.name} type={input.type} onchange={(e) => input.onchange(e)} />;
						})}
						<Link className="mt-1 text-violet-800 font-semibold hover:text-violet-900 text-sm" to={"/forgot"}>
							Forgot Password
						</Link>
					</div>
					<p className="text-red-600 w-2/3 font-bold text-center">{error.authentication ? error.authentication : ""}</p>
					<div className="mb-6 w-2/3 flex justify-between ">
						<Link to={"/signup"} className="px-6 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
							Sign Up
						</Link>
						<button type="submit" className="px-6 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default LoginPage;

export const getAdmin = async (adminInfo: AdminInfo): Promise<ICurrentAdmin[]> => {
	const { email, password } = adminInfo;
	const response = await fetch(`http://localhost:8000/loginUsers?email=${email}&password=${password}`);
	const resData = await response.json();
	return resData;
};
