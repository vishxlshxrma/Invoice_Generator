import { ImSpinner2 } from "react-icons/im";

const LoadingButton = ({
  isLoading,
  children,
  type = "button",
  className,
  onClick,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className: string;
  onClick?: () => void;
}) => {
  return (
    <>
      {isLoading ? (
        <div className={className}>
          <div className="flex item-center justify-center py-[2px]">
            <ImSpinner2 className="animate-spin text-lg" />
          </div>
        </div>
      ) : (
        <button type={type} className={className} onClick={onClick}>
          {children}
        </button>
      )}
    </>
  );
};

export default LoadingButton;
