import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deleteUser, getUsersList } from "./userStore/userAction";
import { Link } from "react-router-dom";
import { user } from "./userStore/userSlice";
import { RootState } from "../../store";

const UsersTable: React.FC = () => {
	const dispatch = useDispatch();

	const [isDelete, setIsDelete] = useState<boolean>(false);
	const [deleteId, setDeleteId] = useState<number>();

	const userList = useSelector((state: RootState) => state.users.userList);

	useEffect(() => {
		if (userList.length === 0) {
			dispatch(getUsersList());
		}
	}, [dispatch, userList]);

	const onDelete = (id: number) => {
		setIsDelete(true);
		setDeleteId(id);
	};

	const onCancel = () => {
		setIsDelete(false);
	};

	const delUser = (): void => {
		dispatch(deleteUser(deleteId));
	};

	const renderData = userList.map((user: user, index: number) => {
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
				<div className="bg-blue-400 bg-opacity-50 rounded-md w-1/2 flex flex-col justify-center items-center absolute top-1/2 left-1/4 backdrop-filter backdrop-blur-2px">
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
			)}
		</div>
	);
};

export default UsersTable;
