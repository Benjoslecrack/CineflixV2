'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import cookies from 'js-cookie';

const AppContext = createContext();

export function AppWrapper({ children }) {

    const [sharedState, setSharedState] = useState({
        user: null,
    });

    useEffect(() => {
        const context = cookies.get('context');
        if (context) {
            setSharedState(JSON.parse(context));
        }
    }, []);

    useEffect(() => {
        cookies.set("context", JSON.stringify(sharedState));
    }, [sharedState]);

    useEffect(() => {
        const token = cookies.get('access_token')
        if (!token) {
            return;
        }
        axios.get(`${process.env.NEXT_PUBLIC_API}/users/verifytoken`, { withCredentials: true })
            .then((res) => {
                console.log("data verify", res.data)
                if (res.data) {
                    setSharedState((prevState) => ({
                        ...prevState,
                        user: res.data,
                    }))
                } else {
                    // cookies.remove('access_token')
                }
            }).catch((err) => {
                // cookies.remove('access_token')
            })
    }, [sharedState.refreshUser]);

    const dispatch = (state, action) => {
        setSharedState((prevState) => ({
            ...prevState,
            [state]: action,
        }));
    };

    return (
        <AppContext.Provider value={{ sharedState, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}