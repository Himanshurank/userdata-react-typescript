export interface UserInfo {
	name: string;
	email: string;
	phone: string;
	age: string;
	id?: string;
}

export interface UserState {
	userList: UserInfo[];
}
