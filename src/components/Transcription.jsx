import PropTypes from 'prop-types';

export function Transcription({ words, transcription }) {
  return (
    <div>
      {transcription &&
        transcription.split(' ').map((tt, idx) => (
          <label
            key={idx}
            className={`text-2xl font-extrabold ${
              words.includes(tt) ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {tt}
          </label>
        ))}
    </div>
  );
}
Transcription.propTypes = {
  transcription: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
};
