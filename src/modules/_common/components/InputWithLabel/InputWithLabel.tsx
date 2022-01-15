import { HTMLInputTypeAttribute } from "react";

type TInputProps = {
  id: string;
  name: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
};

export function InputWithLabel({ id, name, placeholder, type }: TInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        className="peer w-full h-10 text-lg font-bold text-primary placeholder:text-transparent bg-transparent border-b-2 border-element-secondary focus:border-element-primary focus:outline-none"
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className="absolute -top-3.5 peer-placeholder-shown:top-2 peer-focus:-top-3.5 left-0 text-sm peer-placeholder-shown:text-base peer-focus:text-sm text-gray-600 peer-placeholder-shown:text-accent peer-focus:text-gray-600 transition-all cursor-text peer-focus:cursor-default"
      >
        {placeholder}
      </label>
    </div>
  );
}
