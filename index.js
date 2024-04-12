const express = require('express');
const app = express();



app.get('/watch', (req, res) => {
  const videoUrl = req.query.url;
  res.render('video', { videoUrl });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
