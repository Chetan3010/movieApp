export const base_url = "https://api.themoviedb.org/3"

const baseImgOriginal = 'https://image.tmdb.org/t/p/original/'
const baseImgW500 = 'https://image.tmdb.org/t/p/w500/'

export const apiEndpoints = {
    movie: {
        movieGenre: { url: `${base_url}/genre/movie/list`, dataPath: 'data.genres' },
        popular: ({ page = 1, region }) => ({ url: `${base_url}/movie/popular?language=en-US&region=${region}&page=${page}` }),
        nowPlaying: ({ page = 1, region }) => ({ url: `${base_url}/movie/now_playing?language=en-US&page=${page}&region=${region}` }),
        upcoming: ({ page = 1, region }) => ({ url: `${base_url}/movie/upcoming?language=en-US&region=${region}&page=${page}` }),
        topRated: ({ page = 1, region }) => ({ url: `${base_url}/movie/top_rated?language=en-US&page=${page}&region=${region}` }),
        details: ({ id }) => ({ url: `${base_url}/movie/${id}?language=en-US&append_to_response=images,videos,credits,external_ids&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        reviews: ({ id, page = 1 }) => ({ url: `${base_url}/movie/${id}/reviews?language=en-US&page=${page}` }),
        recommendations: ({ id, page = 1 }) => ({ url: `${base_url}/movie/${id}/recommendations?language=en-US&page=${page}` }),
    },
    tv: {
        tvGenre: { url: `${base_url}/genre/tv/list`, dataPath: 'data.genres' },
        popular: ({ page = 1 }) => ({ url: `${base_url}/tv/popular?language=en-US&page=${page}`, }),
        airingToday: ({ page = 1, timezone }) => ({ url: `${base_url}/tv/airing_today?language=en-US&page=${page}&timezone=${timezone}`, }),
        onTheAir: ({ page = 1, timezone }) => ({ url: `${base_url}/tv/on_the_air?language=en-US&timezone=${timezone}&page=${page}`, }),
        topRated: ({ page = 1 }) => ({ url: `${base_url}/tv/top_rated?language=en-US&page=${page}`, }),
        details: ({ id }) => ({ url: `${base_url}/tv/${id}?language=en-US&append_to_response=images,videos,credits,external_ids,content_ratings&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        season: ({ id, sid }) => ({ url: `${base_url}/tv/${id}/season/${sid}?language=en-US&append_to_response=images,videos,credits&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        episode: ({ id, sid, eid }) => ({ url: `${base_url}/tv/${id}/season/${sid}/episode/${eid}?language=en-US&append_to_response=images,videos,credits&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        aggregateCredits: ({ id, sid }) => ({ url: `${base_url}/tv/${id}/season/${sid}/aggregate_credits?language=en-US`, dataPath: 'data.cast', returnRaw: true }),
        reviews: ({ id, page = 1 }) => ({ url: `${base_url}/tv/${id}/reviews?language=en-US&page=${page}` }),
        recommendations: ({ id, page = 1 }) => ({ url: `${base_url}/tv/${id}/recommendations?language=en-US&page=${page}` }),
    },
    watchProvider: {
        regions: { url: `${base_url}/watch/providers/regions?language=en-US` },
        tvWatchProvider: ({ region }) => ({ url: `${base_url}/watch/providers/tv?language=en-US&watch_region=${region}`, returnRaw: true }),
        movieWatchProvider: ({ region }) => ({ url: `${base_url}/watch/providers/movie?language=en-US&watch_region=${region}`, returnRaw: true }),
        watchProviderMovies: ({ region, page, pid, sortBy = "popularity.desc" }) =>
            ({ url: `${base_url}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${pid}`, dataPath: 'data.results' }),
        watchProviderTv: ({ region, page, pid, sortBy = "popularity.desc" }) =>
            ({ url: `${base_url}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${pid}`, dataPath: 'data.results' }),


    },
    trending: {
        trending: ({ type, time_window }) => ({ url: `${base_url}/trending/${type}/${time_window}?language=en-US`, }),
    },
    people: {
        pupular: ({ page = 1 }) => ({ url: `${base_url}/person/popular?language=en-US&page=${page}`, })
    },
    search: {
        multi: ({ query, page = 1 }) => ({ url: `${base_url}/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, returnRaw: true })
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
    wideImgPlaceholder: '/DefaultImageWide.png',
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