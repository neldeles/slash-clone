type TButtonProps = {
  onClick: () => void;
  label: string;
};

export function Button({ onClick, label }: TButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center py-3 px-6 text-base font-medium text-white bg-element-primary hover:bg-element-primary-hover rounded-md border border-transparent focus:outline-none focus:ring-2 focus:ring-element-primary focus:ring-offset-2 shadow-sm"
    >
      {label}
    </button>
  );
}
