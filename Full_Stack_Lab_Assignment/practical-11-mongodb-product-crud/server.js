require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const Product = mongoose.model('Product', new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true }
}, { timestamps: true }));
app.get('/products', async (req, res) => res.json(await Product.find()));
app.get('/products/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid product id' });
  const product = await Product.findById(req.params.id);
  product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
});
app.post('/products', async (req, res) => {
  try { const product = await Product.create(req.body); res.status(201).json(product); }
  catch (e) { res.status(400).json({ error: e.message }); }
});
app.put('/products/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid product id' });
  try { const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    product ? res.json(product) : res.status(404).json({ error: 'Product not found' });
  } catch (e) { res.status(400).json({ error: e.message }); }
});
app.delete('/products/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid product id' });
  const product = await Product.findByIdAndDelete(req.params.id);
  product ? res.json({ message: 'Deleted', product }) : res.status(404).json({ error: 'Product not found' });
});
mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(process.env.PORT || 3000, () => console.log('MongoDB CRUD server running'));
}).catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1); });
