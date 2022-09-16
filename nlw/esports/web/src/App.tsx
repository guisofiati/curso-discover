import { GamerBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";

import LogoImg from "./assets/logo-nlw-esports.svg";
import "./styles/main.css";
import { useEffect, useState } from "react";

interface Game {
    bannerUrl: string;
    id: string;
    title: string;
    _count: {
        ads: number;
    };
}

function App() {
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        fetch("http://localhost:3333/games")
            .then((response) => response.json())
            .then((data) => {
                setGames(data);
            });
    }, []);

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={LogoImg} alt="Logo do NLW" />

            <h1 className="text-6xl text-white font-black mt-20">
                Seu{" "}
                <span className="bg-nlw-gradient text-transparent bg-clip-text">
                    duo
                </span>{" "}
                está aqui.
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16">
                {games.map((game) => {
                    return (
                        <GamerBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads}
                        />
                    );
                })}
            </div>

            <CreateAdBanner />
        </div>
    );
}

export default App;
