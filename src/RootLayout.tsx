import React, { useEffect } from "react";
import Navbar from "./shared/Components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout: React.FC = () => {
	const navigate = useNavigate();
	const adminId: string | null = localStorage.getItem("adminId");

	useEffect(() => {
		if (!adminId) {
			navigate("/login");
		} else {
			navigate("/home");
		}
	}, [adminId, navigate]);

	return (
		<>
			{adminId && <Navbar />}
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
