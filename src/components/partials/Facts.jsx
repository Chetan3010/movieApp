import React from "react";
import { Link } from "react-router-dom";

const Facts = ({ facts }) => {
    return (
        <fieldset className="border-2 border-[#C147E9] rounded-2xl m-4 p-4 text-neutral-300">
            <legend className="text-2xl font-semibold md:font-bold px-4 text-neutral-200">
                Facts
            </legend>
            <div className="grid grid-flow-row sm:grid-flow-col grid-cols-2 gap-6 md:gap-20 p-4">
                {facts?.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-lg md:text-xl font-light">
                            {item.title}
                        </span>
                        {item.link ? (
                            <Link to={item.link}>
                                <span className="text-lg md:text-xl underline underline-offset-4 decoration-dotted font-semibold hover:text-[#c147e9] transition-all duration-200 ease-in">
                                    {item.value}
                                </span>
                            </Link>
                        ) : (
                            <span className="text-lg md:text-xl font-semibold">
                                {item.value}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default Facts;
