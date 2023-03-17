import PropTypes from 'prop-types';

export function CharacterSentence({ sentence, transcription }) {
  return (
    <div>
      <p className="text-2xl font-bold">Frase</p>
      <div>
        {sentence.split(' ').map((s, idx) => (
          <span
            key={idx}
            className={`text-2xl text-black
    `}
            style={{
              color: transcription.includes(s.toLowerCase()) ? 'green' : 'red',
            }}
          >
            {s}{' '}
          </span>
        ))}
      </div>
    </div>
  );
}
CharacterSentence.propTypes = {
  sentence: PropTypes.string.isRequired,
  transcription: PropTypes.string,
};
