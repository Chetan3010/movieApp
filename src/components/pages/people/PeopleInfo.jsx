import React from "react";
import Loader from "../../partials/global/Loader";
import Topnav from "../../partials/topnav/Topnav";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";
import useFetch from "../../../hooks/useFetch";
import { apiEndpoints, defaultConst } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import { FaInstagram, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Share from "../../partials/global/Share";
import { getGender } from "../../../utils/helper";
import Download from "../../partials/global/Download";
import PeopleTab from "../../partials/infoPages/people/PeopleTab";
import { AnimatePresence, motion } from "framer-motion";
import Error from "../Error";

const PeopleInfo = () => {
    const param = useParams();
    const id = param.id.split("-")[0];

    const { data, isPending, error } = useFetch(apiEndpoints.person.details({ id }));

    const {
        name,
        also_known_as,
        biography,
        birthday,
        deathday,
        gender,
        homepage,
        known_for_department,
        place_of_birth,
        popularity,
        profile_path,
        combined_credits, // cast, crew
        external_ids,
        images, // profiles
    } = data;

    const { instagram_id, twitter_id } = external_ids ?? {};

    const getAge = (date, alive) => {
        if (alive) {
            const today = new Date();
            const age = Math.floor(
                (today - new Date(birthday)) / (1000 * 3600 * 24 * 30.4375 * 12)
            );

            return age;
        } else {
            const diedAt = Math.floor(
                (new Date(date) - new Date(details.birthday)) /
                    (1000 * 3600 * 24 * 30.4375 * 12)
            );

            return diedAt;
        }
    };

    const imageCount = images?.profiles?.length;

    const casting =
        combined_credits?.cast?.map((item) => ({
            ...item,
            department: item.department || "Acting",
            job: item.job || "Actor",
        })) || [];
    const crew = combined_credits?.crew || [];
    const combinedCredits = casting
        ?.concat(crew)
        ?.sort((a, z) => z.vote_count - a.vote_count);

    const movieCredits = combinedCredits.filter(
        (item) => item.media_type === "movie"
    );
    const tvCredits = combinedCredits.filter(
        (item) => item.media_type === "tv"
    );

    if(error){
        return <Error status={error.status} />
    }

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <AnimatePresence mode="wait">
                    {!isPending ? (
                        <motion.div 
                        key={'personInfo'}
                        initial={{opacity: 0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        className="w-full relative bg-[#0F0617] py-5">
                            <div className="mt-5 grid md:grid-flow-col gap-6 md:gap-14 place-items-center md:place-items-start md:justify-start px-4 md:px-14">
                                <div className="flex flex-col gap-5 w-72">
                                    <img
                                        src={
                                            profile_path
                                                ? `https://image.tmdb.org/t/p/w500${profile_path}`
                                                : defaultConst.imgPlaceholder
                                        }
                                        width={500}
                                        height={750}
                                        className="object-cover object-center bg-zinc-600 rounded-xl"
                                    />
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
                                        {homepage && (
                                            <a
                                                href={homepage}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:text-[#c147e9] transition-all duration-100 ease-in"
                                            >
                                                <i className="text-2xl cursor-pointer">
                                                    <FaLink />
                                                </i>
                                            </a>
                                        )}
                                        <Share />
                                    </div>
                                </div>
                                <div className="w-full">
                                    {/* Name */}
                                    <h1 className="w-full text-3xl md:text-4xl font-semibold md:font-bold">
                                        {name}
                                    </h1>

                                    {/* Sub Info */}
                                    <div className="crew w-full grid items-start grid-cols-2 md:grid-cols-3 py-4 gap-6 md:gap-14 text-lg md:text-xl text-neutral-200">
                                        <div className="flex flex-col justify-start">
                                            <span className="font-bold">
                                                Gender
                                            </span>
                                            <span className="font-light">
                                                {getGender(gender)}
                                            </span>
                                        </div>

                                        {!deathday && birthday && (
                                            <div className="flex flex-col justify-start">
                                                <span className="font-bold">
                                                    Age
                                                </span>
                                                <span className="font-light">
                                                    {getAge(birthday, true)}{" "}
                                                    years old
                                                </span>
                                            </div>
                                        )}

                                        {birthday && (
                                            <div className="flex flex-col justify-start">
                                                <span className="font-bold">
                                                    Birthday
                                                </span>
                                                <span className="font-light">
                                                    {new Date(
                                                        birthday
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {deathday && (
                                            <div className="flex flex-col justify-start">
                                                <span className="font-bold">
                                                    Death Day
                                                </span>
                                                <span className="font-light">
                                                    {new Date(
                                                        deathday
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                        )}

                                        {deathday && (
                                            <div className="flex flex-col justify-start">
                                                <span className="font-bold">
                                                    Died at
                                                </span>
                                                <span className="font-light">
                                                    {getAge(deathday, false)}{" "}
                                                    years old
                                                </span>
                                            </div>
                                        )}

                                        {place_of_birth && (
                                            <div className="flex flex-col justify-start">
                                                <span className="font-bold">
                                                    Place of Birth
                                                </span>
                                                <span className="font-light">
                                                    {place_of_birth}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex flex-col justify-start">
                                            <span className="font-bold">
                                                Known For
                                            </span>
                                            <span className="font-light">
                                                {known_for_department}
                                            </span>
                                        </div>

                                        <div className="flex flex-col justify-start">
                                            <span className="font-bold">
                                                Known Credits
                                            </span>
                                            <span className="font-light">
                                                {combinedCredits.length}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 px-4 md:px-14">
                                {/* Biography */}
                                {biography ? (
                                    <div>
                                        <h1 className="text-4xl font-semibold">
                                            Biography
                                        </h1>
                                        <p className="mt-5 text-neutral-300 font-light text-base whitespace-pre-line">
                                            {biography}
                                        </p>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                {/* Profiles */}
                                {images?.profiles.length > 0 ? (
                                    <div className="mt-10">
                                        <h1 className="text-4xl font-semibold">{`Photos (${imageCount})`}</h1>
                                        <div className="mt-5 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 overflow-x-scroll hideScrollbar">
                                            {images?.profiles.map(
                                                (item, index) => (
                                                    <div
                                                        key={index}
                                                        className="rounded-xl overflow-hidden relative shadow-md shadow-neutral-900"
                                                    >
                                                        <motion.img
                                                            whileHover={{scale: 1.05}}
                                                            width={500}
                                                            height={750}
                                                            className="object-cover w-full h-full object-center bg-zinc-600"
                                                            src={`https://image.tmdb.org/t/p/w500${item.file_path}`}
                                                            alt=""
                                                        />
                                                        {item.file_path && (
                                                            <Download
                                                                title={name}
                                                                file_path={
                                                                    item.file_path
                                                                }
                                                            />
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            {/* Credits */}
                            {movieCredits.length > 0 || tvCredits.length > 0 ? (
                                <div className="mt-10">
                                    <PeopleTab
                                        movieCredits={movieCredits}
                                        tvCredits={tvCredits}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div 
                        key={'loader'}
                        initial={{opacity: 0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        className="w-full h-[80vh] flex justify-center items-center">
                            <Loader classname={"w-16 h-16"} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </>
    );
};
export default PeopleInfo;
