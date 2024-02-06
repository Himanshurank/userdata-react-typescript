import React from "react";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "./RootLayout";
import LoginPage from "./features/login/LoginPage";
import HomePage from "./features/home/HomePage";
import SignUpPage from "./features/signup/SignUpPage";
import UsersTable from "./features/users/UsersTable";
import UserEditPage from "./features/users/UserEditPage";
import UserForm from "./features/users/UserForm";

const App: React.FC = () => {
	const router = createBrowserRouter(
		createRoutesFromElements([
			<Route path="/" element={<RootLayout />}>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/users" element={<UsersTable />} />
				<Route path="/users/new" element={<UserForm />} />
				<Route path="/users/edit/:id" element={<UserEditPage />} />
			</Route>,
		])
	);
	return <RouterProvider router={router} />;
};

export default App;
