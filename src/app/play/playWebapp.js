import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Unity, useUnityContext, RegisterExternalListener } from "react-unity-webgl";
import Bg_LoadGame from './image/bg_game.jpg';
import Logo from './image/Logo.png';

const PlayGameMobile = ({ jsonString }) => {

    const {
        unityProvider, requestFullscreen, isLoaded, loadingProgression,
        addEventListener, removeEventListener, sendMessage
    } = useUnityContext({
        loaderUrl: `https://tfarm-s-test.b-cdn.net/build/Build.loader.js`,
        dataUrl: `https://tfarm-s-test.b-cdn.net/build/webgl.data`,
        frameworkUrl: `https://tfarm-s-test.b-cdn.net/build/build.framework.js`,
        codeUrl: `https://tfarm-s-test.b-cdn.net/build/build.wasm`,
        // loaderUrl: `${process.env.PUBLIC_URL}/playGame/build/Build.loader.js`,
        // dataUrl: `${process.env.PUBLIC_URL}/playGame/build/webgl.data`,
        // frameworkUrl: `${process.env.PUBLIC_URL}/playGame/build/build.framework.js`,
        // codeUrl: `${process.env.PUBLIC_URL}/playGame/build/build.wasm`,
        // streamingAssetsUrl: "streamingassets",
        // webGLContextAttributes: {
        //     alpha: true,
        //     antialias: true,
        //     depth: true,
        //     failIfMajorPerformanceCaveat: true,
        //     powerPreference: "high-performance",
        //     premultipliedAlpha: true,
        //     preserveDrawingBuffer: true,
        //     stencil: true,
        //     desynchronized: true,
        //     xrCompatible: true,
        // },
    });

    const loadingPercentage = Math.round(loadingProgression * 100);
    const unityRef = useRef();

    const refreshPage = () => {
        window.location.reload(false);
    }

    /// From React to Unity
    //  gameObjectName: GameManager,
    //  methodName: MessageFromjavaScript,
    //  parameter: message
    function handleLoadFirstData(isLoaded) {

        if (isLoaded) {
            sendMessage("GameManager", "MessageFromjavaScript", jsonString);
            //sendMessage("GameManager", "MessageFromjavaScript", 'message123456');
        }
    }

    // From Unity To React
    const returnUnityToReact = useCallback((message) => {
        console.log(message)
        if (message === 'reloadPage') {
            refreshPage();
        }
        // if (message === 'duckVibrate') {   
        //     console.log('123456789')        
        //     navigator.vibrate(1000);
        // }
    }, []);

    const returnDuckVibrate = useCallback((message) => {
        //window.navigator.vibrate(parseInt(message));
        try {
            window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid');
            console.log(message)
        } catch (err) {
            console.log(err)
        }
    }, []);

    const copyToClipboard = useCallback(async (message) => {
        console.log('copyToClipboard', message)
        try {
            await navigator.clipboard.writeText(message);
            const [prefix, number] = message.split('-');
            await navigator.clipboard.writeText(number);
            if (prefix == 'ASCOT') {
                window.location.replace("https://t.me/tfarm_horse_racing/18");
            } else if (prefix.replace(/\s+/g, '') == 'MAYDAN1') {
                window.location.replace("https://t.me/tfarm_horse_racing/14");
            } else if (prefix.replace(/\s+/g, '') == 'MAYDAN2') {
                window.location.replace("https://t.me/tfarm_horse_racing/16");
            } else if (prefix.replace(/\s+/g, '') == 'MAYDAN3') {
                window.location.replace("https://t.me/tfarm_horse_racing/17");
            } else if (prefix.replace(/\s+/g, '') == 'HRC1') {
                window.location.replace("https://t.me/tfarm_horse_racing/2742");
            } else if (prefix.replace(/\s+/g, '') == 'HRC2') {
                window.location.replace("https://t.me/tfarm_horse_racing/2744");
            } else if (prefix.replace(/\s+/g, '') == 'HRC3') {
                window.location.replace("https://t.me/tfarm_horse_racing/2745");
            }
        } catch (err) {
            console.log(err)
        }
    }, []);

    useEffect(() => {
        addEventListener("gamePlay", returnUnityToReact);
        return () => {
            removeEventListener("gamePlay", returnUnityToReact);
        };
    }, [addEventListener, removeEventListener, returnUnityToReact]);

    useEffect(() => {
        addEventListener("duckVibrate", returnDuckVibrate);
        return () => {
            removeEventListener("duckVibrate", returnDuckVibrate);
        };
    }, [addEventListener, removeEventListener, returnDuckVibrate]);

    useEffect(() => {
        addEventListener("copyToClipBoard", copyToClipboard);
        return () => {
            removeEventListener("copyToClipBoard", copyToClipboard);
        };
    }, [addEventListener, removeEventListener, copyToClipboard]);

    useEffect(() => {
        handleLoadFirstData(isLoaded);
    }, [isLoaded]);


    return (
        <>
            {!isLoaded &&
                <div className='loading loading_v1 flex-column' style={{ backgroundImage: `url(${Bg_LoadGame})` }}>
                    <img src={Logo} alt='' className='loading_logo_v1' width={200} />
                    <h3 className='d-block'>Loading... ({loadingPercentage}%)</h3>
                </div>
            }
            <div ref={unityRef} className='text-center game-wrap'>
                <Unity
                    unityProvider={unityProvider}
                    devicePixelRatio={window.devicePixelRatio}
                    style={{
                        height: '100%',
                        width: '100%',
                        visibility: isLoaded ? "visible" : "hidden"
                    }}
                />
            </div>
        </>
    );
};
const PlayGameWebApp = ({ jsonString }) => {
    return (
        <PlayGameMobile jsonString={jsonString} />
    );
};

export default PlayGameWebApp;