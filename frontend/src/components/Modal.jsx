import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";

// Inspo: https://headlessui.com/react/dialog

export default function Modal({
  openBtnTitle = "Open",
  openBtnClasses = "px-1 rounded border",
  modalTitle = "Title",
  modalTitleClasses,
  children = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consectetur? ",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleOpenModal} className={openBtnClasses}>
        {openBtnTitle}
      </button>
      <Dialog
        open={isOpen}
        onClose={handleCloseModal}
        className="relative z-50"
      >
        {/* For shadow backdrop  */}
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl space-y-4 bg-slate-100 p-12 rounded">
            <div className="flex justify-end pb-2">
              <button
                id="close-modal-btn"
                className="px-2 rounded bg-slate-300 text-slate-800 font-bold hover:cursor-pointer"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>

            <DialogTitle className={`font-bold ${modalTitleClasses}`}>
              {modalTitle}
            </DialogTitle>
            {typeof children === "function"
              ? children({ closeModal: handleCloseModal })
              : children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
