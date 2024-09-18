import React from "react";
import Topnav from "../partials/topnav/Topnav";
import ScrollRestorationCustom from "../partials/global/ScrollRestorationCustom";
import { motion } from "framer-motion";

const About = () => {
    const reactPkgList = [
        {
            title: "Vite",
            description: "As the build tool for a fast development experience.",
        },
        {
            title: "React",
            description:
                "For building a dynamic user interface with reusable components.",
        },
        {
            title: "TMDB API",
            description: "To fetch the latest data about movie and TV show.",
        },
        {
            title: "React Router",
            description: "For seamless navigation across various pages.",
        },
        {
            title: "Custom Hooks",
            description:
                "To encapsulate reusable logic like API calls and local storage management.",
        },
    ];

    const extPkgList = [
        {
            title: "Axios",
            description: "For making HTTP requests to the TMDb API.",
        },
        {
            title: "Framer Motion",
            description: "For adding smooth animations and transitions.",
        },
        {
            title: "React Hot Toast",
            description: "For displaying non-intrusive toast notifications.",
        },
        {
            title: "Lenis",
            description: "For smooth scrolling experiences.",
        },
        {
            title: "Tailwind CSS",
            description: "For fast and responsive UI styling.",
        },
    ];
    return (
        <>
            <ScrollRestorationCustom />
            <section className={`main`}>
                <Topnav />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="g-[#0F0617] text-white p-5"
                >
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#c147e9]">
                                About ShowMeShows
                            </h1>
                            <p className="mt-3 text-base md:text-lg text-neutral-400">
                                Your ultimate platform to discover movies and TV
                                shows!
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#c147e9] mb-4">
                                🎬 What's this project about?
                            </h2>
                            <p className="text-gray-300">
                                ShowMeShows - A progressive web app ( PWA ) to
                                help users browse and discover trending movies,
                                TV shows, and much more. We leverage The Movie
                                Database (TMDb) API to provide the latest and
                                most accurate information about your favorite
                                titles.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#c147e9] mb-4">
                                🛠️ How it was made?
                            </h2>
                            <p className="text-gray-300 mb-4">
                                This project was built using modern web
                                development technologies. Below is a brief
                                overview of what has gone into its creation:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                {reactPkgList.map((item, index) => (
                                    <li
                                        key={index}
                                        className="text-neutral-300"
                                    >
                                        <span className="font-semibold text-neutral-200">
                                            {item.title}
                                        </span>{" "}
                                        - {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#c147e9] mb-4">
                                📦 Libraries and Packages Used
                            </h2>
                            <ul className="list-disc pl-5 space-y-2">
                                {extPkgList.map((item, index) => (
                                    <li
                                        key={index}
                                        className="text-neutral-300"
                                    >
                                        <span className="font-semibold text-neutral-200">
                                            {item.title}
                                        </span>{" "}
                                        - {item.description}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#c147e9] mb-4">
                                👨‍💻 Development Process
                            </h2>
                            <p className="text-gray-300">
                                The development of ShowMeShows focuses on
                                delivering a responsive, user-friendly
                                experience with a focus on smooth user
                                interactions. The project follows best practices
                                for state management and API integrations.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#c147e9] mb-4">
                                🎨 Design Inspiration
                            </h2>
                            <p className="text-gray-300">
                                The design and user interface of ShowMeShows
                                draw inspiration from Google's clean and
                                intuitive design. We aimed to create a familiar
                                and user-friendly experience by incorporating
                                elements such as:
                            </p>
                            <ul className="list-disc list-inside text-gray-300 mt-2">
                                <li>
                                    A minimalist color scheme for improved
                                    readability
                                </li>
                                <li>
                                    Card-based layout for presenting information
                                </li>
                                <li>
                                    Responsive design that works well on various
                                    devices
                                </li>
                                <li>
                                    Intuitive navigation and search
                                    functionality
                                </li>
                            </ul>
                            <p className="text-gray-300 mt-2">
                                While inspired by Google's approach, we've
                                tailored the design to fit the specific needs of
                                a movie and TV show database, ensuring that the
                                focus remains on the content and user
                                experience.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-[#c147e9] mb-4">
                                🔗 Project Link
                            </h2>
                            <p className="text-gray-300">
                                You can view the project live at:{" "}
                                <a
                                    href="https://showmeshows.vercel.app/"
                                    className="text-[#c147e9] hover:underline"
                                >
                                    ShowMeShows
                                </a>
                                .
                            </p>
                        </div>

                        <footer className="text-center text-gray-400">
                            <p>Created with ❤️ by Chetan</p>
                            <a
                                href="https://github.com/Chetan3010/movieApp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-[#c147e9] hover:text-[#d17bee] mt-2"
                            >
                                View on GitHub
                            </a>
                        </footer>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default About;
