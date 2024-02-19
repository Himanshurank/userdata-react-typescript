export interface ILogin {
	email: string;
	password: string;
}

export interface IForgotPass {
	email: string;
	password: string;
	confirmpassword: string;
}

export interface ICurrentAdmin {
	username: string;
	email: string;
	id: string;
	password: string;
}

export interface LoginInfo {
	email: string;
	password: string;
}

export interface Error {
	username?: string;
	email?: string;
	password?: string;
	authentication?: string;
	existing?: string;
	confirmPassword?: string;
	valid?: string;
}
