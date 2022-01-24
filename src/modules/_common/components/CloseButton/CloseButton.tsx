import { classNames } from "utils/classNames";
import { Close } from "../Icons";

type TProps = {
  onClick: () => void;
};

export function CloseButton({ onClick }: TProps) {
  return (
    <button
      onClick={onClick}
      className={classNames("text-gray-300 hover:text-black")}
    >
      <Close />
    </button>
  );
}
