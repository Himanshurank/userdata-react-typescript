import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useDispatch } from "react-redux";
import { getAdminUser } from "../features/login/store/adminAction";
import { ICurrentAdmin } from "../features/login/loginInterface";

const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const adminDetail: ICurrentAdmin = useSelector((state: RootState) => state.admin);

	useEffect(() => {
		const adminId: string | null = localStorage.getItem("adminId");

		if (adminId && adminDetail.username === "") {
			dispatch(getAdminUser(adminId));
		}
	}, [adminDetail, dispatch]);

	const onLogout = (): void => {
		localStorage.removeItem("adminId");
		navigate("/login");
	};

	return (
		<div className="bg-blue-600 text-white  shadow-md drop-shadow-lg">
			<div className="flex items-center justify-between h-10vh mx-32">
				<h2 className="text-4xl font-bold hover:text-sky-950 cursor-pointer">
					<Link to={"/home"}>{adminDetail ? adminDetail.username : "Admin"}</Link>
				</h2>
				<ul className="flex space-x-24 text-xl font-bold">
					<li className="hover:text-blue-950">
						<NavLink to={"/home"}>Home</NavLink>
					</li>
					<li className="hover:text-blue-950">
						<NavLink to={"/users"}>Users</NavLink>
					</li>
					<li className="hover:text-blue-950">
						<button onClick={onLogout}>Logout</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
