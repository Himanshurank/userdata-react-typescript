import React from "react";
import Input from "../../shared/Components/Input";

type InputField = {
	placeHolder: string;
	name: string;
	type: string;
};

const UserForm: React.FC = () => {
	const inputFieldProperties: InputField[] = [
		{ placeHolder: "Enter Your Name", name: "name", type: "text" },
		{ placeHolder: "Enter Your Age", name: "age", type: "number" },
		{ placeHolder: "Enter Your E-mail", name: "email", type: "text" },
		{ placeHolder: "Enter Your Phone", name: "phone", type: "number" },
	];
	return (
		<div>
			<form>
				<div>
					<h3>User Form</h3>
				</div>
				<div>
					{inputFieldProperties.map((input: InputField) => {
						return <Input key={input.name} placeHolder={input.placeHolder} name={input.name} type={input.type} />;
					})}
				</div>
			</form>
		</div>
	);
};

export default UserForm;
