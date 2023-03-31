import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

export function CharacterSentence({
  characterName,
  tokens,
  transcription,
  characterImg,
  characterOrigin,
}) {
  const { t } = useTranslation();

  const getImg = (image) => {
    return new URL(`../assets/${image}`, import.meta.url).href;
  };

  return (
    <section className="flex flex-col md:flex-row w-full">
      <div className="h-full flex-[0.5]">
        <picture className="shadow-md">
          <img
            src={getImg(characterImg)}
            alt="A picture representing the scence of the movie or series of the dialogue character"
            className="w-full object-contain h-full rounded-lg"
            loading="lazy"
          />
        </picture>
        <p className="text-2xl font-bold text-center text-primary uppercase">
          {characterName} - {characterOrigin}
        </p>
      </div>
      <aside className="md:ml-5 flex-[0.5]">
        <label className="text-xs text-sky-400">{t('dialogueGame.hint')}</label>
        <div>
          {tokens.map((t, idx) => (
            <span
              key={idx}
              className="text-sm text-center md:text-lg"
              style={{
                color: t == transcription.split(' ')[idx] ? '#22c55e' : 'grey',
              }}
            >
              {t}{' '}
            </span>
          ))}
        </div>
      </aside>
    </section>
  );
}
CharacterSentence.propTypes = {
  tokens: PropTypes.array,
  transcription: PropTypes.string,
  characterName: PropTypes.string,
  characterImg: PropTypes.string,
  characterOrigin: PropTypes.string,
};
