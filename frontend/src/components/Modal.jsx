import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { X } from "lucide-react";

import Button from "./Button";

// Inspo: https://headlessui.com/react/dialog

export default function Modal({
  openBtnTitle,
  openBtnClasses,
  openBtnUiType,
  modalTitle,
  modalTitleClasses,
  isModalOpen,
  setIsModalOpen,
  children = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consectetur? ",
  modalCardClasses,
}) {
  return (
    <>
      {openBtnTitle && (
        <Button
          onClick={() => setIsModalOpen(true)}
          uiType={openBtnUiType}
          classNames={openBtnClasses}
        >
          {openBtnTitle}
        </Button>
      )}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        {/* For shadow backdrop  */}
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            className={`max-w-xl space-y-4 rounded bg-slate-100 p-10 ${modalCardClasses}`}
          >
            <div className="flex justify-end pb-2">
              <Button
                classNames="text-red-800 hover:text-red-600 "
                uiType="custom"
                onClick={() => setIsModalOpen(false)}
              >
                <X />
              </Button>
            </div>

            {modalTitle && (
              <div className="mt-5">
                <DialogTitle className={`font-bold ${modalTitleClasses}`}>
                  {modalTitle}
                </DialogTitle>
              </div>
            )}
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
