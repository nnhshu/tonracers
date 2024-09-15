"use client"

import React, { useEffect, useState } from 'react';
import { TelegramProvider, useTelegram } from "./lib/TelegramProvider"
import PlayGameWebApp from './playWebapp';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { QRCode } from 'react-qrcode-logo';
import Lottie from 'react-lottie';
import loadingAnimation from './json/loadingAnimation.json';

import {
    RegisterUserNoHash
} from '../api/index';

const WebApp = ({ onScriptLoad }) => {

    const { user, webApp } = useTelegram();

    const telegramWebApp = window.localStorage.getItem("telegramWebApp") && window.localStorage.getItem("telegramWebApp").replace(/"/g, '');


    const [jsonString, setJsonString] = useState(null);

    useEffect(() => {
        // Execute actions when the user state is updated
        //console.log('User data in WebApp:', user);
        if (user) {
            // getDataUser(user);
        }
        getDataUser(user);
    }, [user]);

    const getDataUser = async (user) => {

        const loginPayload = {
            telegramId: 860748460,
            first_name: 'Harry Nguyen',
            last_name: '|',
            photo_url: "",
            platform: 'WEBAPP_TELEGRAM'
        };

        const loginWebApp = await RegisterUserNoHash(loginPayload);
        if (loginWebApp.data.data) {
            let dataJson = {
                id: loginWebApp.data.data.id,
                token: loginWebApp.data.data.token,
                first_name: loginWebApp.data.data.first_name,
                last_name: loginWebApp.data.data.last_name,
                hash_infor: telegramWebApp
            }
            setJsonString(JSON.stringify(dataJson))
            //console.log(JSON.stringify(dataJson))
        }
    }

    if (isMobile) {
        return (
            <div>
                {
                    jsonString != null ?
                        <PlayGameWebApp jsonString={jsonString} />
                        :
                        <div className='qr-wrap text-center d-flex align-items-center justify-content-center flex-column'>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: loadingAnimation,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }}
                                height={200}
                                width={200}
                            />
                            <h3 className='mb-3'>Connecting WebApp.....</h3>
                        </div>
                }
            </div>
        )
    } else {
        return (
            <div>
                {
                    jsonString != null ?
                        <PlayGameWebApp jsonString={jsonString} />
                        :
                        <div className='qr-wrap text-center d-flex align-items-center justify-content-center flex-column'>
                            <Lottie
                                options={{
                                    loop: true,
                                    autoplay: true,
                                    animationData: loadingAnimation,
                                    rendererSettings: {
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }
                                }}
                                height={200}
                                width={200}
                            // isStopped={this.state.isStopped}
                            // isPaused={this.state.isPaused}
                            />
                            <h3 className='mb-3'>Connecting WebApp.....</h3>
                        </div>
                }
            </div>
        )
    }
}

const WithTelegramProvider = () => {
    return (
        <TelegramProvider>
            <WebApp />
        </TelegramProvider>
    )
}
export default WithTelegramProvider;