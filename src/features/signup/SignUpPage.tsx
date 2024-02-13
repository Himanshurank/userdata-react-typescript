import React, { useEffect, useState } from "react";
import { InputField } from "../users/UserForm";
import Input from "../../shared/Components/Input";
import { Link, useNavigate } from "react-router-dom";
import { Error } from "../login/LoginPage";
import { AdminInfo, ICurrentAdmin } from "../login/store/adminSlice";
import { useDispatch } from "react-redux";
import { postAdminUser } from "../login/store/adminAction";

const SignUpPage: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const adminId: string | null = localStorage.getItem("adminId");

	const signUpInitialState: AdminInfo = { email: "", password: "", username: "" };
	const [adminInfo, setAdminInfo] = useState<AdminInfo>(signUpInitialState);
	const [error, setError] = useState<Error>({});

	useEffect(() => {
		if (adminId) {
			navigate(`/home`);
		}
	}, [navigate, adminId]);

	const getSignUpInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAdminInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const signUpInputProperties = [
		{ placeHolder: "Enter Your Username", error: error.username ? error.username : "", value: adminInfo.username, name: "username", type: "text", onchange: getSignUpInputValue },
		{ placeHolder: "Enter Your Email", error: error.email ? error.email : "", value: adminInfo.email, name: "email", type: "email", onchange: getSignUpInputValue },
		{ placeHolder: "Enter Your Password", error: error.password ? error.password : "", value: adminInfo.password, name: "password", type: "password", onchange: getSignUpInputValue },
	];

	const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		/* eslint-disable */
		const emailPattern: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const errorObj: Error = {};

		if (adminInfo.email === "" || !adminInfo.email.match(emailPattern)) {
			errorObj.email = "Enter Valid Email";
		}
		if (adminInfo.password === "") {
			errorObj.password = "Enter Valid Password";
		}
		if (adminInfo.username === "") {
			errorObj.username = "Enter Valid Username";
		}
		if (Object.keys(error).length > 0) {
			setError(error);
			return;
		}

		const existingAdmin: ICurrentAdmin[] = await getAdminEmail(adminInfo.email);

		if (existingAdmin.length > 0) {
			setError({ authentication: "User Already Registered" });
			setAdminInfo({ email: "", password: "" });
			return;
		} else {
			dispatch(postAdminUser(adminInfo));
		}
		setAdminInfo(signUpInitialState);
		setError({});
		navigate("/login");
	};

	return (
		<div className="w-screen h-screen bgimage flex justify-center items-center">
			<form onSubmit={formSubmit} className="w-1/3 h-1/2 bg-blue-300 bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-col justify-between items-center rounded-md">
				<h2 className="mt-6 text-3xl font-bold text-blue-950">Register </h2>
				<div className="flex flex-col justify-center items-center w-2/3 ">
					{signUpInputProperties.map((input: InputField) => {
						return <Input key={input.name} error={input.error} value={input.value} placeHolder={input.placeHolder} name={input.name} type={input.type} onchange={(e) => input.onchange(e)} />;
					})}
					<Link className="mt-1 text-violet-800 font-semibold hover:text-violet-900 text-sm" to={"/forgot"}>
						Forgot Password
					</Link>
				</div>
				<p className="text-red-600 w-2/3 font-bold text-center">{error.authentication ? error.authentication : ""}</p>
				<div className="mb-6 w-2/3 flex justify-between ">
					<Link to={"/login"} className="px-6 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
						Login
					</Link>
					<button type="submit" className="px-6 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
						Sign Up
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignUpPage;

export const getAdminEmail = async (email: string): Promise<ICurrentAdmin[]> => {
	const response = await fetch(`http://localhost:8000/loginUsers?email=${email}`);
	const resData = await response.json();
	return resData;
};
