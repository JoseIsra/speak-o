import { useEffect, useState } from 'react';
import { useSpeechContext } from '@speechly/react-client';

export function useSpeechly() {
  const { segment } = useSpeechContext();
  const [tentativeTranscript, setTentativeTranscript] = useState('');
  const [speechDone, setSpeechDone] = useState(false);

  useEffect(() => {
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      const plainString = segment.words.map((word) => word.value).join(' ');
      setTentativeTranscript(plainString);

      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        setSpeechDone(true);
      }
    }
  }, [segment]);

  const resetResources = () => {
    setSpeechDone(false);
    setTentativeTranscript('');
  };
  return {
    tentativeTranscript,
    speechDone,
    resetResources,
    setSpeechDone,
    setTentativeTranscript,
  };
}
