import { useState } from 'react';
import { PushToTalkButton } from '@speechly/react-ui';
import speeches from '../data/speeches.json';
import { useSpeechly } from '../hooks/useSpeechly';
import { CharacterSentence } from '../components/CharacterSentence';
import { Transcription } from '../components/Transcription';

export function DialogueGame() {
  const [characterInfo] = useState(speeches.characters[0]);
  const { tentativeTranscript } = useSpeechly();

  return (
    <div className="">
      <CharacterSentence
        sentence={characterInfo.sentence}
        transcription={tentativeTranscript}
      />
      <Transcription
        words={characterInfo.tokens}
        transcription={tentativeTranscript}
      />

      <PushToTalkButton placement="bottom" />
    </div>
  );
}
