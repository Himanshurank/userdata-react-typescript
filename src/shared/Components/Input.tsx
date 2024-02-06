import React from "react";

export interface InputProps {
	placeHolder: string;
	name: string;
	type: string;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
	return (
		<>
			<label htmlFor={props.name}>{props.placeHolder}</label>
			<input name={props.name} id={props.name} type={props.type} />
		</>
	);
};

export default Input;
