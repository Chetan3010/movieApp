import React, { useState } from "react";
import Loader from "../../svg/Loader";
import { MdFileDownload } from "react-icons/md";
import { saveAs } from "file-saver";
import { getFileName } from "../../../utils/helper";

const Download = ({ title, file_path }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    /**
     * The `downloadFile` function downloads a file from a given file path and sets a downloading state
     * in a React component.
     */
    const downloadFile = (title, file_path) => {
        setIsDownloading(true);
        saveAs(
            `https:image.tmdb.org/t/p/original${file_path}`,
            getFileName({
                title,
                file: file_path,
            })
        );
        setTimeout(() => {
            setIsDownloading(false);
        }, 2000);
    };

    return (
        <button
            onClick={() => downloadFile(title, file_path)}
            className="w-8 h-8 bg-neutral-300 rounded-md text-black text-lg flex justify-center items-center absolute right-5 bottom-5"
        >
            {isDownloading ? <Loader /> : <MdFileDownload />}
        </button>
    );
};

export default Download;
