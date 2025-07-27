# Voice Input Feature for MornGPT

## Overview
The voice input feature allows users to input text to the chat using their microphone. This feature uses the Web Speech API to convert speech to text in real-time.

## Features

### 🎤 Voice Recording Button
- Located in the input area next to the file upload button
- Toggle button that starts/stops voice recording
- Visual feedback with different icons (Mic/MicOff)
- Red pulsing animation when recording is active

### ⌨️ Keyboard Shortcut
- **Ctrl/Cmd + R**: Toggle voice recording on/off
- Works when keyboard shortcuts are enabled in settings

### 🎯 Visual Indicators
- **Recording State**: Button turns red with pulsing animation
- **Recording Indicator**: Shows "Voice recording active... Speak now" message
- **Error Display**: Shows voice recognition errors in red

### 🔧 Technical Implementation

#### Speech Recognition Setup
- Uses Web Speech API (`SpeechRecognition` or `webkitSpeechRecognition`)
- Configured for English (en-US)
- Continuous recording with interim results
- Automatic text insertion into the prompt field

#### Error Handling
- Browser compatibility checks
- Permission handling
- Network error recovery
- User-friendly error messages

## Usage Instructions

### Starting Voice Recording
1. Click the microphone button in the input area, OR
2. Use the keyboard shortcut **Ctrl/Cmd + R**

### During Recording
- Speak clearly into your microphone
- Text will appear in the input field as you speak
- The button will show a red pulsing animation
- A recording indicator will appear below the input

### Stopping Voice Recording
1. Click the microphone button again, OR
2. Use the keyboard shortcut **Ctrl/Cmd + R** again, OR
3. The recording will automatically stop after a period of inactivity

### Sending the Message
- After recording, you can edit the transcribed text if needed
- Press Enter (or your configured send hotkey) to send the message

## Browser Compatibility

### Supported Browsers
- Chrome/Chromium (recommended)
- Edge
- Safari (limited support)
- Firefox (limited support)

### Requirements
- HTTPS connection (required for microphone access)
- Microphone permissions granted
- Modern browser with Web Speech API support

## Troubleshooting

### Common Issues

#### "Speech recognition is not supported"
- **Solution**: Use a supported browser (Chrome recommended)
- **Alternative**: Use keyboard input instead

#### "Failed to start voice recording"
- **Solution**: Check microphone permissions
- **Alternative**: Refresh the page and try again

#### "Speech recognition error"
- **Solution**: Check microphone connection
- **Alternative**: Try speaking more clearly or in a quieter environment

#### No sound detected
- **Solution**: Check microphone settings in your browser
- **Alternative**: Ensure microphone is not muted

### Permission Issues
1. Click the microphone icon in the browser address bar
2. Select "Allow" for microphone access
3. Refresh the page if needed

## Settings

### Keyboard Shortcuts
- Voice input shortcut can be customized in Settings → Hotkeys
- Default shortcut: **Ctrl/Cmd + R**
- Can be changed to any preferred key combination

### Language Support
- Currently configured for English (en-US)
- Can be extended to support other languages

## Future Enhancements

### Planned Features
- Multi-language support
- Voice command shortcuts
- Voice-to-text accuracy improvements
- Offline speech recognition
- Custom voice models

### Potential Improvements
- Real-time transcription display
- Voice activity detection
- Noise cancellation
- Speaker identification
- Voice commands for app navigation

## Technical Details

### API Used
- Web Speech API (SpeechRecognition)
- Fallback to webkitSpeechRecognition for Safari

### State Management
- `isRecording`: Boolean state for recording status
- `recognition`: SpeechRecognition instance
- `voiceError`: Error message display

### Event Handlers
- `onresult`: Handles speech recognition results
- `onerror`: Handles recognition errors
- `onend`: Handles recording end

### Security Considerations
- Requires HTTPS for microphone access
- User permission required
- No audio data stored or transmitted
- Only text transcription is processed

## Code Structure

### Key Functions
- `initializeSpeechRecognition()`: Sets up speech recognition
- `startVoiceRecording()`: Starts recording
- `stopVoiceRecording()`: Stops recording
- `toggleVoiceRecording()`: Toggles recording state

### Components
- Voice input button in input area
- Recording indicator
- Error display
- Keyboard shortcut handler

---

*Last Updated: December 2024* 