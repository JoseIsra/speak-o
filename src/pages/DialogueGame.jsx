import { useMemo, useEffect, useRef } from 'react';
import { PushToTalkButton } from '@speechly/react-ui';
import { useSpeechly } from '../hooks/useSpeechly';
import { CharacterSentence } from '../components/CharacterSentence';
import { Transcription } from '../components/Transcription';
import { useCharacter } from '../hooks/useCharacter';
import party from 'party-js';
import { Progress } from '../components/Progress';

const CORRECT_ANSWER_SOUND =
  'https://cdn.freesound.org/previews/587/587252_10334845-lq.mp3';
const INCORRET_ANSWER_SOUND =
  'https://cdn.freesound.org/previews/528/528956_10334845-lq.mp3';

export function DialogueGame() {
  const { done, tentativeTranscript, resetResources } = useSpeechly();
  const { currentIndex, currentCharacter, updateIndex, totalCharacters } =
    useCharacter();
  const dialogueWrapper = useRef(null);

  const nextCharacter = () => {
    resetResources();
    updateIndex();
  };
  const speechDoneWithNoMistakes = useMemo(() => {
    return (
      tentativeTranscript.split(' ').length == currentCharacter.tokens.length &&
      currentCharacter.tokens.every((t) => tentativeTranscript.includes(t))
    );
  }, [tentativeTranscript]);

  useEffect(() => {
    if (done) {
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
      }
    }
  }, [done, speechDoneWithNoMistakes]);

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
          speechDone={done}
        />
      </div>
      {done ? (
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
          onClick={nextCharacter}
        >
          Siguiente
        </button>
      ) : (
        <PushToTalkButton placement="bottom" size="70px" voffset="0" />
      )}
    </section>
  );
}
