import { useEffect, useRef } from 'react';
import { useGameContext } from '../context/GameProvider';
import { useGame } from '../hooks/useGame';
import party from 'party-js';
import { useNavigate } from 'react-router-dom';
import { useSpeechly } from '../hooks/useSpeechly';

export function GameReport() {
  const navigate = useNavigate();
  const {
    initialState: { badAnswers },
  } = useGameContext();
  const { totalCharacters } = useGame();
  const reportContainer = useRef(null);
  const { resetResources } = useSpeechly();
  useEffect(() => {
    resetResources();
    let interval = setInterval(() => {
      party.confetti(reportContainer.current, {
        count: party.variation.range(60, 80),
      });
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const goToHome = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <main className="p-5 bg-[#F6F5DE] h-screen overflow-hidden">
      <h5 className="text-xl md:text-2xl font-bold text-primary">Resultados</h5>
      <section
        className="w-full h-full flex flex-col items-center "
        ref={reportContainer}
      >
        <p className="text-gray-700 text-xl md:text-3xl">Fue divertido 😄</p>
        <section className="flex flex-col gap-6 mt-5 md:mt-10  items-center">
          <div className=" bg-[#B5EBBD] w-[200px]  h-[100px] rounded-lg  relative flex items-end justify-center">
            <label className="absolute top-2 left-2 text-xs text-[#42AA46]">
              Respuestas correctas
            </label>
            <label className="text-[#42AA46] font-extrabold text-4xl mb-2">
              {totalCharacters - badAnswers.length}
            </label>
          </div>
          <div className=" bg-[#EBB5B5] w-[200px] h-[100px] rounded-lg  relative flex items-end  justify-center">
            <label className="absolute top-2 left-2 text-xs text-[#FF5959]">
              Respuestas incorrectas
            </label>
            <label className="text-[#FF5959] font-extrabold text-4xl mb-2">
              {badAnswers.length}
            </label>
          </div>
          <div className="mx-auto w-[300px]">
            <button
              className="btn w-full btn-primary text-gray-200"
              onClick={goToHome}
            >
              Ir al inicio
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
