import { useEffect, useRef } from "react";
import { SkinViewer } from "skinview3d";

type MinecraftSkinCardType = {
    username: string;
};

const MinecraftSkinCard = ({ username }: MinecraftSkinCardType) => {
    const viewerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!viewerRef.current) return;

        // Nettoie l'ancien canvas s’il existe
        viewerRef.current.innerHTML = "";

        // Crée le viewer
        const viewer = new SkinViewer({
            width: 300,
            height: 400,
            canvas: undefined, // sera auto-créé
            skin: `https://mc-heads.net/skin/${username}`,
        });

        // Ajoute au container
        viewerRef.current.appendChild(viewer.canvas);

        // Rotation auto
        viewer.autoRotate = true;

        // Zoom (optionnel)
        viewer.zoom = 0.9;

        return () => {
            viewer.dispose();
        };
    }, [username]);

    return (
        <div className="h-full bg-gradient-to-br from-blue-600 to-fuchsia-500 p-6 rounded-2xl shadow-lg text-white flex flex-col content-center items-center">
            <h2 className="text-3xl font-bold w-full border-b-2 border-white pb-3 text-center">Vitrine de skin</h2>
            <div ref={viewerRef} className="m-4" />
        </div>
    );
};

export default MinecraftSkinCard;
