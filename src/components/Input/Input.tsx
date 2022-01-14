import { HTMLInputTypeAttribute } from "react";

type TInputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
};

export function Input({ id, name, placeholder, type }: TInputProps) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      className="peer w-full h-10 text-lg placeholder:text-base font-bold placeholder:font-normal placeholder:text-gray-300 text-black focus:placeholder:text-gray-400 bg-transparent border-b-2 border-gray-400 focus:outline-none"
      placeholder={placeholder}
    />
  );
}
