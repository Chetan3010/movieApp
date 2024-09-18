export const base_url_v3 = "https://api.themoviedb.org/3"

export const apiEndpoints = {
    user: {
        ip: `https://api.ipify.org?format=json`,
        location: ({ ip }) => `https://ipwho.is/${ip}?fields=country_code,timezone`,
    },
    movie: {
        movieGenre: { apiName: `movieGenreList`, url: `${base_url_v3}/genre/movie/list`, dataPath: 'data.genres' },
        popular: ({ page = 1, region }) => ({ apiName: `popularMovies`, url: `${base_url_v3}/movie/popular?language=en-US&region=${region}&page=${page}` }),
        nowPlaying: ({ page = 1, region }) => ({ apiName: `nowPlayingMovies`, url: `${base_url_v3}/movie/now_playing?language=en-US&page=${page}&region=${region}` }),
        upcoming: ({ page = 1, region }) => ({ apiName: `upcomingMovies`, url: `${base_url_v3}/movie/upcoming?language=en-US&region=${region}&page=${page}` }),
        topRated: ({ page = 1, region }) => ({ apiName: `topRatedMovies`, url: `${base_url_v3}/movie/top_rated?language=en-US&page=${page}&region=${region}` }),
        details: ({ id }) => ({ apiName: `movieDetails`, url: `${base_url_v3}/movie/${id}?language=en-US&append_to_response=images,videos,credits,external_ids&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        reviews: ({ id, page = 1 }) => ({ apiName: `movieReviews`, url: `${base_url_v3}/movie/${id}/reviews?language=en-US&page=${page}` }),
        recommendations: ({ id, page = 1 }) => ({ apiName: `movieRecommendations`, url: `${base_url_v3}/movie/${id}/recommendations?language=en-US&page=${page}` }),
        genreMovieList: ({ genreId, page = 1, sortBy = "popularity.desc" }) => ({ apiName: `moviesByGenres`, url: `${base_url_v3}/discover/movie?language=en-US&include_adult=false&page=${page}&with_genres=${genreId}&sort_by=${sortBy}` }),
    },
    tv: {
        tvGenre: { apiName: `tvGenreList`, url: `${base_url_v3}/genre/tv/list`, dataPath: 'data.genres' },
        popular: ({ page = 1 }) => ({ apiName: `popularTvShows`, url: `${base_url_v3}/tv/popular?language=en-US&page=${page}`, }),
        airingToday: ({ page = 1, timezone }) => ({ apiName: `airingTodaysTvShows`, url: `${base_url_v3}/tv/airing_today?language=en-US&page=${page}&timezone=${timezone}`, }),
        onTheAir: ({ page = 1, timezone }) => ({ apiName: `onTheAirTvShows`, url: `${base_url_v3}/tv/on_the_air?language=en-US&timezone=${timezone}&page=${page}`, }),
        topRated: ({ page = 1 }) => ({ apiName: `topRatedTvShows`, url: `${base_url_v3}/tv/top_rated?language=en-US&page=${page}`, }),
        details: ({ id }) => ({ apiName: `tvShowDetails`, url: `${base_url_v3}/tv/${id}?language=en-US&append_to_response=images,videos,credits,external_ids,content_ratings&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        season: ({ id, sid }) => ({ apiName: `tvShowSeasonDetails`, url: `${base_url_v3}/tv/${id}/season/${sid}?language=en-US&append_to_response=images,videos,credits&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        episode: ({ id, sid, eid }) => ({ apiName: `tvShowEpisodeDetails`, url: `${base_url_v3}/tv/${id}/season/${sid}/episode/${eid}?language=en-US&append_to_response=images,videos,credits&include_image_language=en,null`, dataPath: 'data', returnRaw: true }),
        aggregateCredits: ({ id, sid }) => ({ apiName: `tvShowAggregateCredits`, url: `${base_url_v3}/tv/${id}/season/${sid}/aggregate_credits?language=en-US`, dataPath: 'data.cast', returnRaw: true }),
        reviews: ({ id, page = 1 }) => ({ apiName: `tvShowReviews`, url: `${base_url_v3}/tv/${id}/reviews?language=en-US&page=${page}` }),
        recommendations: ({ id, page = 1 }) => ({ apiName: `tvShowRecommendations`, url: `${base_url_v3}/tv/${id}/recommendations?language=en-US&page=${page}` }),
        genreTvList: ({ genreId, page = 1, sortBy = "popularity.desc" }) => ({ apiName: `tvShowsByGenre`, url: `${base_url_v3}/discover/tv?language=en-US&include_adult=false&page=${page}&with_genres=${genreId}&sort_by=${sortBy}` }),
    },
    watchProvider: {
        regions: { apiName: `getAllRegions`, url: `${base_url_v3}/watch/providers/regions?language=en-US` },
        tvWatchProvider: ({ region }) => ({ apiName: `tvShowProviders`, url: `${base_url_v3}/watch/providers/tv?language=en-US&watch_region=${region}`, returnRaw: true }),
        movieWatchProvider: ({ region }) => ({ apiName: `movieProviders`, url: `${base_url_v3}/watch/providers/movie?language=en-US&watch_region=${region}`, returnRaw: true }),
        watchProviderMovies: ({ region, page, pid, sortBy = "popularity.desc" }) => ({ apiName: `moviesByProvider`, url: `${base_url_v3}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${pid}` }),
        watchProviderTv: ({ region, page, pid, sortBy = "popularity.desc" }) => ({ apiName: `tvShowsByProvider`, url: `${base_url_v3}/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${sortBy}&watch_region=${region}&with_watch_providers=${pid}` }),
    },
    collection: {
        collectionDetails: ({ id }) => ({ apiName: `collectionDetails`, url: `${base_url_v3}/collection/${id}?language=en-US`, dataPath: 'data', returnRaw: true }),
        collectionImages: ({ id }) => ({ apiName: `collectionImages`, url: `${base_url_v3}/collection/${id}/images`, dataPath: 'data', returnRaw: true }),
    },
    network: {
        networkInfo: ({ id }) => ({ apiName: `networkDetails`, url: `${base_url_v3}/network/${id}`, dataPath: 'data', returnRaw: true }),
        networkList: ({ id, sortBy = 'popularity.desc', page = 1 }) => ({ apiName: `tvShowsByNetwork`, url: `${base_url_v3}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sortBy}&with_networks=${id}` })
    },
    keyword: {
        keywordList: ({ id, page = 1 }) => ({ apiName: `moviesByKeyword`, url: `${base_url_v3}/keyword/${id}/movies?include_adult=false&language=en-US&page=${page}` })
    },
    trending: {
        trending: ({ type, time_window }) => ({ apiName: `dynamicTrending`, url: `${base_url_v3}/trending/${type}/${time_window}?language=en-US`, }),
        trailer: ({ media_type, id }) => `${base_url_v3}/${media_type}/${id}/videos?language=en-US`,
    },
    person: {
        popular: ({ page = 1 }) => ({ apiName: `popularPerson`, url: `${base_url_v3}/person/popular?language=en-US&page=${page}`, }),
        details: ({ id }) => ({ apiName: `personDetails`, url: `${base_url_v3}/person/${id}?language=en-US&append_to_response=combined_credits,external_ids,images`, dataPath: 'data', returnRaw: true })
    },
    search: {
        multi: ({ query, page = 1 }) => ({ apiName: `search=${query}`, url: `${base_url_v3}/search/multi?query=${query}&include_adult=false&language=en-US&page=${page}`, returnRaw: true }),
        movieSearch: ({ query, page = 1 }) => ({ apiName: `searchMovie=${query}`, url: `${base_url_v3}/search/movie?language=en-US&query=${query}&page=${page}&include_adult=false`, }),
        tvSearch: ({ query, page = 1 }) => ({ apiName: `searchTv=${query}`, url: `${base_url_v3}/search/tv?language=en-US&query=${query}&page=${page}&include_adult=false`, }),
        keywordSearch: ({ query, page = 1 }) => ({ apiName: `searchKeyword=${query}`, url: `${base_url_v3}/search/keyword?query=${query}&page=${page}`, }),
        personSearch: ({ query, page = 1 }) => ({ apiName: `searchPerson=${query}`, url: `${base_url_v3}/search/person?language=en-US&query=${query}&page=${page}&include_adult=false`, }),
        collectionSearch: ({ query, page = 1 }) => ({ apiName: `searchCollection=${query}`, url: `${base_url_v3}/search/collection?language=en-US&query=${query}&page=${page}&include_adult=false` })
    },
    others: {
        // proxyServer: "http://localhost:3002",
        proxyServer: "https://proxyserverapi.vercel.app",
    },
};

export const defaultConst = {
    imgPlaceholder: `/DefaultImage.png`,
    wideImgPlaceholder: '/DefaultImageWide.png',
    movieSortOptions: [
        {
            key: "Popularity Descending",
            value: "popularity.desc",
        },
        {
            key: "Popularity Ascending",
            value: "popularity.asc",
        },
        {
            key: "Release Date Descending",
            value: "primary_release_date.desc",
        },
        {
            key: "Release Date Ascending",
            value: "primary_release_date.asc",
        },
        {
            key: "Rating Descending",
            value: "vote_average.desc",
        },
        {
            key: "Rating Ascending",
            value: "vote_average.asc",
        },
        {
            key: "Revenue Descending",
            value: "revenue.desc",
        },
        {
            key: "Revenue Ascending",
            value: "revenue.asc",
        },
    ],
    tvSortOptions: [
        {
            key: "Popularity Descending",
            value: "popularity.desc",
        },
        {
            key: "Popularity Ascending",
            value: "popularity.asc",
        },
        {
            key: "Release Date Descending",
            value: "first_air_date.desc",
        },
        {
            key: "Release Date Ascending",
            value: "first_air_date.asc",
        },
        {
            key: "Rating Descending",
            value: "vote_average.desc",
        },
        {
            key: "Rating Ascending",
            value: "vote_average.asc",
        },
    ],
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
    ],
    badQueryPhrases: [
        "Oops! Looks like we came up empty-handed.",
        "Hmm... that search hit a dead end.",
        "No luck this time, try something different!",
        "We searched far and wide, but found nothing.",
        "Looks like our compass is off—no results found.",
        "The answer's out there, but not here.",
        "We missed the mark on this one!",
        "This search went on a wild goose chase!",
        "Nada. Zip. Zero results. Let’s try again!",
        "Lost in translation—no results to show."
    ],
    errors: {
        // 4xx: Client Errors
        400: "The request could not be understood by the server. Please try again.",
        401: "You need to log in to access this resource.",
        403: "You do not have permission to view this resource.",
        404: "What you're looking for doesn't exist.",
        405: "The method is not allowed for the requested URL.",
        408: "The server took too long to respond. Please try again later.",
        409: "There was a conflict with the request. Please try again.",
        410: "The resource you are looking for has been permanently removed.",
        413: "The request is too large to process.",
        414: "The URL is too long to process.",
        415: "The server does not support the format of the request.",
        429: "You have sent too many requests in a short time. Please try again later.",
        
        // 5xx: Server Errors
        500: "Something went wrong on our end. Please try again later.",
        501: "This feature is not supported yet.",
        502: "The server received an invalid response. Please try again later.",
        503: "The service is currently unavailable. Please try again later.",
        504: "The server took too long to respond. Please try again later.",
        505: "The HTTP version used in the request is not supported."
    }
}