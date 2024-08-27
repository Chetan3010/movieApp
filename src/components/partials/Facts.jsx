import React from "react";

const Facts = ({ status, spoken_languages, budget, revenue }) => {
    const data = [
        {
            title: "Status",
            value: status ?? "-",
        },
        {
            title: "Language",
            value:
                (spoken_languages && spoken_languages[0]?.english_name) || "-",
        },
        {
            title: "Budget",
            value: budget ? `$${Intl.NumberFormat().format(budget)}` : "-",
        },
        {
            title: "Revenue",
            value: revenue ? `$${Intl.NumberFormat().format(revenue)}` : "-",
        },
    ];

    return (
        <fieldset className="border-2 border-[#C147E9] rounded-2xl m-4 p-4 text-neutral-300">
            <legend className="text-2xl font-semibold md:font-bold px-4 text-neutral-200">
                Facts
            </legend>
            <div className="grid grid-flow-row md:grid-flow-col grid-cols-2 gap-6 md:gap-20 p-4">
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-lg md:text-xl font-light">
                            {item.title}
                        </span>
                        <span className="text-lg md:text-xl font-semibold">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </fieldset>
    );
};

export default Facts;
