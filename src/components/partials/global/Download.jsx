import React, { useState } from "react";
import Loader from "../../svg/Loader";
import { MdFileDownload } from "react-icons/md";
import { saveAs } from "file-saver";
import { getFileName } from "../../../utils/helper";
import { apiEndpoints } from "../../../utils/constants";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Download = ({ title, file_path }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadFile = (title, file_path) => {
        setIsDownloading(true);
        fetch(`https://image.tmdb.org/t/p/original${file_path}`, {
            method: "GET",
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    const url = window.URL.createObjectURL(new Blob([buffer]));
                    const link = document.createElement("a");
                    const filename = getFileName({ title, file: file_path });
                    link.href = url;
                    link.setAttribute("download", filename);
                    document.body.appendChild(link);
                    link.click();

                    setTimeout(() => {
                        window.URL.revokeObjectURL(url);
                    }, 100);
                });
            })
            .catch((err) => {
                toast.error("Image file is not available!");
            });
        setTimeout(() => {
            setIsDownloading(false);
        }, 2000);
    };

    return (
        <motion.button
            whileHover={{ backgroundColor: '#c147e9'}}
            onClick={() => downloadFile(title, file_path)}
            className="w-8 h-8 bg-neutral-300 rounded-md text-black text-lg flex justify-center items-center absolute right-5 bottom-5"
        >
            {isDownloading ? <Loader /> : <MdFileDownload />}
        </motion.button>
    );
};

export default Download;
