import { ImSpinner2 } from "react-icons/im";

const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="text-4xl text-graay-500 p-4 rounded-lg flex items-center animate-spin">
            <ImSpinner2 />
          </div>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
