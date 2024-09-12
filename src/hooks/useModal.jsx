import React, { useEffect, useState } from 'react'

const useModal = () => {
    const [isModalVisible, setShowModal] = useState(false);

    const openModal = () => {
        document.body.style.overflow = "hidden";
        setShowModal(true);
    };

    const closeModal = () => {
        document.body.style.overflow = "auto";
        setShowModal(false)
    };
    useEffect(() => {
        console.log("Modal state:", isModalVisible);
    }, [isModalVisible]);
    
    return { isModalVisible, openModal, closeModal };

}

export default useModal