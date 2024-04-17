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
const axios = require('axios');

app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Search query is required');
  }

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 10,
        q: query,
        key: 'AIzaSyCd9BVu9qNedneU41VGNoYGLwfTGal3PXM', // Replace with your actual API key
      },
    });

    const searchResults = response.data.items;
    res.render('search-results', { searchResults });
  } catch (error) {
    console.error('Error fetching YouTube search results:', error);
    res.status(500).send('Internal server error');
  }
});


// Route to watch a video
app.get('/watch/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  if(videoId.length<11){
    return res.status(400).send('Invalid video ID');
  }
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const stream = ytdl(videoUrl, { filter: 'audioandvideo', quality: 'highest' });

  res.render('watch', { videoId });
});

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
