export interface ILogin {
	email: string;
	password: string;
}

export interface IForgotPass extends ILogin {
	confirmPassword: string;
}

export interface ICurrentAdmin extends ILogin {
	id: string;
	username: string;
}

export interface ILoginError {
	username?: string;
	email?: string;
	password?: string;
	existing?: string;
	authentication?: string;
	confirmPassword?: string;
	valid?: string;
}
