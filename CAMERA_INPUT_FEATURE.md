# Camera Input Feature for MornGPT

## Overview
The camera input feature allows users to capture photos and record videos directly within the chat interface. This feature uses the Web MediaDevices API to access the device camera and provides a seamless way to add visual content to conversations.

## Features

### 📷 Camera Button
- Located in the input area next to the voice input button
- Toggle button that opens/closes the camera interface
- Visual feedback with blue color when camera is active
- Keyboard shortcut: **Ctrl/Cmd + C**

### 🎥 Camera Interface
- **Live Preview**: Real-time camera feed display
- **Mode Switching**: Toggle between photo and video modes
- **Capture Controls**: Take photos or start/stop video recording
- **Recording Timer**: Shows video recording duration
- **Media Preview**: Displays captured photos and videos

### 📸 Photo Mode
- **Take Photo**: Capture high-quality images
- **Auto-insert**: Photos are automatically added to the prompt
- **Preview**: Shows captured image before sending
- **File Naming**: Automatic timestamp-based naming

### 🎬 Video Mode
- **Start/Stop Recording**: Toggle video recording
- **Recording Timer**: Real-time duration display
- **Audio Support**: Captures audio with video (when permitted)
- **File Naming**: Automatic timestamp-based naming

## Usage Instructions

### Opening the Camera
1. Click the camera button in the input area, OR
2. Use the keyboard shortcut **Ctrl/Cmd + C**

### Taking Photos
1. Ensure camera is in "Photo" mode (default)
2. Click "Take Photo" button
3. Photo will be captured and displayed in preview
4. Photo reference is automatically added to the prompt
5. Send the message to include the photo

### Recording Videos
1. Switch to "Video" mode using the mode switch button
2. Click "Start Recording" to begin
3. Recording timer will show duration
4. Click "Stop Recording" to finish
5. Video reference is automatically added to the prompt
6. Send the message to include the video

### Camera Controls
- **Mode Switch**: Toggle between Photo and Video modes
- **Capture Button**: Take photo or start/stop video recording
- **Close Button**: Close camera interface
- **Live Preview**: See what the camera sees in real-time

## Browser Compatibility

### Supported Browsers
- Chrome/Chromium (recommended)
- Firefox
- Safari (limited support)
- Edge

### Requirements
- HTTPS connection (required for camera access)
- Camera permissions granted
- Modern browser with MediaDevices API support
- Device with camera hardware

## Technical Implementation

### MediaDevices API
- Uses `navigator.mediaDevices.getUserMedia()`
- Prefers back camera (`facingMode: 'environment'`)
- Supports both video and audio streams
- Automatic fallback handling

### Photo Capture
- Canvas-based image capture
- JPEG format with 80% quality
- Automatic resizing and optimization
- Base64 data URL storage

### Video Recording
- MediaRecorder API integration
- MP4 format support
- Configurable quality settings
- Automatic file naming

### State Management
- `isCameraActive`: Camera interface visibility
- `cameraStream`: Active media stream
- `cameraMode`: Current mode (photo/video)
- `isVideoRecording`: Video recording status
- `recordingTime`: Video recording duration
- `capturedMedia`: Latest captured media

## Security & Privacy

### Permissions
- Camera access requires user permission
- Audio recording requires separate permission
- Permissions are requested only when needed

### Data Handling
- Media is processed locally
- No media data is stored on servers
- Only file references are sent in messages
- Automatic cleanup on component unmount

### Privacy Features
- Camera stream stops when interface is closed
- Automatic permission cleanup
- No persistent media storage
- User control over camera access

## Error Handling

### Common Issues

#### "Failed to access camera"
- **Solution**: Check camera permissions in browser
- **Alternative**: Refresh page and try again

#### "Camera not supported"
- **Solution**: Use a supported browser
- **Alternative**: Use file upload instead

#### "Permission denied"
- **Solution**: Allow camera access in browser settings
- **Alternative**: Check browser privacy settings

#### "No camera found"
- **Solution**: Ensure device has camera hardware
- **Alternative**: Use external camera if available

### Error Recovery
- Automatic permission re-request
- Graceful fallback to file upload
- User-friendly error messages
- Automatic cleanup on errors

## Settings & Customization

### Keyboard Shortcuts
- Camera shortcut: **Ctrl/Cmd + C**
- Customizable in Settings → Hotkeys
- Can be changed to preferred key combination

### Camera Preferences
- Back camera preference (mobile devices)
- Audio recording toggle
- Quality settings (future enhancement)
- Format preferences (future enhancement)

## Future Enhancements

### Planned Features
- **Multiple Camera Support**: Switch between front/back cameras
- **Flash Control**: Camera flash on/off
- **Zoom Controls**: Digital zoom functionality
- **Filters**: Real-time photo/video filters
- **Grid Overlay**: Composition guides

### Advanced Features
- **Burst Mode**: Multiple rapid photos
- **Time-lapse**: Automated photo sequences
- **HDR Support**: High dynamic range capture
- **Portrait Mode**: Background blur effects
- **Night Mode**: Low-light optimization

### Integration Features
- **AI Analysis**: Automatic image/video analysis
- **OCR Integration**: Text extraction from images
- **Object Recognition**: Identify objects in media
- **Face Detection**: Automatic face detection
- **Quality Assessment**: Image quality scoring

## Performance Considerations

### Optimization
- Automatic image compression
- Efficient video encoding
- Memory management
- Stream cleanup

### Mobile Optimization
- Touch-friendly controls
- Responsive interface
- Battery usage optimization
- Network efficiency

## Troubleshooting Guide

### Camera Not Working
1. Check browser permissions
2. Ensure HTTPS connection
3. Verify camera hardware
4. Try different browser

### Poor Quality
1. Check camera settings
2. Ensure good lighting
3. Clean camera lens
4. Check device capabilities

### Recording Issues
1. Check audio permissions
2. Verify storage space
3. Check device performance
4. Restart browser

### Permission Issues
1. Clear browser permissions
2. Check privacy settings
3. Allow camera access
4. Refresh page

## Code Structure

### Key Functions
- `initializeCamera()`: Sets up camera access
- `stopCamera()`: Cleans up camera resources
- `capturePhoto()`: Captures and processes photos
- `startVideoRecording()`: Begins video recording
- `stopVideoRecording()`: Stops and processes video
- `toggleCamera()`: Opens/closes camera interface

### Components
- Camera button in input area
- Camera interface with preview
- Capture controls
- Media preview
- Error handling

### Event Handlers
- Camera permission requests
- Stream management
- Recording controls
- Cleanup operations

---

*Last Updated: December 2024* 