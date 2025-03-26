import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const getRandomEmoji = () => {
  const emojis = ["🥵", "💀", "😂", "🐸", "🤡", "😭", "😈", "🥶"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

const Banned = () => {
  const [showText, setShowText] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1000);
    const emojiInterval = setInterval(() => {
      setEmojis((prev) => [...prev, getRandomEmoji()]);
    }, 500);
    return () => {
      clearTimeout(timer);
      clearInterval(emojiInterval);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-purple-900 via-black to-indigo-900 text-white flex items-center justify-center p-6">
      {/* Fond bruité et animé */}
      <div className="absolute inset-0 bg-[url('/noise.gif')] opacity-10 mix-blend-soft-light pointer-events-none z-0" />

      {/* Vagues SVG au fond */}
      <div className="absolute bottom-0 w-full z-0">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#6b21a8"
            fillOpacity="0.3"
            d="M0,96L60,106.7C120,117,240,139,360,165.3C480,192,600,224,720,213.3C840,203,960,149,1080,122.7C1200,96,1320,96,1380,96L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Emojis qui tombent */}
      {emojis.map((emoji, index) => (
        <motion.div
          key={index}
          initial={{ y: -50, opacity: 0, x: Math.random() * window.innerWidth }}
          animate={{ y: window.innerHeight + 50, opacity: 1 }}
          transition={{ duration: 4 + Math.random() * 2 }}
          className="absolute text-2xl select-none pointer-events-none"
        >
          {emoji}
        </motion.div>
      ))}

      {/* Contenu principal */}
      <div className="z-10 text-center space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-purple-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.7)]"
        >
          ⛔ Tu es banni.
        </motion.h1>

        <AnimatePresence>
          {showText && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="text-xl md:text-2xl max-w-xl mx-auto text-purple-200"
            >
              Ton voyage s'arrête ici... Mais regarde cette page. Elle a été faite pour toi. Rien que pour toi.
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ yoyo: Infinity, duration: 1.2 }}
          className="text-6xl"
        >
          🥀
        </motion.div>

        <motion.button
          whileTap={{ scale: 1.1, rotate: [0, 5, -5, 5, -5, 0] }}
          className="mt-4 px-6 py-3 bg-purple-700 bg-opacity-30 border border-purple-400 text-purple-200 rounded-lg shadow-lg cursor-not-allowed"
        >
          Supprimer ma douleur
        </motion.button>

        {/* Compteur infini */}
        <p className="text-sm text-purple-400 mt-4 animate-pulse">
          Temps avant réintégration : ∞ années 😭
        </p>

        {/* Citation dramatique */}
        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="text-xs text-purple-500 italic"
        >
          "Même le soleil se couche, mais toi tu restes banni." – Gandhi (probablement)
        </motion.p>
      </div>

      {/* Bouton qui fuit */}
      <motion.button
        className="absolute top-4 left-4 px-3 py-1 bg-pink-600 text-white rounded hover:scale-105 transition-transform duration-300"
        whileHover={{ x: 1700 * Math.random(), y: 1500 * Math.random() }}
      >
        Revenir en arrière
      </motion.button>
    </div>
  );
};

export default Banned;