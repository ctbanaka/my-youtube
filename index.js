const express = require('express');
const app = express();



app.get('/watch', (req, res) => {
  const videoId = req.query.id;
const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  res.render('video', { videoUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
