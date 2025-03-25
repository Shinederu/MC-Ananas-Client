import { Routes, useLocation, useNavigate } from "react-router-dom";
import { getRoutes } from "./utils/routes";
import Footer from "./components/footers/Footer";
import { useHttpClient } from "./shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./shared/context/AuthContext";
import { ModalContext } from "./shared/context/ModalContext";
import Title from "./components/decoration/Title";
import Header from "./components/headers/Header";

const App = () => {

  const { sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);
  const modalCtx = useContext(ModalContext);
  const [isReady, setIsReady] = useState<Boolean>(false);
  let navigate = useNavigate();
  const loc = useLocation();



  useEffect(() => {
    const sendIsConnected = async () => {
      await sendRequest({
        key: 3,
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
          } else {
            authCtx.setAuthData({
              isLoggedIn: false,
            });
          }
          navigate(loc.pathname);
        },
        onError: () => {
          modalCtx.setMessage("Impossible de contacter le serveur... Réessayer plus tard !");
          modalCtx.setType("error");
          modalCtx.setIsOpen(true);
        },
      });

    };
    sendIsConnected();
    setIsReady(true);
  }, []);


  return (
    <>
      <div className="bg-[#f7f7f7] font-[Poppins] min-h-screen flex flex-col">
        <Header />
        <main className="w-11/12 mx-auto my-10 p-8 rounded-lg shadow-lg text-center flex-grow">
          {isReady ?
            <Routes>{getRoutes(authCtx.role)}</Routes>
            :
            <Title size={1} title="Chargement..." />
          }
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;