import PropTypes from 'prop-types';

export function CharacterSentence({
  characterName,
  sentence,
  transcription,
  characterImg,
  characterOrigin,
}) {
  const getImgUrl = (image) => {
    return new URL(`../assets/${image}`, import.meta.url).href;
  };
  return (
    <section className="flex flex-col md:flex-row w-full">
      <div className="h-full flex-[0.5]">
        <picture className="shadow-md">
          <img
            src={getImgUrl(characterImg)}
            alt="A picture representing the scence of the movie or series of the dialogue character"
            className="w-full object-contain h-full rounded-lg"
          />
        </picture>
        <p className="text-2xl font-bold text-center text-primary uppercase">
          {characterName} - {characterOrigin}
        </p>
      </div>
      <aside className="md:ml-5 flex-[0.5]">
        <label className="text-xs text-sky-400">
          Repite la frase presionado el botón
        </label>
        <div>
          {sentence.split(' ').map((s, idx) => (
            <span
              key={idx}
              className="text-sm text-center md:text-lg"
              style={{
                color: s == transcription.split(' ')[idx] ? '#22c55e' : 'grey',
              }}
            >
              {s}{' '}
            </span>
          ))}
        </div>
      </aside>
    </section>
  );
}
CharacterSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  transcription: PropTypes.string,
  characterName: PropTypes.string,
  characterImg: PropTypes.string,
  characterOrigin: PropTypes.string,
};
