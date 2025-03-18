import { Link } from "react-router-dom";
import Title from "../decoration/Title";

const Header = () => {
    return (
        <>
            <header className="bg-white flex flex-col items-center">
                <Title size={1} title="ShinedePlay" />
                <nav>
                    {/* Conteneur des liens de navigation */}
                        <div className="flex gap-4">
                            <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Server">Serveur</Link>
                            <p>|</p>
                            <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Users">Utilisateurs</Link>
                            <p>|</p>
                            <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Profile">Profile</Link>
                            <p>|</p>
                            <Link className="text-lg transition-colors duration-300 hover:text-[#6a11cb]" to="/Modpack">Modpack</Link>
                        </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
