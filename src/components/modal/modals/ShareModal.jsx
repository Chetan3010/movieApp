import React from "react";
import { copyToClipboard } from "../../../utils/helper";
import { IoCopy } from "react-icons/io5";
import toast from "react-hot-toast";
import Modal from "../Modal";

const ShareModal = ({ title, url, isModalOpen, closeModal }) => {    
    
    const copyButtonHandler = () => {
        copyToClipboard({ nodeId: "copyUrl", text: url })
            .then(() => {
                closeModal();
                toast.success("Copied to clipboard!");
            })
            .catch(() => {                
                closeModal();
                toast.error("Copying to clipboard is not supported.");
            });
    };

    return (
        <Modal closeModal={closeModal} isOpen={isModalOpen}>
            <div className="w-full flex flex-col gap-2">
                <h1 className="uppercase text-neutral-200">Url</h1>
                <div className="flex gap-1">
                    <input
                        type="text"
                        name="URL"
                        defaultValue={
                            typeof window !== "undefined"
                                ? window.location.href
                                : ""
                        }
                        id="copyUrl"
                        readOnly
                        className="w-full rounded text-base bg-transparent text-neutral-300 text-light flex items-center text-nowrap overflow-hidden p-2 border border-neutral-500"
                    />
                    <button
                        onClick={copyButtonHandler}
                        className="border border-neutral-500 bg-neutral-200 rounded p-2"
                    >
                        <IoCopy className="text-2xl text-neutral-800" />
                    </button>
                </div>
                <button onClick={closeModal} className="p-2 select-none border text-neutral-200 border-neutral-500 rounded w-full">
                    Close
                </button>   
            </div>
        </Modal>
    );
};

export default ShareModal;
