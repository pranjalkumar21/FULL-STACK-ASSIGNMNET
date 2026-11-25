const express = require('express');
const app = express();
app.use(express.json());
let products = [
  { id: 1, name: 'Keyboard', price: 799, description: 'USB keyboard' },
  { id: 2, name: 'Mouse', price: 399, description: 'Wireless mouse' }
];
let nextId = 3;
app.get('/products', (req, res) => res.json(products));
app.get('/products/:id', (req, res) => {
  const item = products.find(p => p.id === Number(req.params.id));
  item ? res.json(item) : res.status(404).json({ error: 'Product not found' });
});
app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  if (!name || price == null || !description) return res.status(400).json({ error: 'name, price and description are required' });
  const item = { id: nextId++, name, price: Number(price), description };
  products.push(item); res.status(201).json(item);
});
app.put('/products/:id', (req, res) => {
  const item = products.find(p => p.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Product not found' });
  const { name, price, description } = req.body;
  if (name !== undefined) item.name = name;
  if (price !== undefined) item.price = Number(price);
  if (description !== undefined) item.description = description;
  res.json(item);
});
app.delete('/products/:id', (req, res) => {
  const oldLength = products.length;
  products = products.filter(p => p.id !== Number(req.params.id));
  oldLength === products.length ? res.status(404).json({ error: 'Product not found' }) : res.json({ message: 'Product deleted' });
});
app.listen(3000, () => console.log('CRUD API: http://localhost:3000/products'));
