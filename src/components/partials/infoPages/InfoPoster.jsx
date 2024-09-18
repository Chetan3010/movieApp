import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import {
    FaInstagram,
    FaLink,
    FaRegHeart,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { MdWatchLater } from "react-icons/md";
import { defaultConst } from "../../../utils/constants";
import Share from "../global/Share";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const InfoPoster = ({
    poster_path,
    homepage,
    external_ids = {},
    info,
    trailer,
}) => {
    const { instagram_id, twitter_id } = external_ids;

    const handleUnavailableButtons = () => {
        toast.error("This feature is not available yet!");
    };

    return (
        <div className="flex flex-col gap-5 w-72">
            <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : defaultConst.imgPlaceholder
                }
                width={500}
                height={750}
                className="object-cover object-center bg-zinc-600 h-auto rounded-xl"
            />
            <div className="flex flex-col gap-3">
                {trailer ? (
                    <motion.a
                    whileHover={{ backgroundColor: '#c147e9'}}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.youtube.com/watch?v=${trailer.key}`}
                        className="white-black flex w-full text-lg font-medium py-2 rounded-lg justify-center items-center gap-3"
                    >
                        <FaYoutube className="text-2xl" /> Watch Trailer
                    </motion.a>
                ) : (
                    <></>
                )}
                <motion.button
                whileHover={{ backgroundColor: '#c147e9'}}
                    onClick={handleUnavailableButtons}
                    className="white-black flex w-full text-lg font-medium py-2 rounded-lg justify-center items-center gap-3"
                >
                    <IoIosMenu className="text-2xl" /> Add to list
                </motion.button>
                <div className="flex gap-2 justify-between w-full">
                    <motion.button
                    whileHover={{ backgroundColor: '#c147e9'}}
                        onClick={handleUnavailableButtons}
                        className="white-black w-1/3 py-3 rounded-lg flex justify-center items-center"
                    >
                        <MdWatchLater className="text-xl" />
                    </motion.button>
                    <motion.button
                    whileHover={{ backgroundColor: '#c147e9'}}
                        onClick={handleUnavailableButtons}
                        className="white-black w-1/3 py-3 rounded-lg flex justify-center items-center"
                    >
                        <FaRegHeart className="text-xl" />
                    </motion.button>
                    <motion.button
                    whileHover={{ backgroundColor: '#c147e9'}}
                        onClick={handleUnavailableButtons}
                        className="white-black w-1/3 py-3 rounded-lg flex justify-center items-center"
                    >
                        <FaStarHalfAlt className="text-xl" />
                    </motion.button>
                </div>
                <div className="flex justify-around items-center px-2 pt-4">
                    {instagram_id && (
                        <a
                            href={`https://www.instagram.com/${instagram_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all duration-100 ease-in hover:text-[#c147e9]"
                        >
                            <i className="text-2xl cursor-pointer">
                                <FaInstagram />
                            </i>
                        </a>
                    )}
                    {twitter_id && (
                        <a
                            href={`https://twitter.com/${twitter_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all duration-100 ease-in hover:text-[#c147e9]"
                        >
                            <i className="text-2xl cursor-pointer">
                                <FaXTwitter />
                            </i>
                        </a>
                    )}
                    {homepage && (
                        <a
                            href={homepage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all duration-100 ease-in hover:text-[#c147e9]"
                        >
                            <i className="text-2xl cursor-pointer">
                                <FaLink />
                            </i>
                        </a>
                    )}
                    <Share info={info} />
                </div>
            </div>
        </div>
    );
};

export default InfoPoster;
