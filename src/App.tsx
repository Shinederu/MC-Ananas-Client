import { Routes} from "react-router-dom";
import { getRoutes } from "./utils/routes";
import Footer from "./components/footers/Footer";
//import { useHttpClient } from "./shared/hooks/http-hook";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./shared/context/AuthContext";
//import { ModalContext } from "./shared/context/ModalContext";
import Title from "./components/decoration/Title";

const App = () => {

  //const { sendRequest } = useHttpClient();
  const authCtx = useContext(AuthContext);
  //const modalCtx = useContext(ModalContext);
  const [isReady, setIsReady] = useState<Boolean>(false);
  //let navigate = useNavigate();
  //const loc = useLocation();



  useEffect(() => {
      /*
    const sendIsConnected = async () => {
      try {
        await sendRequest({
          key: 3,
          url: import.meta.env.VITE_SHINEDERU_API_URL + '/auth/isConnected',
          method: 'GET',
          onSuccess: (data) => {
            if (data.connected) {
              authCtx.setAuthData({
                isLoggedIn: true,
                mail: data.user.email,
                pseudo: data.user.username,
                pk: data.user.pk,
                permission: data.user.permission,
                token: data.token,
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
        setIsReady(true);
      } catch (error) {
        console.error("Erreur lors de la vérification de la connexion :", error);
      }
    };
    sendIsConnected();
  */

    //Fake Auth
    authCtx.setAuthData({
      isLoggedIn: true,
      permission: 1,
    });
    setIsReady(true);
  }, []);


  return (
    <div className="bg-[#f7f7f7] font-[Poppins] min-h-screen flex flex-col">
      <main className="w-11/12 mx-auto my-10 p-8 rounded-lg shadow-lg text-center flex-grow">
        {isReady ?
          <Routes>{getRoutes(authCtx.permission)}</Routes>
          :
          <Title size={1} title="Chargement..." />
        }
      </main>
      <Footer />
    </div>
  );
};

export default App;