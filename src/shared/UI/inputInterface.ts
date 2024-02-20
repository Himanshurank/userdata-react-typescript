export interface InputField {
	placeHolder: string;
	error: string;
	name: string;
	type: string;
	value: string | undefined;
	onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
