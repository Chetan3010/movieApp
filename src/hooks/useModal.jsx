import React, { useState } from 'react'

const useModal = () => {
    const [isModalVisible, SetIsModalVisible] = useState(false);

    const openModal = () => {
        document.body.style.overflow = "hidden";
        SetIsModalVisible(true);
    };

    const closeModal = () => {
        document.body.style.overflow = "auto";
        SetIsModalVisible(false)        
    };
    
    return { isModalVisible, openModal, closeModal };

}

export default useModal