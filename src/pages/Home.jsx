import { useNavigate } from 'react-router-dom';
import 'atropos/css';
import Atropos from 'atropos/react';
import { useTranslation } from 'react-i18next';

export function Home() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const goToGame = () => {
    navigate('/game/dialogue');
  };

  const spanishSelected = i18n.language == 'es';

  return (
    <main className="bg-[#FFFFFE] h-screen min-h-screen flex flex-row items-center justify-center relative overflow-hidden">
      <div className="absolute top-4 right-4 flex  items-center gap-2">
        <label className="text-sm text-primary">
          {t('home.languages.label')}:
        </label>
        <div className="flex gap-2">
          <button
            className={`btn btn-primary btn-sm  normal-case 
          hover:bg-primary
          ${spanishSelected ? ' text-white' : 'btn-outline'}
          `}
            onClick={() => i18n.changeLanguage('es')}
          >
            🇪🇸
          </button>
          <button
            className={`btn 
          btn-primary btn-sm normal-case 
          hover:bg-primary
          ${!spanishSelected ? 'text-white' : 'btn-outline'}
          `}
            onClick={() => i18n.changeLanguage('en')}
          >
            🇺🇸
          </button>
        </div>
      </div>
      <h1 className="absolute left-4 top-4 text-xl md:text-3xl text-primary font-bold">
        Speak-O
      </h1>
      <Atropos className="w-[320px] md:w-[620px] h-[350px]" shadow={false}>
        <div className="hero  rounded-md border-sky-300 border-2 shadow-md">
          <div className="hero-content text-center  relative">
            <div className="max-w-md">
              <p className="text-md sm:text-xl md:text-3xl font-extrabold text-primary">
                {t('home.title')}
              </p>
              <p className="py-6 text-gray-500">{t('home.subtitle')}</p>
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
                {t('home.action.label')}
              </button>
            </div>
          </div>
        </div>
      </Atropos>
    </main>
  );
}
