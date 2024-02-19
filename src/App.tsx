import React from "react";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./shared/RootLayout";
import LoginPage from "./features/login/LoginPage";
import HomePage from "./features/home/HomePage";
import SignUpPage from "./features/signup/SignUpPage";
import UsersTable from "./features/users/UsersTable";
import UserEditPage from "./features/users/UserEditPage";
import UserForm from "./features/users/UserForm";
import ForgotPass from "./features/login/ForgotPass";

const App: React.FC = () => {
	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path="/" element={<RootLayout />}>
				<Route path="*" element={<Navigate to="/login" />} />,
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/forgot" element={<ForgotPass />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/users" element={<UsersTable />} />
				<Route path="/users/new" element={<UserForm />} />
				<Route path="/users/edit/:updateId" element={<UserEditPage />} />
			</Route>,
		])
	);
	return <RouterProvider router={router} />;
};

export default App;
