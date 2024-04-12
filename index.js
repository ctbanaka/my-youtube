const express = require('express');
const ytdl = require('ytdl-core');
const path = require('path');

const app = express();

// Set the 'views' directory to contain EJS files
app.set('views', path.join(__dirname, 'views'));
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route to render the search page
app.get('/', (req, res) => {
  res.render('search');
});

// Route to handle search queries
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Search query is required');
  }
  try {
    // Perform YouTube search using query
    // Example: You can use your own logic to fetch YouTube search results
    const searchResults = []; // Mocked search results
    res.render('search-results', { searchResults });
  } catch (error) {
    console.error('Error searching YouTube:', error);
    res.status(500).send('Internal server error');
  }
});

// Route to watch a video
app.get('/watch/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const stream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highest' });

  res.render('watch', { stream });
});

// Route to play the video stream
app.get('/play/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const stream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highest' });

  // Set response headers
  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', `attachment; filename="${videoId}.mp4"`);

  // Stream the video to the client
  stream.pipe(res);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
