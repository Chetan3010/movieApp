import React, { useEffect } from "react";
import ScrollRestorationCustom from "../../partials/global/ScrollRestorationCustom";
import Topnav from "../../partials/topnav/Topnav";
import axios from "../../../utils/axios";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useSession from "../../../hooks/useSession";

const Login = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const { getSession, isAuthenticated, setSession, clearSession } = useSession    ();

    const tmdbAuth = async () => {
        try {
            const response = await axios.post(`/account/request_token`, {
                reqMethod: "POST",
                reqUrl: `https://api.themoviedb.org/4/auth/request_token`,
                reqBody: {
                    redirect_to: `${window.location.href}?approved=true`,
                },
            });

            if (response.status === 200) {
                const { request_token } = response.data;
                sessionStorage.setItem("request_token", request_token);
                window.open(
                    `https://www.themoviedb.org/auth/access?request_token=${request_token}`,
                    "_self"
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const approved = searchParams.get("approved");
        const request_token = sessionStorage.getItem("request_token");

        const generateSession = async () => {
            const response = await axios.post(`/account/access_token`, {
                reqMethod: "POST",
                reqUrl: `https://api.themoviedb.org/4/auth/access_token`,
                reqBody: { request_token },
            });
            
            if(response.status === 200 && response?.data?.success){
                const session = {
                    data: {
                        access_token: response.data.access_token,
                        account_id: response.data.account_id
                    },
                    status: 'authenticated'
                }
                setSession(session)
                navigate('/')
            }
        };
        
        if(isAuthenticated){
            navigate('/')
        }

        if (approved === "true" && request_token) {
            generateSession();
        }
    }, [searchParams]);

    return (
        <>
            <ScrollRestorationCustom />
            <section className="main">
                <Topnav />
                <div className="w-full">
                    <button
                        onClick={tmdbAuth}
                        className="w-32 h-16 bg-blue-400"
                    >
                        Login
                    </button>
                </div>
            </section>
        </>
    );
};

export default Login;
