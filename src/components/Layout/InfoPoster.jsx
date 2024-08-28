import React, { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaShareAlt, FaStarHalfAlt } from "react-icons/fa";
import { FaInstagram, FaLink, FaRegHeart, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { IoIosMenu } from "react-icons/io";
import { MdWatchLater } from "react-icons/md";
import { defaultConst } from "../../utils/constants";

const InfoPoster = ({ poster_path, homepage, external_ids = {}, title }) => {
    const { instagram_id, twitter_id } = external_ids;
    const shareData = {
        title,
        text: title,
        url: window.location.href, // This will use the current page's URL
    };

    const share = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                text: title,
                url: window.location.href,
            });
            // .then(() => console.log("Successful share"))
            // .catch((error) => console.log("Error sharing", error));
        } else {
            console
                .log
                // "Share not supported on this browser, do it the old way."
                ();
        }
    };

    return (
        <div className="flex flex-col gap-5 w-72">
            <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                        : defaultConst.imgPlaceholder
                }
                width={500}
                height={750}
                className="object-cover object-center bg-zinc-600 h-auto rounded-xl"
            />
            <div className="flex flex-col gap-3">
                <button className="white-black w-b flex w-full text-lg font-medium py-2 rounded-lg justify-center items-center gap-3">
                    <FaYoutube className="text-2xl" /> Watch Trailer
                </button>
                <button className="white-black w-b flex w-full text-lg font-medium py-2 rounded-lg justify-center items-center gap-3">
                    <IoIosMenu className="text-2xl" /> Add to list
                </button>
                <div className="flex gap-2 justify-between w-full">
                    <button className="white-black w-b w-1/3 py-3 rounded-lg flex justify-center items-center">
                        <MdWatchLater className="text-xl" />
                    </button>
                    <button className="white-black w-b w-1/3 py-3 rounded-lg flex justify-center items-center">
                        <FaRegHeart className="text-xl" />
                    </button>
                    <button className="white-black w-b w-1/3 py-3 rounded-lg flex justify-center items-center">
                        <FaStarHalfAlt className="text-xl" />
                    </button>
                </div>
                <div className="flex justify-around items-center px-2 pt-4">
                    {instagram_id && (
                        <a
                            href={`https://www.instagram.com/${instagram_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#c147e9] transition-all duration-100 ease-in"
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
                            className="hover:text-[#c147e9] transition-all duration-100 ease-in"
                        >
                            <i className="text-2xl cursor-pointer">
                                <FaXTwitter />
                            </i>
                        </a>
                    )}
                    { homepage && <a
                        href={homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#c147e9] transition-all duration-100 ease-in"
                    >
                        <i className="text-2xl cursor-pointer">
                            <FaLink />
                        </i>
                    </a>}
                    <button onClick={share} className="hover:text-[#c147e9] transition-all duration-100 ease-in text-2xl cursor-pointer">
                        <FaShareAlt />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InfoPoster;
