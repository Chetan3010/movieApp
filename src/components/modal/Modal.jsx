import React, { Fragment, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, closeModal }) => {
    const modalRef = useRef(null);

    if (typeof window === "undefined") {
        return null;
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };
        
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Fragment>
            {createPortal(
                isOpen && (
                    <div
                        className={`fixed inset-0 z-[1000] bg-black bg-opacity-75 backdrop-blur-[2px] backdrop-saturate-50 flex justify-center overflow-y-auto py-[10vh] px-4 items-center`}
                    >
                        <div
                            ref={modalRef}
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
