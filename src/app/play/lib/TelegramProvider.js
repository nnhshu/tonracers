// import Script from "next/script"
//import Script from 'react-load-script';
import { createContext, useContext, useEffect, useMemo, useState } from "react"

// import {
//   LoginWebApp
// } from '../../../api/index';

export const TelegramContext = createContext({})

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(null)
  const [isCdnScriptLoaded, setIsCdnScriptLoaded] = useState(false);
  //const [jsonString, setJsonString] = useState(null);
  // useEffect(() => {
  //     const script = document.createElement('script');
  //     script.src = 'https://telegram.org/js/telegram-web-app.js';
  //     script.async = true;
  //     document.body.appendChild(script);

  //     // Clean up script khi component bị unmounted
  //     return () => {
  //     document.body.removeChild(script);
  //     };
  // }, []);

  const handleScriptLoad = () => {
    //console.log('Telegram Web App script has been loaded.');
    setIsCdnScriptLoaded(true);
  };


  useEffect(() => {
    const app = window.Telegram?.WebApp
    if (app) {
      console.log("telegramWebApp", app.initData);

      let result = app.initData.replace(/"/g, '');
      console.log(result);
      app.ready();
      setWebApp(app);
      localStorage.setItem('telegramWebApp', JSON.stringify(result));

      window.Telegram.WebApp.disableVerticalSwipes();
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.enableClosingConfirmation();
      window.Telegram.WebApp.HapticFeedback.impactOccurred('rigid');

    }

  }, [])

  const value = useMemo(() => {
    return webApp
      ? {
        webApp,
        unsafeData: webApp.initDataUnsafe,
        user: webApp.initDataUnsafe.user
      }
      : {}
  }, [webApp])

  return (
    <TelegramContext.Provider value={value}>
      {/* Make sure to include script tag with "beforeInteractive" strategy to pre-load web-app script */}
      {/* <Script
        src="https://telegram.org/js/telegram-web-app.js"
        strategy="beforeInteractive"
      />{" "} */}
      {/* <Script
        url="/js/telegram-web-app.js"
        onCreate={handleScriptLoad}
        onError={handleScriptLoad}  
        async
      />{" "} */}
      {children}
    </TelegramContext.Provider>
  )
}

export const useTelegram = () => useContext(TelegramContext)