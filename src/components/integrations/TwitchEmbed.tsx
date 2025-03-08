import { useEffect } from "react";

const TwitchEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://player.twitch.tv/js/embed/v1.js";
    script.async = true;
    script.onload = () => {
      if (window.Twitch) {
        new window.Twitch.Embed("twitch-embed", {
          width: "100%",
          height: "100%",
          channel: "Shinederu", // Remplace par le nom de ta chaîne
          layout: "video", // Options : "video" ou "video-with-chat"
          theme: "dark", // Options : "dark" ou "light"
          parent: [window.location.hostname]
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="aspect-video rounded-xl border-4 border-[#6a11cb] mt-6 mb-6 w-5/6">
        <div id="twitch-embed" className="w-full h-full"></div>
      </div>
    </div>

  );
};

export default TwitchEmbed;
