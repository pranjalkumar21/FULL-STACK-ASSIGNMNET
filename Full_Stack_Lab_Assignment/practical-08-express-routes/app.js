const express = require('express');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let messages = [];
app.get('/', (req, res) => res.render('home', { messages }));
app.get('/about', (req, res) => res.send('<h1>About</h1><p>Express routing practical.</p><a href="/">Home</a>'));
app.get('/contact', (req, res) => res.send('<h1>Contact</h1><p>Contact page</p><a href="/">Home</a>'));
app.get('/users', (req, res) => res.json([{ id: 1, name: 'Aarav' }, { id: 2, name: 'Priya' }]));
app.post('/message', (req, res) => {
  const message = (req.body.message || '').trim();
  if (!message) return res.status(400).send('Message is required.');
  messages.push(message);
  res.redirect('/');
});
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
