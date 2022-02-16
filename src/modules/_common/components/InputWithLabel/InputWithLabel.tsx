import { HTMLInputTypeAttribute } from "react";

type TInputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  autoComplete: any;
};

export function InputWithLabel({
  id,
  name,
  placeholder,
  type,
  autoComplete,
}: TInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        className="peer w-full h-10 text-lg font-bold placeholder:text-transparent text-black bg-transparent border-b-2 border-gray-400 focus:border-gray-400 focus:outline-none"
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <label
        htmlFor={id}
        className="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm text-gray-600 peer-focus:text-gray-600 peer-placeholder-shown:border-gray-400 transition-all cursor-text peer-focus:cursor-default"
      >
        {placeholder}
      </label>
    </div>
  );
}
