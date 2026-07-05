import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import "./loader.css";
export const Loader = ({ className }) => {
  return <div className={className}></div>;
};

export const LoaderMultipleCircle = () => {
  return (
    <div className="loaderCircleWrapper">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
    </div>
  );
};

export const DialogCircleLoader = () => {
  return (
    <Dialog open={true} onClose={() => {}} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <DialogBackdrop className="fixed inset-0 bg-black/70" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="max-w-[800px] w-[673px]  rounded-[10px] p-[10px] flex items-center flex-col justify-around min-h-[300px]">
          <LoaderMultipleCircle />
        </DialogPanel>
      </div>
    </Dialog>
  );
};
