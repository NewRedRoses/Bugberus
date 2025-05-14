import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";

// Inspo: https://headlessui.com/react/dialog

export default function Modal({
  openBtnTitle = "Open",
  modalTitle = "Title",
  modalTitleClasses,
  isModalOpen,
  setIsModalOpen,
  children = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, consectetur? ",
}) {
  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={openBtnClasses}>
        {openBtnTitle}
      </button>
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        {/* For shadow backdrop  */}
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-xl space-y-4 rounded bg-slate-100 p-12">
            <div className="flex justify-end pb-2">
              <button
                id="close-modal-btn"
                className="rounded bg-slate-300 px-2 font-bold text-slate-800 hover:cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>

            <DialogTitle className={`font-bold ${modalTitleClasses}`}>
              {modalTitle}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
