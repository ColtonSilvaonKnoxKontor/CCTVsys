const cors = require('cors');
const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files (HLS video files)
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Setup RTSP to HLS conversion and serve `.ts` files and the `.m3u8` playlist
const convertToHLS = (rtspUrl, outputPath) => {
  return new Promise((resolve, reject) => {
    ffmpeg(rtspUrl)
      .outputOptions([
        '-f hls', // HLS format
        '-hls_time 10', // Segment duration in seconds
        '-hls_list_size 10', // Only keep the latest 10 segments
        '-hls_flags delete_segments', // Delete old segments automatically
        '-hls_segment_filename', `${outputPath}/%03d.ts`, // Segment naming convention
        '-strict -2', // Allow experimental codecs
      ])
      .output(`${outputPath}/playlist.m3u8`) // HLS playlist
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .run();
  });
};

// RTSP Stream URLs
const rtspStream1 = 'rtsp://192.168.100.33/live/ch00_0';
const rtspStream2 = 'rtsp://192.168.100.32/live/ch00_0';

// Ensure the directories exist
if (!fs.existsSync('./public/videos')) {
  fs.mkdirSync('./public/videos');
}

// Convert the streams to HLS format
Promise.all([
  convertToHLS(rtspStream1, './public/videos/camera1'),
  convertToHLS(rtspStream2, './public/videos/camera2'),
])
  .then(() => console.log('Streams are being converted to HLS.'))
  .catch((err) => console.error('Error converting streams:', err));

// Serve the webpage to view the cameras
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve changelog.html when accessing the /changelog path
app.get('/changelog', (req, res) => {
  res.sendFile(path.join(__dirname, 'changelog.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

