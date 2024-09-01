import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrump from "../../svg/Breadcrump";

const BreadcrumpLinks = ({ links }) => {
    return (
        <div className="flex gap-2 items-center">
            {links.map((item, index) => (
                <Fragment key={index}>
                    <h1 className="text-sm sm:text-base">
                        {item.link ? (
                            <Link
                                to={item.link}
                                className="cursor-pointer text-sky-600 hover:text-sky-500"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-neutral-400">
                                {item.label}
                            </span>
                        )}
                    </h1>
                    {index !== links.length - 1 && (
                        <Breadcrump classname={"w-3 h-3"} />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default BreadcrumpLinks;
