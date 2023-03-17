import { useEffect, useState } from 'react';
import { useSpeechContext } from '@speechly/react-client';

export function useSpeechly() {
  const { segment } = useSpeechContext();
  const [tentativeTranscript, setTentativeTranscript] = useState('');

  useEffect(() => {
    if (segment) {
      // Handle speech segment and make tentative changes to app state
      console.log(segment);
      const plainString = segment.words.map((word) => word.value).join(' ');
      setTentativeTranscript(plainString);
      if (segment.isFinal) {
        // Handle speech segment and make permanent changes to app state
        console.log('✅', segment);
      }
    }
  }, [segment]);
  return {
    tentativeTranscript,
  };
}
