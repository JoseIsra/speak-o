import { useNavigate } from 'react-router-dom';
import 'atropos/css';
import Atropos from 'atropos/react';

export function Home() {
  const navigate = useNavigate();

  const goToGame = () => {
    navigate('/game/dialogue');
  };

  return (
    <main className="bg-[#fffffe] h-screen min-h-screen flex flex-row items-center justify-center relative overflow-hidden">
      <h1 className="absolute top-10 text-3xl text-primary font-bold">
        Speak-O
      </h1>
      <Atropos className="w-[320px] md:w-[520px] h-[280px]" shadow={false}>
        <div className="hero  rounded-md border-sky-300 border-2 shadow-md">
          <div className="hero-content text-center  relative">
            <div className="max-w-md">
              <p className="text-md md:text-2xl font-extrabold text-primary">
                Prepárate para repetir diálogos de personajes ficticios 😁
              </p>
              <p className="py-6 text-gray-500">
                Una exigente forma de practicar tu pronunciación
              </p>
              <button
                className="
            btn-primary
            text-white
            font-bold
            btn
            w-[200px]
            "
                onClick={goToGame}
              >
                Jugar
              </button>
            </div>
          </div>
        </div>
      </Atropos>
    </main>
  );
}
