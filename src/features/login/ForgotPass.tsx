import React, { useEffect, useState } from "react";
import Input from "../../shared/Components/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputField } from "../users/UserForm";
import { getAdminEmail } from "../signup/SignUpPage";
import { updateAdminUser } from "./store/adminAction";
import { Error, ICurrentAdmin, IForgotPass } from "./loginInterface";

const ForgotPass: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const adminId = localStorage.getItem("adminId");
	const inputInitialState = { email: "", password: "", confirmpassword: "" };

	const [adminInfo, setAdminInfo] = useState<IForgotPass>(inputInitialState);
	const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
	const [error, setError] = useState<Error>({});

	useEffect(() => {
		if (adminId) {
			navigate(`/home`);
		}
	}, [navigate, adminId]);

	const getInputsDetail = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const { name, value } = e.target;
		setAdminInfo((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		/*eslint-disable*/
		const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (adminInfo.email === "" || !adminInfo.email.match(emailPattern)) {
			setError({ email: "Enter Valid Email" });
			return;
		}

		const validAdmin: ICurrentAdmin[] = await getAdminEmail(adminInfo.email);
		console.log(validAdmin);
		if (isEmailValid === false) {
			if (validAdmin.length > 0) {
				setIsEmailValid(true);
			} else {
				setError({ valid: "User Not Registered" });
				return;
			}
		}
		if (isEmailValid === true) {
			if (adminInfo.password === "") {
				setError({ password: "Enter Valid Password" });
				return;
			}
			if (adminInfo.password !== adminInfo.confirmpassword) {
				setError({ confirmPassword: "Password Not Match" });
				return;
			}

			validAdmin[0].password = adminInfo.password;
			dispatch(updateAdminUser(validAdmin[0], validAdmin[0].id));
			setAdminInfo(inputInitialState);
			navigate("/login");
		}
		setError({});
	};

	const onReset = (): void => {
		setIsEmailValid(false);
		setAdminInfo(inputInitialState);
		setError({});
	};

	const onLogin = (): void => {
		navigate("/login");
	};

	const forgotEmailProperties: InputField[] = [{ name: "email", placeHolder: "Enter Email", value: adminInfo.email, type: "text", onchange: getInputsDetail, error: error.email ? error.email : "" }];

	const forgotPasswordProperties: InputField[] = [
		{ name: "password", placeHolder: "Enter Password", value: adminInfo.password, type: "password", onchange: getInputsDetail, error: error.password ? error.password : "" },
		{ name: "confirmpassword", placeHolder: "Re-Enter Password", value: adminInfo.confirmpassword, type: "password", onchange: getInputsDetail, error: error.confirmPassword ? error.confirmPassword : "" },
	];

	return (
		<div className="w-screen h-screen bgimage flex justify-center items-center">
			<form onSubmit={(e) => formSubmit(e)} className="w-1/3 h-1/2 bg-blue-300 bg-opacity-50 backdrop-filter backdrop-blur-sm flex flex-col justify-between items-center rounded-md">
				<h2 className="mt-6 text-3xl font-bold text-blue-950">Forgot Password</h2>
				<div className="flex flex-col justify-center items-center w-2/3 ">
					{forgotEmailProperties.map((input: InputField) => {
						return <Input key={input.name} error={input.error} value={input.value} placeHolder={input.placeHolder} name={input.name} type={input.type} onchange={(e: any) => input.onchange(e)} />;
					})}
					{isEmailValid &&
						forgotPasswordProperties.map((input: InputField) => {
							return <Input key={input.name} error={input.error} value={input.value} placeHolder={input.placeHolder} name={input.name} type={input.type} onchange={(e: any) => input.onchange(e)} />;
						})}

					{error.valid && <p>{error.valid}</p>}
				</div>
				<div className="mb-6 w-2/3 text-center">
					<div className="mb-6  flex justify-between items-center ">
						<button onClick={onReset} className="px-6 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900" type="button">
							Reset
						</button>
						<button className="px-4 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900" type="submit">
							{isEmailValid ? "Change Password" : "Check Email"}
						</button>
					</div>
					<button onClick={onLogin} className=" w-full px-6 py-1 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900" type="button">
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default ForgotPass;
