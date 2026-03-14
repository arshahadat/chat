
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Mail, 
  Phone, Layout, PenTool, Image as ImageIcon, MousePointer2, 
  Target, FileText, ChevronRight, Send, Sparkles,
  ArrowRight, Upload, Paperclip
} from 'lucide-react';
import { PROJECTS, LOGO_DESIGNS, EXPERIENCES, SKILLS } from './constants';
import { Project, Experience, Skill } from './types';
import { GoogleGenAI } from '@google/genai';

// --- Utility ---
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Offset for fixed navbar
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else if (id === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Works', id: 'works' },
    { name: 'Logos', id: 'logos' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => scrollToSection('home')} className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-left">
          <div className="w-8 h-8 accent-gradient rounded-lg flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
          <span>DESIGN<span className="accent-text">PORT</span></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => scrollToSection('contact')} 
            className="px-5 py-2.5 rounded-full accent-gradient text-white text-sm font-semibold shadow-lg shadow-cyan-900/20 hover:scale-105 transition-transform"
          >
            Let's Talk
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-100" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)} 
              className="text-lg font-medium text-slate-300 text-left"
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')} 
            className="w-full py-3 rounded-xl accent-gradient text-white font-bold mt-2"
          >
            Let's Talk
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [profilePic, setProfilePic] = useState<string>('https://picsum.photos/800/800?random=100');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-cyan-400 text-xs font-bold tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for new projects
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-none">
            Transforming Ideas into <span className="accent-text">Visual Reality</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
            I'm a multi-disciplinary designer specializing in high-impact visual systems, 
            premium branding, and user-centric digital experiences.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => scrollToSection('works')} 
              className="px-8 py-4 rounded-xl bg-white text-slate-950 font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors"
            >
              View Portfolio <ArrowRight size={18} />
            </button>
            <button 
              onClick={() => scrollToSection('logos')} 
              className="px-8 py-4 rounded-xl border border-slate-800 text-slate-100 font-bold hover:bg-slate-900 transition-colors"
            >
              Logo Designs
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div 
            className="aspect-square rounded-[2rem] bg-slate-900 border border-slate-800 overflow-hidden relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <img 
              src={profilePic} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
            />
            <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <div className="p-4 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center gap-2">
                 <Upload size={20} />
                 <span className="font-bold text-sm">Change Photo</span>
               </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              className="hidden" 
              accept="image/*"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
            
            {/* Decorative stats */}
            <div className="absolute bottom-6 left-6 p-4 rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 flex items-center gap-4 animate-bounce">
               <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                 <Target size={20} />
               </div>
               <div>
                 <div className="text-lg font-bold">120+</div>
                 <div className="text-xs text-slate-400 uppercase tracking-wider text-left">Projects Completed</div>
               </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-dashed border-slate-700 rounded-full animate-spin-slow pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiBio, setAiBio] = useState<string | null>(null);

  const generateAIBio = async () => {
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Write a short, punchy, professional 3-sentence designer bio for a portfolio. Mention expertise in branding, UI/UX, and creative problem solving. Keep it modern and bold."
      });
      setAiBio(response.text || "Visionary designer crafting seamless digital interfaces and iconic brand identities. Bridging the gap between aesthetic excellence and strategic functional design. Dedicated to elevating brands through intentional creative storytelling.");
    } catch (err) {
      console.error(err);
      setAiBio("Visionary designer crafting seamless digital interfaces and iconic brand identities. Bridging the gap between aesthetic excellence and strategic functional design. Dedicated to elevating brands through intentional creative storytelling.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <section id="about" className="py-24 bg-slate-900/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-6">About the <span className="accent-text">Vision</span></h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                With over 7 years of experience in the creative industry, I've learned that great design isn't just about how it looks, but how it works and feels.
              </p>
              <p>
                I thrive at the intersection of strategy and art. Whether it's crafting a pixel-perfect mobile interface or building a comprehensive brand ecosystem, my goal is always to create meaningful connections through design.
              </p>
              
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 relative">
                <button 
                  onClick={generateAIBio}
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full accent-gradient flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform"
                  title="Generate AI Intro"
                >
                  <Sparkles size={20} />
                </button>
                <div className="text-slate-100 italic">
                  {isAiLoading ? 'AI is thinking...' : (aiBio || "Click the magic icon to see my AI-generated mission statement.")}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8 text-left">
            <h3 className="text-2xl font-bold">The <span className="text-cyan-400">Journey</span></h3>
            <div className="space-y-8">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="relative pl-8 border-l border-slate-800 group">
                  <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors"></div>
                  <div className="text-sm text-cyan-500 font-bold mb-1 uppercase tracking-widest">{exp.period}</div>
                  <h4 className="text-xl font-bold text-slate-100">{exp.role}</h4>
                  <div className="text-slate-400 font-medium mb-2">{exp.company}</div>
                  <p className="text-slate-500">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="works" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured <span className="accent-text">Works</span></h2>
            <p className="text-slate-400 max-w-xl">A selection of my best work across UI/UX, print, and digital design.</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-full bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700">All</button>
            <button className="px-6 py-2 rounded-full text-slate-500 hover:text-white transition-colors">UI/UX</button>
            <button className="px-6 py-2 rounded-full text-slate-500 hover:text-white transition-colors">Digital</button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 border border-slate-800 h-[500px]">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent p-10 flex flex-col justify-end text-left">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-2">{project.category}</div>
                  <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                  <p className="text-slate-400 max-w-md mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{project.description}</p>
                  <button className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 hover:scale-110">
                    <ArrowRight size={24} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Logos = () => {
  return (
    <section id="logos" className="py-24 bg-slate-900/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Logo <span className="accent-text">Laboratory</span></h2>
          <p className="text-slate-400">Distilling complex brand values into simple, memorable icons that stand the test of time.</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LOGO_DESIGNS.map((logo) => (
            <div key={logo.id} className="aspect-square bg-slate-900 rounded-3xl border border-slate-800 p-8 flex flex-col items-center justify-center group hover:bg-slate-800/50 transition-all">
              <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <img 
                  src={logo.imageUrl} 
                  alt={logo.title} 
                  className="w-full h-full object-cover grayscale brightness-125 group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h4 className="font-bold text-slate-200">{logo.title}</h4>
              <p className="text-xs text-slate-500 uppercase mt-1 tracking-widest">{logo.category}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <button onClick={() => scrollToSection('works')} className="inline-flex items-center gap-2 text-cyan-400 font-bold hover:underline">
            View full identity showcase <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layout': return <Layout />;
      case 'PenTool': return <PenTool />;
      case 'Image': return <ImageIcon />;
      case 'MousePointer2': return <MousePointer2 />;
      case 'Target': return <Target />;
      case 'FileText': return <FileText />;
      default: return <Sparkles />;
    }
  };

  return (
    <section id="skills" className="py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-6">Expertise & <span className="accent-text">Toolkit</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              I leverage the industry's most powerful tools to bring creative visions to life. From pixel-perfect layouts to hand-crafted illustrations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-1">07+</div>
                <div className="text-slate-500 text-sm uppercase font-bold tracking-widest text-left">Years Experience</div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-1">98%</div>
                <div className="text-slate-500 text-sm uppercase font-bold tracking-widest text-left">Happy Clients</div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="group text-left">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                      {getIcon(skill.icon)}
                    </div>
                    <span className="font-bold text-slate-200">{skill.name}</span>
                  </div>
                  <span className="text-slate-500 font-mono">{skill.level}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full accent-gradient transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/arshahadat46@gmail.com", {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setFileName('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900/50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          <div className="text-left">
            <h2 className="text-4xl font-bold mb-6">Let's Create <span className="accent-text">Together</span></h2>
            <p className="text-slate-400 text-lg mb-12">
              Have a project in mind or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas or partnerships.
            </p>
            
            <div className="space-y-8">
              <a href="mailto:arshahadat46@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase font-bold tracking-widest">Email Me</div>
                  <div className="text-xl font-bold group-hover:text-cyan-400 transition-colors">arshahadat46@gmail.com</div>
                </div>
              </a>
              
              <a href="tel:01732393962" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase font-bold tracking-widest">Call Me</div>
                  <div className="text-xl font-bold group-hover:text-cyan-400 transition-colors">01732393962</div>
                </div>
              </a>
            </div>

            <div className="mt-12 p-6 rounded-2xl bg-slate-900/50 border border-cyan-900/30">
               <p className="text-slate-300 text-sm mb-2 font-bold">📂 ফাইল আপলোডের নিয়ম:</p>
               <p className="text-slate-500 text-xs leading-relaxed">
                 আপনি চাইলে আপনার প্রজেক্ট ব্রিফ বা সিভি অ্যাটাচ করতে পারেন। এটি সরাসরি <strong>arshahadat46@gmail.com</strong> ইমেইলে চলে যাবে।
               </p>
            </div>
          </div>
          
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl text-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Message</label>
                <textarea 
                  rows={4} 
                  name="message"
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* File Attachment Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest block">Attachment (Brief/CV)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    name="upload"
                    id="file-upload"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                    className="hidden"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="flex items-center gap-3 w-full bg-slate-950 border border-dashed border-slate-700 rounded-xl px-6 py-4 text-slate-400 cursor-pointer hover:border-cyan-500 transition-colors"
                  >
                    <Paperclip size={20} className="text-cyan-400" />
                    <span className="truncate">{fileName || 'Click to upload a file...'}</span>
                  </label>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  status === 'success' ? 'bg-green-500 text-white' : 
                  status === 'error' ? 'bg-red-500 text-white' :
                  'accent-gradient text-white hover:scale-[1.02] shadow-xl shadow-cyan-900/20'
                }`}
              >
                {status === 'idle' && (
                  <>Send Message <Send size={20} /></>
                )}
                {status === 'sending' && (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                )}
                {status === 'success' && (
                  <>Sent with Attachment! ✨</>
                )}
                {status === 'error' && (
                  <>Upload Failed. Try again.</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <button onClick={() => scrollToSection('home')} className="text-2xl font-bold tracking-tighter text-left">
          DESIGN<span className="accent-text">PORT</span>
        </button>
        
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} DesignPort. All rights reserved.
        </div>
        
        <div className="flex gap-8">
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Privacy</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Terms</a>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

// --- App Root ---

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Logos />
        <Skills />
        <Contact />
      </main>
      <Footer />
      
      {/* Scroll to Top helper */}
      <button 
        onClick={() => scrollToSection('home')}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500 transition-all z-40 shadow-xl"
      >
        <ChevronRight size={24} className="-rotate-90" />
      </button>
    </div>
  );
}
