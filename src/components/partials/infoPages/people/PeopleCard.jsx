import React, { forwardRef } from "react";
import { defaultConst } from "../../../../utils/constants";
import { Link } from "react-router-dom";

const PeopleCard = forwardRef(
    (
        { id, name, original_name, known_for_department, profile_path, character },
        ref
    ) => {
        return (
            <Link to={`/person/${id}-${name.split(" ").join("_")}`} className="rounded-xl overflow-hidden relative" ref={ref}>
                <div className="relative">
                    <img
                        className="object-cover w-full h-auto rounded-xl bg-zinc-600"
                        src={
                            profile_path
                                ? `https://image.tmdb.org/t/p/w500/${profile_path}`
                                : defaultConst.imgPlaceholder
                        }
                        width={500}
                        height={750}
                        alt={name || original_name}
                    />
                </div>
                <div className="pt-3">
                    {(name || original_name) && (
                        <h3 className="text-[16px] md:text-xl font-semibold">
                            {name || original_name}
                        </h3>
                    )}
                    {known_for_department && (
                        <h4 className="text-lg text-zinc-400">
                            {known_for_department}
                        </h4>
                    )}
                </div>
            </Link>
        );
    }
);

export default PeopleCard;
