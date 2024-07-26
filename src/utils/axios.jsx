import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Accept: "application/json",
        Authorization: 
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjVhOTVhOGY5MzJiYzk1MWFlY2U5ODliYmI4MmVkNCIsIm5iZiI6MTcyMTI0MDA4Ny44MzcxNjIsInN1YiI6IjY0NGU5NWRkMzVjMzBhMDM3MDYxNWExMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EQPdgxRS7VgIUpr0gH9qMqlPCbNzfsn9ePPsul3BhYw"
    }
})

export default instance