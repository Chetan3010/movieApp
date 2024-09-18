import React from "react";
import { useRouteError } from "react-router-dom";
import Topnav from "../partials/topnav/Topnav";
import { defaultConst } from "../../utils/constants";
import { motion } from "framer-motion";

const Error = ({ status }) => {
    const error = useRouteError();

    return (
        <>
            <section className={`main`}>
                <Topnav />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-[70vh] flex justify-center items-center flex-col gap-10"
                >
                    <h1 className="text-9xl font-bold text-[#c147e9] textGlow ">
                        {error?.status ?? status ?? 404}
                    </h1>
                    <p className="text-xl md:text-3xl text-center text-neutral-400">
                        {defaultConst.errors[error?.status ?? status ?? 404]}
                    </p>
                </motion.div>
            </section>
        </>
    );
};

export default Error;
