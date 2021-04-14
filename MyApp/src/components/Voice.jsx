import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { usePlayer, playerConstants } from "../hooks/usePlayerControls";

export default function Voice() {
  const {
    mode,
    play,
    resume,
    pause,
    stop,
    previous,
    next,
    currentUtterance,
  } = usePlayer(utterances);
  const { transcript } = useSpeechRecognition({ commands });
  const commands = [
    {
      command: ["Start"],
      callback: play(settings),
    },

    {
      command: ["Stop"],
      callback: stop(),
    },
  ];

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return "This browser does not support speech recognition";
  }
}
