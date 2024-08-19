import React, { useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const SelectionTab = ({ lsKey, options, selectedOption, onSelect }) => {
    const [value, setValue] = useLocalStorage({ key: lsKey, defaultValue:selectedOption });

    useEffect(()=> {
        if(value) onSelect(value);
    },[])

    useEffect(()=>{
        setValue(selectedOption)
    }, [selectedOption])

    const length = options.length;
    return (
        <>
            <div className="border-2 select-none p-1 border-[#C147E9] rounded-xl w-[90%] md:w-fit">
                <ul className="flex justify-between gap-1 relative w-full text-[#c147e9]">
                    {options.map((item, index) => (
                        <li
                            key={item.name}
                            onClick={() => onSelect(item.value)}
                            style={{ width: `${Math.floor(100 / length)}%` }}
                            className={`relative z-10 text-lg md:text-2xl truncate font-semibold cursor-pointer rounded-xl py-1 md:py-2 md:px-[8vw] flex justify-center items-center ${
                                selectedOption === item.value
                                    ? "text-[#0F0617]"
                                    : ""
                            }`}
                        >
                            {item.name}
                        </li>
                    ))}
                    <li
                        style={{
                            width: `${Math.floor(100 / length)}%`,
                            transform: `translateX(${
                                options.findIndex(
                                    (item) => item.value === selectedOption
                                ) * 100
                            }%)`,
                        }}
                        className={`absolute top-0 left-0 h-full transform transition-transform duration-300 ease-[cubic-bezier(0.25, 1, 0.5, 1)] bg-[#C147E9] rounded-lg`}
                    ></li>
                </ul>
            </div>
        </>
    );
};

export default SelectionTab;
