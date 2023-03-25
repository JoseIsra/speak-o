import { useMemo, useEffect, useRef } from 'react';
import { PushToTalkButton } from '@speechly/react-ui';
import { useSpeechly } from '../hooks/useSpeechly';
import { CharacterSentence } from '../components/CharacterSentence';
import { Transcription } from '../components/Transcription';
import { useGame } from '../hooks/useGame';
import party from 'party-js';
import { Progress } from '../components/Progress';
import { Cube } from '../components/cube/Cube';
import { useNavigate } from 'react-router-dom';
import { useErrorContext } from '../context/ErrorProvider';

const CORRECT_ANSWER_SOUND =
  'https://cdn.freesound.org/previews/587/587252_10334845-lq.mp3';
const INCORRET_ANSWER_SOUND =
  'https://cdn.freesound.org/previews/528/528956_10334845-lq.mp3';

export function DialogueGame() {
  const navigate = useNavigate();
  const { speechDone, tentativeTranscript, resetResources } = useSpeechly();
  const {
    loading,
    currentIndex,
    currentCharacter,
    updateIndex,
    totalCharacters,
  } = useGame();
  const { dispatch } = useErrorContext();

  const dialogueWrapper = useRef(null);

  const nextCharacter = () => {
    resetResources();
    updateIndex();
  };

  const endGame = () => {
    navigate('/report');
  };

  const handleAction = () => {
    console.log('handle action?', currentIndex + 1);
    if (currentIndex + 1 == totalCharacters) {
      endGame();
    } else {
      nextCharacter();
    }
  };

  const speechDoneWithNoMistakes = useMemo(() => {
    return (
      tentativeTranscript.split(' ').length ==
        currentCharacter?.tokens.length &&
      currentCharacter?.tokens.every((t) => tentativeTranscript.includes(t))
    );
  }, [tentativeTranscript]);

  useEffect(() => {
    if (speechDone) {
      if (speechDoneWithNoMistakes) {
        const audio = new Audio(CORRECT_ANSWER_SOUND);
        audio.currentTime = 0;
        audio.play();
        party.confetti(dialogueWrapper.current, {
          count: party.variation.range(60, 80),
        });
      } else {
        const audio = new Audio(INCORRET_ANSWER_SOUND);
        audio.currentTime = 0;
        audio.play();
        dispatch({
          type: 'ADD_BAD_ANSWER',
          payload: currentCharacter,
        });
      }
    }
  }, [speechDone, speechDoneWithNoMistakes]);

  return (
    <section>
      <div
        className="w-10/12 sm:w-7/12 md:10/12 mx-auto "
        ref={dialogueWrapper}
      >
        <Progress
          currentQuestion={(currentIndex % totalCharacters) + 1}
          totalQuestions={totalCharacters}
        />
        {!loading ? (
          <>
            <CharacterSentence
              characterName={currentCharacter.name}
              characterImg={currentCharacter.image}
              characterOrigin={currentCharacter.origin}
              sentence={currentCharacter.utterance}
              transcription={tentativeTranscript}
            />
            <Transcription
              words={currentCharacter.tokens}
              transcription={tentativeTranscript}
              noErrors={speechDoneWithNoMistakes}
              speechDone={speechDone}
            />
          </>
        ) : (
          <div className="relative w-[200px] h-[400px] mx-auto flex flex-col items-center justify-center">
            <Cube />
            <p className="mt-10 text-primary text-sm tracking-wide">
              Cargando 🧐...
            </p>
          </div>
        )}
      </div>

      {/* <button
        className="
          btn 
          btn-primary 
          btn-md 
          text-gray-100 
          fixed bottom-2 
          left-[50%] translate-x-[-50%]
          hover:text-bold 
          hover:scale-110
          hover:bg-primary
          transition-all
          linear
          duration-200
          "
        onClick={handleAction}
      >
        {currentIndex + 1 == totalCharacters ? 'Finalizar' : 'Siguiente'}
      </button> */}
      {speechDone ? (
        <button
          className="
          btn 
          btn-primary 
          btn-md 
          text-gray-100 
          fixed bottom-2 
          left-[50%] translate-x-[-50%]
          hover:text-bold 
          hover:scale-110
          hover:bg-primary
          transition-all
          linear
          duration-200
          "
          onClick={handleAction}
        >
          {currentIndex + 1 == totalCharacters ? 'Finalizar' : 'Siguiente'}
        </button>
      ) : (
        <PushToTalkButton placement="bottom" size="70px" voffset="0" />
      )}
    </section>
  );
}
