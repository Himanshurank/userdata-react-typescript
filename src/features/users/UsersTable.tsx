import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, getUsersListAction } from "./userStore/userAction";
import { Link } from "react-router-dom";
import { RootState } from "../../store";
import { UserInfo } from "./userInterface";

const UsersTable: React.FC = () => {
	const dispatch = useDispatch();

	const [isDelete, setIsDelete] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<number>();

	const userList: UserInfo[] = useSelector((state: RootState) => state.users.userList);

	useEffect(() => {
		if (userList.length === 0) {
			dispatch(getUsersListAction());
		}
	}, [dispatch, userList]);

	const onDelete = (id: number): void => {
		setIsDelete(true);
		setDeleteId(id);
	};

	const onCancel = (): void => {
		setIsDelete(false);
	};

	const delUser = (): void => {
		dispatch(deleteUser(deleteId));
		setIsDelete(false);
	};

	const renderData: JSX.Element[] = userList.map((user: any, index: number) => {
		return (
			<tr key={user.id}>
				<td className="p-2 border-2 border-blue-800 text-blue-950 font-medium text-lg">{index + 1}</td>
				<td className="p-2 border-2 border-blue-800 text-blue-950 font-medium text-lg">{user.name}</td>
				<td className="p-2 border-2 border-blue-800 text-blue-950 font-medium text-lg">{user.age}</td>
				<td className="p-2 border-2 border-blue-800 text-blue-950 font-medium text-lg">{user.email}</td>
				<td className="p-2 border-2 border-blue-800 text-blue-950 font-medium text-lg">{user.phone}</td>
				<td className="p-2 border-2 border-blue-800 text-blue-950 font-medium text-lg space-x-2">
					<Link to={`/users/edit/${user.id}`}>
						<button className="bg-green-800 px-2 py-5px rounded-md text-green-200 text-base hover:bg-green-500 hover:text-green-900" type="button">
							Edit
						</button>
					</Link>
					<button className="bg-red-800 px-2 py-5px rounded-md text-red-200 text-base hover:bg-red-400 hover:text-red-900" type="button" onClick={() => onDelete(user.id)}>
						Delete
					</button>
				</td>
			</tr>
		);
	});

	return (
		<div>
			<div className="h-20vh w-screen flex justify-end items-center">
				<Link to="/users/new" className="mx-10 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900">
					Add User
				</Link>
			</div>

			<div className="p-5">
				<table className="bg-blue-200 w-full rounded-md text-center overflow-hidden">
					<thead className="bg-blue-600 text-white p-2">
						<tr>
							<th className="p-2 border-2 border-blue-800">ID</th>
							<th className="p-2 border-2 border-blue-800">Name</th>
							<th className="p-2 border-2 border-blue-800">Age</th>
							<th className="p-2 border-2 border-blue-800">E-mail</th>
							<th className="p-2 border-2 border-blue-800">Phone</th>
							<th className="p-2 border-2 border-blue-800">E/D</th>
						</tr>
					</thead>
					<tbody>{renderData}</tbody>
				</table>
			</div>
			{isDelete && (
				<div className=" w-screen h-screen absolute top-0 left-0  bg-black bg-opacity-20 rounded-md flex justify-center items-center ">
					<div className="bg-blue-400 bg-opacity-50 rounded-md w-1/2 flex flex-col justify-center items-center backdrop-filter backdrop-blur-2px shadow-md">
						<h2 className="font-bold text-blue-900 text-3xl my-6">Are Your Sure Delete This User?</h2>
						<div className="my-6 space-x-20">
							<button className=" px-6 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-900" type="button" onClick={onCancel}>
								Cancel
							</button>
							<button className="bg-red-800 font-bold px-6 py-2 rounded-md text-red-200 text-base hover:bg-red-400 hover:text-red-900" type="button" onClick={delUser}>
								Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UsersTable;
