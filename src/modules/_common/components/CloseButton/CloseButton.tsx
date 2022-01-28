import { classNames } from "utils/classNames";
import { Close } from "../Icons";

type TProps = {
  onClick: () => void;
  ariaLabel: string;
};

export function CloseButton({ onClick, ariaLabel }: TProps) {
  return (
    <button
      onClick={onClick}
      className={classNames("text-gray-300 hover:text-black")}
      aria-label={ariaLabel}
    >
      <Close />
    </button>
  );
}
