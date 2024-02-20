export interface IUserInfo {
	name: string;
	email: string;
	phone: string;
	age: string;
	id: string;
}

export interface IUserState {
	userList: IUserInfo[];
}
export interface IUserError {
	name?: string;
	email?: string;
	age?: string;
	phone?: string;
}
