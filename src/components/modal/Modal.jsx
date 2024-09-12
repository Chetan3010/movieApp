import React, { Fragment } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, closeModal }) => {
    const closeOnClickedOutside = (e) => {
        if (e.currentTarget === e.target) {
            closeModal();
        }
    };

    if (typeof window === "undefined") {
        return null;
    }

    return (
        <Fragment>
            {createPortal(
                isOpen && (
                    <div
                        className={`fixed inset-0 z-[1000] bg-black bg-opacity-75 backdrop-blur-[2px] backdrop-saturate-50 flex justify-center modal-outer overflow-y-auto py-[10vh] px-4 items-center`}
                        onClick={closeOnClickedOutside}
                    >
                        <div
                            className={`rounded-xl overflow-hideen max-sm:p-4 p-6 bg-[#121212] border border-neutral-700 w-full`}
                        >
                            {children}
                        </div>
                    </div>
                ),
                document.body
            )}
        </Fragment>
    );
};
export default Modal;
