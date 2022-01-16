type TProps = {
  onClick: () => void;
};

export function LeftArrow({ onClick }: TProps) {
  return (
    <button onClick={onClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 17l-5-5m0 0l5-5m-5 5h12"
        />
      </svg>
    </button>
  );
}
