import { Routes, useLocation, useNavigate } from "react-router-dom";
import { getRoutes } from "./utils/routes";
import Footer from "./components/footers/Footer";
import { useHttpClient } from "./shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./shared/context/AuthContext";
import { ModalContext } from "./shared/context/ModalContext";
import Title from "./components/decoration/Title";
import Header from "./components/headers/Header";
import Banned from "./pages/Banned";
import { useInterval } from "./shared/hooks/useInterval";

const App = () => {

  const { sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const modalCtx = useContext(ModalContext);
  let navigate = useNavigate();
  const loc = useLocation();

  const [isReady, setIsReady] = useState<boolean>(false);

  const sendIsConnected = async () => {
    await sendRequest({
      key: 1,
      url: import.meta.env.VITE_PLAY_API_URL + '/isConnected',
      method: 'GET',
      onSuccess: (data) => {
        if (data.Token) {
          authCtx.setAuthData({
            isLoggedIn: true,
            token: "Bearer " + data.Token,
            role: data.Role[0].trim(),
            username: data.Username,
          });
        }
        navigate(loc.pathname);
      },
      onError: (error) => {
        modalCtx.open("Impossible de contacter le serveur... Réessayer plus tard !", "error", error);
      },
    });
    setIsReady(true);
  };

  //Envois une fois la requête au démarrage
  useEffect(() => {
    sendIsConnected()
  }, [])

  //Envois l'actualisation seulement si l'utilisateur est connecté
  useInterval(() => {
    if (authCtx.isLoggedIn) sendIsConnected();
  }, 5000);

  return (
    <>
      {authCtx.role == "ROLE_BAN" ?
        <Banned />
        :
        <div className="min-h-screen flex flex-col font-[Poppins]">
          <Header />
          <div className="flex-1 flex flex-col">
            <main className="w-11/12 mx-auto my-5 p-8 rounded-lg shadow-lg text-center">
              {isReady ?
                <Routes>{getRoutes(authCtx.role)}</Routes>
                :
                <Title size={1} title="Chargement..." />
              }
            </main>
          </div>
          <Footer />
        </div>
      }
    </>
  );
};

export default App;