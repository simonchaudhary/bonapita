import React, { useState } from "react";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";

// components
import {
	SoundRecordingContainer,
	StartButton,
	StopButton,
} from "./SoundRecordingStyle";

const SoundRecording = () => {
	const [state, setState] = useState({ recordState: null });
	const [audioURL, setaudioURL] = useState(null);

	const start = () => {
		setState({
			recordState: RecordState.START,
		});
	};
	const pause = () => {
		setState({
			recordState: RecordState.PAUSE,
		});
	};

	const stop = () => {
		setState({
			recordState: RecordState.STOP,
		});
	};

	//audioData contains blob and blobUrl
	const onStop = (audioData) => {
		console.log("audioData", audioData);
		setaudioURL(audioData.url);
	};

	return (
		<SoundRecordingContainer>
			<AudioReactRecorder state={state.recordState} onStop={onStop} />

			<audio src={audioURL} controls />

			{state.recordState === null ||
			state.recordState === "stop" ||
			state.recordState === "pause" ? (
				<StartButton onClick={start}>Record</StartButton>
			) : state.recordState === "start" ? (
				<>
					<StopButton onClick={pause}>Pause</StopButton>
					<StopButton onClick={stop}>Stop</StopButton>
				</>
			) : state.recordState === "pause" ? (
				<StopButton onClick={stop}>Stop</StopButton>
			) : null}
		</SoundRecordingContainer>
	);
};
export default SoundRecording;
