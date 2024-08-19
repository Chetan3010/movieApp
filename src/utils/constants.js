import { getMyRegion, getMyTimezone } from "./helper";
const base_url = "https://api.themoviedb.org/3"

export const apiEndpoints = {
    movie: {
        movieGenre: { url: `${base_url}/genre/movie/list`, options: {}, dataPath: 'data.genres' },
        popularMovie: ({ page = 1, region }) => ({ url: `${base_url}/movie/popular?language=en-US&region=${region}&page=${page}`, options: {}, dataPath: 'data.results' }),
        nowPlaying: ({ page = 1, region }) => ({ url: `${base_url}/movie/now_playing?language=en-US&page=${page}&region=${region}`, options: {}, dataPath: 'data.results' })
    },
    tv: {
        tvGenre: { url: `${base_url}/genre/tv/list`, options: {}, dataPath: 'data.genres' },
        popularTv: ({ page = 1 }) => ({ url: `${base_url}/tv/popular?language=en-US&page=${page}`, options: {}, dataPath: 'data.results' }),
        airingToday: ({ page = 1, timezone }) => ({ url: `${base_url}/tv/airing_today?language=en-US&page=${page}&timezone=${timezone}`, options: {}, dataPath: 'data.results' })
    },
    trending: {
        TrendingAll: ({ type, time_window, page = 1 }) => ({ url: `${base_url}/trending/${type}/${time_window}?language=en-US&page=${page}`, options: {}, dataPath: 'data.results' }),
    },
    search: {
        multi: ({ query, page = 1 }) => ({ url: `${base_url}/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, options: {}, dataPath: 'data.results', returnNew: true })
    },
    others: {
        // proxyServer: "http://localhost:3000",
        // proxyServer: "https://proxy-server-three-chi.vercel.app",
        proxyServer: "https://proxyserver-u5de.onrender.com"
    },
};

export const defaultConst = {
    // imgPlaceholder: `https://placehold.co/500x750/6b7280/374151?text=no+poster&font=source-sans-pro`
    imgPlaceholder: `/DefaultImage.png`,
    endOfScrollPhrases: [
        "You’ve reached the end. Time to take a break!",
        "That's all folks! You've seen everything. Impressive, huh?",
        "End of the line! You've officially scrolled through it all.",
        "No more content here. Time to stretch those scrolling fingers!",
        "You've reached the bottom! The internet thanks you for your dedication.",
        "All done! You've scrolled to infinity and beyond.",
        "You've scrolled to the end. Give that finger a high-five!",
        "That’s all, folks! The bottom has been reached, and the scroll is victorious!",
        "You’ve hit the limit! Even infinity has its boundaries.",
        "Congrats, you found the end! Time to celebrate with a snack.",
        "End of the road! You’re now a scrolling champion.",
        "No more content here. You’ve officially scrolled into the void.",
        "Who knew there was an end? You just discovered it!",
        "You’ve scrolled through it all! Time to switch to a new hobby?",
        "Well, that’s it! You’ve reached the bottom. Achievement unlocked!",
    ]
}