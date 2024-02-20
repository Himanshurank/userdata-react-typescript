export interface ISignUpInfo {
	username?: string;
	email: string;
	password: string;
}

export interface ISignUpError {
	username?: string;
	email?: string;
	password?: string;
	authentication?: string;
}
