import React from "react";
import { IoMdShare } from "react-icons/io";
import ShareModal from "../../modal/modals/ShareModal";
import useModal from "../../../hooks/useModal";

const Share = ({ info }) => {
    const { openModal, isModalVisible, closeModal } = useModal();

    const shareHandler = (e) => {
        e.preventDefault();

        if (navigator.share) {
            navigator
                .share({
                    title: info.title || info.name,
                    text: info.overview,
                    url: window.location.href,
                })
                .catch(() => openModal());
        } else {
            openModal();
        }
    };
    return (
        <>
            <button
                onClick={shareHandler}
                className="hover:text-[#c147e9] px-2 transition-all duration-100 ease-in text-2xl cursor-pointer"
            >
                <IoMdShare />
            </button>
            <ShareModal
                title={info.title || info.name}
                isModalOpen={isModalVisible}
                closeModal={closeModal}
            />
        </>
    );
};

export default Share;
