import { ICurrentAdmin } from "../features/login/loginInterface";
import { IUserState } from "../features/users/userInterface";

export interface IRootState {
	users: IUserState;
	admin: ICurrentAdmin;
}
