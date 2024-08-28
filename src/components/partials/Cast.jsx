import React from "react";
import { defaultConst } from "../../utils/constants";

const Cast = ({ cast }) => {

    return (
        <>
            {cast?.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                    <img
                        className="object-top object-cover rounded-xl w-44 h-56 bg-zinc-600"
                        src={
                            item.profile_path
                                ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                : defaultConst.imgPlaceholder
                        }
                        alt=""
                    />
                    <h3 className="text-lg mt-2 text-center">{item.character}</h3>
                    <h3 className="text-lg text-center font-light text-gray-300">
                        {item.name || item.original_name}
                    </h3>
                </div>
            ))}
        </>
    );
};

export default Cast;
