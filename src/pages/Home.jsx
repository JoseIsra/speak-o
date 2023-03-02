import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DIALOGUE_TAB = 'DIALOGUE';
const PARAGRAPH_TAB = 'PARAGRAPH_TAB';

export function Home() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('DIALOGUE');

  const changeTab = (tab) => {
    setTab(tab);
  };

  const goToGame = () => {
    navigate(`/game/${tab == DIALOGUE_TAB ? 'dialogue' : 'paragraph'}`);
  };

  return (
    <main className="bg-[#fffffe] h-screen min-h-screen flex flex-row items-center justify-center relative overflow-hidden">
      <div
        className="
      w-[220px]
      h-[220px]
      bg-secondary
      rounded-[50%]
      absolute
      top-[-30px]
      left-[-80px]
      blur-md
      "
      ></div>
      <h1 className="absolute top-10 text-3xl text-primary font-bold">
        Speak-O
      </h1>
      <div className="hero">
        <div className="hero-content text-center  relative">
          <button
            className="
            right-0 top-[-50px]
            absolute
            btn-accent btn-circle btn-lg
            text-white
            font-bold
            "
            onClick={goToGame}
          >
            Jugar
          </button>

          <div className="max-w-md">
            {tab == DIALOGUE_TAB ? (
              <>
                <p className="text-2xl font-extrabold text-primary">
                  Prepárate para repetir diálogos de personajes interesantes
                </p>
                <p className="py-6 text-sky-500">
                  Divertida forma de practicar tu pronunciación
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-extrabold text-primary">
                  Completa los espacios en blanco que veas
                </p>
                <p className="py-6 text-sky-500">
                  Pon a prueba tu comprensión lectora
                </p>
              </>
            )}

            <div className="flex flex-row items-center justify-around">
              <button
                className={`btn btn-primary text-white font-extrabold
                 ${tab == DIALOGUE_TAB ? '' : 'btn-outline'}`}
                onClick={() => changeTab(DIALOGUE_TAB)}
              >
                Juego de diálogos
              </button>
              <button
                className={`
                btn btn-primary  font-extrabold text-white
                ${tab == PARAGRAPH_TAB ? '' : 'btn-outline'}`}
                onClick={() => changeTab(PARAGRAPH_TAB)}
              >
                Juego de párrafos
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
