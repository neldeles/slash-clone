type TProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
};

export function IconButton(props: TProps) {
  const { children, ...buttonProps } = props;
  return (
    <button
      className=" text-gray-300 hover:text-black align-middle"
      {...buttonProps}
    >
      {children}
    </button>
  );
}
