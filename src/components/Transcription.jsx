import PropTypes from 'prop-types';

export function Transcription({ words, transcription, noErrors, speechDone }) {
  return (
    <div
      className="rounded-md mt-4 p-2 overflow-auto h-[120px] max-h-[120px] w-full row border-dashed  border"
      style={{
        borderColor: noErrors ? 'green' : 'red',
        background: speechDone ? (noErrors ? '#daffda' : '#ffd6e3') : '#e7e5e5',
      }}
    >
      {transcription &&
        transcription.split(' ').map((tt, idx) => (
          <label
            key={idx}
            className={`text-sm font-extrabold w-fit ${
              tt == words[idx] ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {tt}{' '}
          </label>
        ))}
    </div>
  );
}
Transcription.propTypes = {
  transcription: PropTypes.string,
  words: PropTypes.arrayOf(PropTypes.string),
  noErrors: PropTypes.bool,
  speechDone: PropTypes.bool,
};
