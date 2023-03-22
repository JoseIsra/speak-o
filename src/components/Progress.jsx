import PropTypes from 'prop-types';

export function Progress({ currentQuestion, totalQuestions }) {
  return (
    <div className="text-center text-primary text-md font-bold mb-3">
      {currentQuestion} / {totalQuestions}
    </div>
  );
}

Progress.propTypes = {
  currentQuestion: PropTypes.number,
  totalQuestions: PropTypes.number,
};
