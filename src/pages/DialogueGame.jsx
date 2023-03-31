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
import { useGameContext } from '../context/GameProvider';
import { useTranslation } from 'react-i18next';

const CORRECT_ANSWER_SOUND =
  'https://cdn.freesound.org/previews/587/587252_10334845-lq.mp3';
const INCORRET_ANSWER_SOUND =
  'https://cdn.freesound.org/previews/528/528956_10334845-lq.mp3';

export function DialogueGame() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { speechDone, tentativeTranscript, resetResources } = useSpeechly();
  const {
    loading,
    currentIndex,
    currentCharacter,
    updateIndex,
    totalCharacters,
  } = useGame();
  const { dispatch } = useGameContext();

  const dialogueWrapper = useRef(null);

  const nextCharacter = () => {
    resetResources();
    updateIndex();
  };

  const endGame = () => {
    navigate('/report');
  };

  const handleAction = () => {
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
      currentCharacter?.tokens.every(
        (t, idx) => t == tentativeTranscript.split(' ')[idx]
      )
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
        className="w-10/12 sm:w-7/12 md:10/12 mx-auto  relative"
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
              tokens={currentCharacter.tokens}
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
              {t('dialogueGame.loading')}
            </p>
          </div>
        )}
      </div>
      {!loading && (
        <>
          {speechDone ? (
            <div className="absolute bottom-2 w-full flex justify-center">
              <button
                className={`
              btn 
              btn-primary 
              btn-md 
            text-gray-100 

            `}
                onClick={handleAction}
              >
                {currentIndex + 1 == totalCharacters
                  ? t('dialogueGame.actions.finish.label')
                  : t('dialogueGame.actions.next.label')}
              </button>
            </div>
          ) : (
            <PushToTalkButton placement="bottom" size="70px" voffset="0" />
          )}
        </>
      )}
    </section>
  );
}
