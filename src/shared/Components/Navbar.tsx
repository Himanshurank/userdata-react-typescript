import React from "react";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<div className="bg-blue-600 text-white">
			<div className="flex items-center justify-between h-10vh mx-32">
				<h2 className="text-4xl font-bold hover:text-sky-950 cursor-pointer">Admin</h2>
				<ul className="flex space-x-24 text-xl font-bold ">
					<li className="hover:text-blue-950">
						<NavLink to={"/home"}>Home</NavLink>
					</li>
					<li className="hover:text-blue-950">
						<NavLink to={"/users"}>Users</NavLink>
					</li>
					<li className="hover:text-blue-950">
						<button>Logout</button>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
