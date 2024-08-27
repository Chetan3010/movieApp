import React, { useEffect } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";

const ReviewCard = ({
    author,
    author_details,
    content,
    created_at,
    updated_at,
}) => {
    const { name, username, avatar_path } = author_details;
    return (
        <div>
            <div className="flex gap-3 items-center w-full">
                <img
                    src={
                        avatar_path
                            ? `https://image.tmdb.org/t/p/original${avatar_path}`
                            : `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${Math.random().toString(36).substring(2, 15)}`
                    }
                    className="w-10 h-10 rounded-full object-center"
                    alt="userAvatar"
                />
                <div className="flex flex-col justify-start">
                    <span className="text-xl font-semibold">
                        {username || name || author}
                    </span>
                    <span className="text-sm text-neutral-400">
                        {new Date(created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        })}{" "}
                        {updated_at && `(edited)`}
                    </span>
                </div>
            </div>
            <div className="mt-2 md:mt-5 font-light text-neutral-300 whitespace-pre-wrap">
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default ReviewCard;
