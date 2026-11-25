const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
let products = [
 {id:1,name:'Classic Backpack',price:1299,description:'Everyday backpack',stock:10},
 {id:2,name:'Wireless Headphones',price:2499,description:'Comfortable wireless sound',stock:8},
 {id:3,name:'Smart Watch',price:3999,description:'Fitness and notifications',stock:5}
];
let orders = [];
app.get('/api/products',(req,res)=>res.json(products));
app.post('/api/orders',(req,res)=>{
 const {items,customer}=req.body;
 if(!Array.isArray(items)||!items.length||!customer?.name) return res.status(400).json({error:'Customer and cart items are required'});
 const orderItems=[];
 for(const item of items){
  const p=products.find(x=>x.id===Number(item.id));
  const qty=Math.max(1,Number(item.quantity)||1);
  if(!p||p.stock<qty)return res.status(400).json({error:`Unavailable stock for ${p?.name||'product'}`});
  orderItems.push({id:p.id,name:p.name,price:p.price,quantity:qty});
 }
 orderItems.forEach(i=>products.find(p=>p.id===i.id).stock-=i.quantity);
 const order={id:Date.now(),customer:customer.name,items:orderItems,total:orderItems.reduce((s,i)=>s+i.price*i.quantity,0),status:'Paid (demo checkout)',createdAt:new Date().toISOString()};
 orders.push(order);res.status(201).json(order);
});
app.get('/api/orders',(req,res)=>res.json(orders));
app.post('/api/seller/products',(req,res)=>{
 const {name,price,description,stock}=req.body;
 if(!name||Number(price)<=0)return res.status(400).json({error:'Valid name and price are required'});
 const p={id:Math.max(0,...products.map(x=>x.id))+1,name,price:Number(price),description:description||'',stock:Number(stock)||0};
 products.push(p);res.status(201).json(p);
});
app.put('/api/seller/products/:id',(req,res)=>{
 const p=products.find(x=>x.id===Number(req.params.id));if(!p)return res.status(404).json({error:'Not found'});
 Object.assign(p,req.body);if(req.body.price!==undefined)p.price=Number(req.body.price);res.json(p);
});
app.listen(3000,()=>console.log('E-commerce demo at http://localhost:3000'));
