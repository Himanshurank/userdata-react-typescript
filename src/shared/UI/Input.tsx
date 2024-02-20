import React from "react";
import { InputField } from "./inputInterface";

const Input: React.FC<InputField> = (props: InputField) => {
	return (
		<>
			<label className="text-blue-950 font-bold mb-1 mt-3" htmlFor={props.name}>
				{props.placeHolder}
			</label>
			<input className="text-blue-950 mb-1 rounded-md w-full px-2 outline-none" value={props.value} name={props.name} id={props.name} type={props.type} placeholder={props.placeHolder} onChange={props.onchange} />
			<p className="text-red-600 w-2/3 text-xs font-bold ml-6">{props.error}</p>
		</>
	);
};

export default Input;
