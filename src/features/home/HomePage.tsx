import React from "react";
import { useSelector } from "react-redux";
import { IRootState } from "../../shared/commonInterface";

const HomePage: React.FC = () => {
	const adminDetail = useSelector((state: IRootState) => state.admin);
	return (
		<div className="w-screen h-90vh flex flex-col justify-center items-center">
			<h2 className="text-4xl font-bold text-blue-950 mb-6">
				WelCome <span className="text-blue-800 text-3xl font-bold">{adminDetail ? adminDetail.username : ""}</span>
			</h2>
			<h2 className="text-3xl font-bold text-blue-950 mb-6"> Your E-mail Is: </h2>
			<span className="text-3xl font-bold text-blue-800 ">{adminDetail ? adminDetail.email : ""}</span>
		</div>
	);
};

export default HomePage;
