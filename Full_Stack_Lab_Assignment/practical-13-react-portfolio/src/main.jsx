import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
function App(){
 const projects=[
  {title:'To-Do App',description:'A simple task manager built with HTML, CSS and JavaScript.'},
  {title:'University Finder',description:'Search universities by country using a public API.'},
  {title:'Product API',description:'A small Express API with product information.'}
 ];
 return <><header><a className="logo" href="#home">MyPortfolio</a><nav><a href="#about">About</a><a href="#skills">Skills</a><a href="#projects">Projects</a><a href="#contact">Contact</a></nav></header>
 <main id="home"><section className="hero"><p className="eyebrow">HELLO, I'M</p><h1>Your Name</h1><h2>Full Stack Developer in Progress</h2><p>I enjoy learning web development and building useful, user-friendly applications.</p><a className="btn" href="#projects">View My Work</a></section>
 <section id="about"><h2>About Me</h2><p>I am a student learning frontend and backend development. I like solving problems and turning ideas into working websites.</p></section>
 <section id="skills"><h2>Skills</h2><div className="tags">{['HTML','CSS','JavaScript','React','Node.js','Express','MongoDB'].map(s=><span key={s}>{s}</span>)}</div></section>
 <section id="projects"><h2>My Projects</h2><div className="projects">{projects.map(p=><article key={p.title}><h3>{p.title}</h3><p>{p.description}</p></article>)}</div></section>
 <section id="contact"><h2>Contact</h2><p>Email: your.email@example.com</p><p>GitHub: github.com/yourusername</p></section></main><footer>© {new Date().getFullYear()} Your Name. Built with React.</footer></>;
}
createRoot(document.getElementById('root')).render(<App/>);
