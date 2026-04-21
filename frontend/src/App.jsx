import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Cpu,
  Layers,
  Play,
  CheckCircle2,
  Github,
  Mail,
  Twitter,
  ChevronRight,
  Loader2,
  Terminal,
  Code2,
  Database,
  Globe,
  Sparkles,
  Activity,
  ShieldCheck,
  Rocket,
  AlertTriangle,
  UserCheck,
  BrainCircuit,
  Share2,
  RefreshCw,
  ThumbsUp,
  Box,
  HardDrive,
  CpuIcon,
  Server,
  Lock,
  Search,
  Settings,
  XCircle,
  MessageSquare,
  ArrowRight,
  Menu,
  X,
  LayoutDashboard,
  Bot,
  Link as LinkIcon,
  Shield,
  Info,
  Users,
  Code,
  Printer,
  FileText,
  Download,
  Mic,
  Volume2,
  ShieldAlert,
  Unplug,
  Component,
  Command,
  Eye,
  ActivitySquare
} from 'lucide-react';

import logo from './assets/logo.webp';
import boyImg from './assets/boy.png';
import girlImg from './assets/girl.png';
import NeuralGateway from './components/NeuralGateway';

// --- Custom Router Logic ---

const useAppRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return { currentPath, navigate };
};

const CustomNavLink = ({ to, children, navigate, currentPath, className, activeClass }) => {
  const isActive = currentPath === to;
  return (
    <button
      onClick={() => navigate(to)}
      className={`${className} ${isActive ? activeClass : ''}`}
    >
      {children}
    </button>
  );
};

// --- UI Components ---

const StatusBadge = ({ status, type }) => {
  const styles = {
    complete: "bg-green-500/10 text-green-400 border-green-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse",
    waiting: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    process: "bg-primary/10 text-primary border-primary/20",
    hitl: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  };

  const displayLabel = type === 'hitl' ? 'Approval' : status;

  return (
    <span className={`text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-tighter ${styles[status] || styles[type] || styles.waiting}`}>
      {displayLabel}
    </span>
  );
};

const Navbar = ({ onMenuClick, navigate, currentPath }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-8 md:py-6 backdrop-blur-xl bg-dark/40 border-b border-white/5 no-print">
    <div className="max-w-[1600px] mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
        <div className="relative group">
          <div className="w-12 h-12 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,242,254,0.2)] border border-white/10 overflow-hidden">
            <img
              src={logo}
              alt="AutoFlow AI Logo"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="absolute -inset-1 bg-primary/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-primary to-white bg-clip-text text-transparent block leading-none">
            AUTOFLOW AI
          </span>
          <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.4em] hidden sm:block mt-1">v11.0 Elite Mesh</span>
        </div>
      </div>

      <div className="hidden lg:flex gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
        <CustomNavLink to="/" navigate={navigate} currentPath={currentPath} className="transition-colors flex items-center gap-2" activeClass="text-primary">
          <LayoutDashboard size={14} /> Dashboard
        </CustomNavLink>
        <CustomNavLink to="/fleet" navigate={navigate} currentPath={currentPath} className="transition-colors flex items-center gap-2" activeClass="text-primary">
          <Bot size={14} /> Fleet Mesh
        </CustomNavLink>
        <CustomNavLink to="/about" navigate={navigate} currentPath={currentPath} className="transition-colors flex items-center gap-2" activeClass="text-primary">
          <Info size={14} /> Mission
        </CustomNavLink>
        <CustomNavLink to="/architecture" navigate={navigate} currentPath={currentPath} className="transition-colors flex items-center gap-2" activeClass="text-primary">
          <Layers size={14} /> Architecture
        </CustomNavLink>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex flex-col items-end mr-4">
          <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Neural Link Online</span>
          <span className="text-[10px] text-gray-500 font-mono">LATENCY: 4ms</span>
        </div>
        <button onClick={() => navigate('/about')} className="hidden sm:block px-6 py-3 rounded-xl glow-btn text-dark font-black text-xs uppercase tracking-widest active:scale-95 transition-transform">
          Team Portal
        </button>
        <button onClick={onMenuClick} className="lg:hidden p-2 bg-white/5 rounded-xl border border-white/10">
          <Menu size={24} />
        </button>
      </div>
    </div>
  </nav>
);

const Sidebar = ({ navigate, currentPath }) => (
  <div className="hidden lg:flex flex-col w-20 xl:w-64 fixed left-0 top-[88px] bottom-0 border-r border-white/5 bg-dark/40 backdrop-blur-xl p-4 gap-8 z-40 transition-all no-print">
    <div className="flex flex-col gap-2">
      {[
        { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
        { icon: <Bot size={20} />, label: "Fleet Control", path: "/fleet" },
        { icon: <Server size={20} />, label: "MCP Hub", path: "/mcp" },
        { icon: <ShieldAlert size={20} />, label: "Security Audit", path: "/security" },
        { icon: <Layers size={20} />, label: "Architecture", path: "/architecture" },
        { icon: <Users size={20} />, label: "Mission", path: "/about" },
        { icon: <Settings size={20} />, label: "Advanced Config", path: "/settings" }
      ].map((item, i) => (
        <CustomNavLink
          key={i}
          to={item.path}
          navigate={navigate}
          currentPath={currentPath}
          className="flex items-center gap-4 p-3.5 rounded-xl transition-all text-gray-500 hover:bg-white/5 hover:text-white"
          activeClass="bg-primary/10 text-primary border border-primary/20"
        >
          <span className="shrink-0">{item.icon}</span>
          <span className="text-xs font-black uppercase tracking-widest hidden xl:block">{item.label}</span>
        </CustomNavLink>
      ))}
    </div>

    <div className="mt-auto space-y-6">
      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hidden xl:block">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Core Health</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className="space-y-3">
          {['Whisper-V3', 'GitHub-V4', 'MCP-Mesh', 'Sentinal'].map((tool) => (
            <div key={tool} className="flex items-center justify-between text-[10px] font-mono text-gray-400">
              <span>{tool}</span>
              <span className="text-primary/70">SYNCED</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileNav = ({ isOpen, setIsOpen, navigate, currentPath }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[60] bg-dark/95 backdrop-blur-2xl flex flex-col p-8 lg:hidden no-print"
      >
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-tr from-primary to-accent rounded-xl flex items-center justify-center">
              <BrainCircuit className="text-dark" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter">AUTOFLOW</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-lg">
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {[
            { label: 'Dashboard', path: '/' },
            { label: 'Fleet Mesh', path: '/fleet' },
            { label: 'MCP Hub', path: '/mcp' },
            { label: 'Security', path: '/security' },
            { label: 'Architecture', path: '/architecture' },
            { label: 'Mission', path: '/about' },
            { label: 'Settings', path: '/settings' }
          ].map((item) => (
            <CustomNavLink
              key={item.label}
              to={item.path}
              navigate={navigate}
              currentPath={currentPath}
              className="text-2xl font-black uppercase tracking-widest text-gray-500 text-left"
              activeClass="text-primary"
            >
              <span onClick={() => setIsOpen(false)}>{item.label}</span>
            </CustomNavLink>
          ))}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Page Components ---

const Hero = () => {
  const scrollToDemo = () => {
    const el = document.getElementById('demo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-40 pb-20 px-4 lg:px-8 xl:ml-64 lg:ml-20 overflow-hidden no-print">
      <div className="max-w-[1400px] mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Sparkles size={14} className="text-primary" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Next-Gen Autonomous Orchestration</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
            The Future is <br />
            <span className="text-gradient">Autonomous</span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mb-12 uppercase tracking-wide leading-relaxed">
            Orchestrate complex multi-agent swarms with Nexus-v11.0.
            Bridge the gap between raw compute and strategic execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={scrollToDemo}
              className="px-10 py-5 rounded-2xl glow-btn text-dark font-black uppercase tracking-widest text-sm transition-transform active:scale-95"
            >
              Initialize Fleet
            </button>
            <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
              View Protocol
            </button>
          </div>
        </motion.div>

        {/* Background Decor */}
        <div className="absolute top-0 right-0 -z-10 opacity-20 hidden xl:block">
          <div className="relative w-[600px] h-[600px]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[40px] border-primary/10 rounded-full border-t-primary/40 border-l-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-20 border-[20px] border-accent/10 rounded-full border-r-accent/40 border-b-accent/30"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutUs = ({ voiceEnabled }) => {
  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis && voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female'));
      if (preferredVoice) utterance.voice = preferredVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const team = [
    {
      name: "Krishna Patil Rajput (Leader)",
      role: "SYSTEM ARCHITECT & LEAD",
      image: boyImg,
      icon: <Code size={32} className="text-primary" />,
      desc: "Architected the multi-agent orchestration engine, custom routing, and high-fidelity dashboard UI.",
      github: "github.com/krishna67890",
      speech: "Krishna Patil Rajput. Leader and System Architect. He architected the multi-agent orchestration engine and high-fidelity dashboard UI."
    },
    {
      name: "Krishna Premshankar Kanojiya",
      role: "CORE DEVELOPER",
      image: boyImg,
      icon: <BrainCircuit size={32} className="text-primary" />,
      desc: "Expert in autonomous agent logic and backend integration systems.",
      email: "krishna12082006@gmail.com",
      speech: "Krishna Premshankar Kanojiya. Core Developer. Expert in autonomous agent logic and backend integration systems."
    },
    {
      name: "Hima Krishna Priya",
      role: "STRATEGIC PLANNER",
      image: girlImg,
      icon: <Layers size={32} className="text-accent" />,
      desc: "Designed the technical strategy, visual presentations, and mission-control logic for winning Nexus 2.0.",
      email: "yadlahimakrishnapriya@gmail.com",
      speech: "Hima Krishna Priya. Strategic Planner. She designed the technical strategy and mission-control logic for the Nexus 2 point 0 hackathon."
    }
  ];

  return (
    <div className="py-32 px-4 lg:px-8 xl:ml-64 lg:ml-20 min-h-screen no-print">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-black uppercase tracking-tighter mb-6 bg-gradient-to-r from-primary via-white to-accent bg-clip-text text-transparent">
            The Architects of Autonomy
          </h1>
          <p className="text-xl text-gray-500 uppercase tracking-widest font-black">
            Nexus 2.0 Hackathon Core Team
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => speak(member.speech)}
              className="glass-card p-10 relative overflow-hidden group hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="mb-6 flex justify-between items-start">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-white/10 group-hover:border-primary/50 transition-all shadow-xl"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-dark border border-white/10 p-1.5 rounded-lg">
                    {member.icon}
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-black uppercase tracking-tight mb-1 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6">
                {member.role}
              </p>

              <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed uppercase tracking-wide">
                {member.desc}
              </p>

              <div className="flex gap-4 pt-6 border-t border-white/5">
                {member.github && (
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Github size={14} className="text-primary" />
                    {member.github}
                  </div>
                )}
                {member.email && (
                  <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <Mail size={14} className="text-accent" />
                    {member.email}
                  </div>
                )}
              </div>
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Share2 size={40} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <div
          className="mt-20 glass-card p-12 text-center border-white/5 cursor-pointer group hover:border-accent/30 transition-all"
          onMouseEnter={() => speak("AutoFlow AI is a high-end orchestration platform that transforms simple AI tasks into autonomous agentic workflows. We handle Security Audits, Market Research, and Code Productivity with zero-dependency reliability.")}
        >
          <div className="flex justify-center mb-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <Volume2 size={20} className="text-accent" />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">What We Do</h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto font-medium mb-8">
            AutoFlow AI is a high-end orchestration platform that transforms simple AI tasks into autonomous agentic workflows.
            We provide a deterministic reasoning engine that handles **Security Audits**, **Market Research**, and **Code Productivity**
            with zero-dependency reliability. Our mission is to bridge the gap between human intent and machine execution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {['Self-Healing Code', 'Strategic Audits', 'MCP Tool Mesh'].map((f) => (
               <div key={f} className="p-4 bg-white/5 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-primary">
                 {f}
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsPage = ({ voiceEnabled, setVoiceEnabled }) => {
  const [autoHeal, setAutoHeal] = useState(true);

  return (
    <div className="py-32 px-4 lg:px-8 xl:ml-64 lg:ml-20 min-h-screen no-print">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-12">System Configuration</h1>

        <div className="space-y-6">
          <div className="glass-card p-8 flex items-center justify-between border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary border border-primary/20">
                <Mic size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Voice Integration</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Whisper-V3 Intent Recognition & TTS</p>
              </div>
            </div>
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-14 h-8 rounded-full p-1 transition-all ${voiceEnabled ? 'bg-primary' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: voiceEnabled ? 24 : 0 }}
                className="w-6 h-6 bg-dark rounded-full shadow-lg"
              />
            </button>
          </div>

          <div className="glass-card p-8 flex items-center justify-between border-white/5">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent border border-accent/20">
                <RefreshCw size={24} />
              </div>
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Autonomous Healing</h3>
                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Automatic build-fix orchestration</p>
              </div>
            </div>
            <button
              onClick={() => setAutoHeal(!autoHeal)}
              className={`w-14 h-8 rounded-full p-1 transition-all ${autoHeal ? 'bg-accent' : 'bg-white/10'}`}
            >
              <motion.div
                animate={{ x: autoHeal ? 24 : 0 }}
                className="w-6 h-6 bg-dark rounded-full shadow-lg"
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="glass-card p-8 border-white/5">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Neural Model</h4>
                <select className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-bold text-primary uppercase">
                   <option>NEXUS-v11-TURBO (Default)</option>
                   <option>SENTINAL-X-SECURE</option>
                   <option>RESEARCHER-PRO-O1</option>
                </select>
             </div>
             <div className="glass-card p-8 border-white/5">
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">API Endpoint</h4>
                <input type="text" value="https://api.autoflow.ai/v1" readOnly className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs font-mono text-gray-400" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AgentNode = ({ data }) => (
  <div className={`px-4 py-2 shadow-md rounded-md bg-dark border-2 transition-all ${data.active ? 'border-primary shadow-[0_0_15px_rgba(0,242,254,0.4)]' : 'border-white/10'}`}>
    <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-primary" />
    <div className="flex items-center">
      <div className={`rounded-full p-2 mr-2 ${data.active ? 'bg-primary/20 text-primary' : 'bg-white/5 text-gray-500'}`}>
        {data.icon}
      </div>
      <div className="ml-2">
        <div className="text-[10px] font-black uppercase text-white">{data.label}</div>
        <div className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter">{data.status}</div>
      </div>
    </div>
    <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-primary" />
  </div>
);

const nodeTypes = { agent: AgentNode };

const Dashboard = ({ initialGoal = '', setInitialGoal, voiceEnabled }) => {
  const [goal, setGoal] = useState(initialGoal);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeLogIdx, setActiveLogIdx] = useState(-1);
  const [showApproval, setShowApproval] = useState(false);
  const [telemetry, setTelemetry] = useState({ cpu: 14, mem: 3.8, lat: 18 });
  const [isListening, setIsListening] = useState(false);
  const streamEndRef = useRef(null);

  // Flow State
  const initialNodes = useMemo(() => [
    { id: '1', type: 'agent', position: { x: 250, y: 0 }, data: { label: 'Orchestrator', status: 'Idle', icon: <Terminal size={14}/>, active: false } },
    { id: '2', type: 'agent', position: { x: 0, y: 150 }, data: { label: 'Research Bot', status: 'Idle', icon: <Search size={14}/>, active: false } },
    { id: '3', type: 'agent', position: { x: 250, y: 150 }, data: { label: 'Code Architect', status: 'Idle', icon: <Code size={14}/>, active: false } },
    { id: '4', type: 'agent', position: { x: 500, y: 150 }, data: { label: 'Security Sentinal', status: 'Idle', icon: <Shield size={14}/>, active: false } },
    { id: '5', type: 'agent', position: { x: 250, y: 300 }, data: { label: 'Deployment Agent', status: 'Idle', icon: <Rocket size={14}/>, active: false } },
  ], []);

  const initialEdges = useMemo(() => [
    { id: 'e1-2', source: '1', target: '2', animated: false, style: { stroke: '#333' } },
    { id: 'e1-3', source: '1', target: '3', animated: false, style: { stroke: '#333' } },
    { id: 'e1-4', source: '1', target: '4', animated: false, style: { stroke: '#333' } },
    { id: 'e2-5', source: '2', target: '5', animated: false, style: { stroke: '#333' } },
    { id: 'e3-5', source: '3', target: '5', animated: false, style: { stroke: '#333' } },
    { id: 'e4-5', source: '4', target: '5', animated: false, style: { stroke: '#333' } },
  ], []);

  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Text-to-Speech Helper
  const speak = (text) => {
    if (typeof window !== 'undefined' && window.speechSynthesis && voiceEnabled) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female'));
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (initialGoal) {
      setGoal(initialGoal);
      runAgent(initialGoal);
      if (setInitialGoal) setInitialGoal('');
    }
  }, [initialGoal]);

  // Speech Recognition Setup
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setGoal(transcript);
        setIsListening(false);
        speak(`Objective received: ${transcript}. Initializing fleet.`);
        runAgent(transcript);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setGoal('');
      recognitionRef.current?.start();
      setIsListening(true);
      speak("System listening. State your command.");
    }
  };

  const advancedSuggestionMatrix = [
    { trigger: "FLEET", label: "INITIALIZE GLOBAL FLEET CONTROL MESH", prompt: "INITIALIZE GLOBAL FLEET CONTROL MESH" },
    { trigger: "MCP", label: "SYNCHRONIZE MCP HUB ACROSS ALL NODES", prompt: "SYNCHRONIZE MCP HUB ACROSS ALL NODES" },
    { trigger: "SECURITY", label: "EXECUTE DEEP SECURITY AUDIT & VULN SCAN", prompt: "EXECUTE DEEP SECURITY AUDIT & VULN SCAN" },
    { trigger: "MARKET", label: "GENERATE STRATEGIC MARKET COMPETITOR AUDIT", prompt: "GENERATE STRATEGIC MARKET COMPETITOR AUDIT" },
    { trigger: "VOICE", label: "START VOICE ORCHESTRATION SESSION (WHISPER)", prompt: "START VOICE ORCHESTRATION SESSION" },
    { trigger: "CODE", label: "EXECUTE FULL CODEBASE SECURITY SCAN & PATCH", prompt: "EXECUTE FULL CODEBASE SECURITY SCAN & PATCH" }
  ];

  useEffect(() => {
    if (goal.trim()) {
      const g = goal.toUpperCase();
      const filtered = advancedSuggestionMatrix.filter(s =>
        s.trigger.includes(g) || s.label.includes(g)
      ).map(s => s.prompt);
      setSuggestions(filtered.length > 0 ? filtered : ["ANALYZE MARKET COMPETITORS", "RUN SECURITY AUDIT"]);
    } else {
      setSuggestions([]);
    }
  }, [goal]);

  useEffect(() => {
    if (streamEndRef.current) {
      streamEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeLogIdx, showApproval]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry(prev => ({
        cpu: Math.max(10, Math.min(95, prev.cpu + (Math.random() * 10 - 5))),
        mem: Math.max(2, Math.min(8, prev.mem + (Math.random() * 0.4 - 0.2))),
        lat: Math.max(4, Math.min(40, prev.lat + (Math.random() * 6 - 3)))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const runAgent = async (inputGoal) => {
    const finalGoal = inputGoal || goal;
    if (!finalGoal.trim()) return;

    setGoal(finalGoal);
    setSuggestions([]);
    setIsLoading(true);
    setResults(null);
    setActiveLogIdx(-1);
    setShowApproval(false);

    // Reset Flow UI
    setNodes(initialNodes);
    setEdges(initialEdges);

    try {
      // Robust URL resolution for both Dev and Production (Hackathon Resilience)
      // Check for Vercel deployment hostname or local
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal ? 'http://127.0.0.1:5000/api/agent' : '/api/agent';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: finalGoal })
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Expected JSON from server but received something else.");
      }

      const data = await response.json();
      setResults(data);

      let currentLog = 0;
      const interval = setInterval(() => {
        if (currentLog < data.steps.length) {
          const step = data.steps[currentLog];
          setActiveLogIdx(currentLog);
          speak(`${step.agent}: ${step.message}`);

          // Update Flow UI based on agent
          setNodes(prev => prev.map(n => {
             const isActive = step.agent.includes(n.data.label) || (n.id === '1' && step.agent === 'Nexus');
             return {
               ...n,
               data: { ...n.data, active: isActive, status: isActive ? 'Processing...' : 'Idle' }
             };
          }));

          setEdges(prev => prev.map(e => {
            const isSourceActive = step.agent.includes(nodes.find(n => n.id === e.source)?.data.label);
            return {
              ...e,
              animated: isSourceActive,
              style: { stroke: isSourceActive ? '#00f2fe' : '#333' }
            };
          }));

          if (step.type === 'hitl') {
            setShowApproval(true);
            speak("Human intervention required to proceed.");
            clearInterval(interval);
          }
          currentLog++;
        } else {
          speak("Mission successfully completed.");
          setNodes(initialNodes);
          setEdges(initialEdges);
          clearInterval(interval);
        }
      }, 3000);

    } catch (err) {
      console.error(err);
      speak("System error encountered during execution.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => {
    setShowApproval(false);
    let currentLog = activeLogIdx + 1;
    const interval = setInterval(() => {
      if (currentLog < results.steps.length) {
        setActiveLogIdx(currentLog);
        currentLog++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <section id="demo" className="py-12 px-4 lg:px-8 xl:ml-64 lg:ml-20 transition-all">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 order-2 lg:order-1 no-print">
             <div className="glass-card p-6 border-primary/20 relative">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                  <Terminal size={16} className="text-primary" /> Command Deck
                </h3>
                <button
                  onClick={toggleListening}
                  className={`p-2 rounded-lg border transition-all ${isListening ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse' : 'bg-white/5 border-white/10 text-gray-500 hover:text-primary hover:border-primary/50'}`}
                >
                  <Mic size={16} />
                </button>
              </div>

              <div className="relative">
                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 bottom-full mb-2 z-50 glass-card bg-[#0a0b14] border-primary/30 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)]"
                    >
                      <div className="p-2 border-b border-white/5 bg-white/5 flex justify-between items-center">
                         <span className="text-[8px] font-black text-primary uppercase tracking-widest">Advanced Suggestions</span>
                      </div>
                      <div className="max-h-[180px] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20">
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => runAgent(s)}
                            className="w-full text-left p-3 hover:bg-primary/10 text-[10px] font-black uppercase tracking-widest text-gray-300 transition-all border-b border-white/5 last:border-0"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <textarea
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="Input objective or use voice..."
                  className="w-full bg-black/60 border border-white/10 rounded-xl p-4 min-h-[120px] focus:border-primary/50 transition-all font-medium text-sm text-white placeholder-gray-600"
                />
              </div>

              <button
                onClick={() => runAgent()}
                disabled={isLoading || !goal.trim()}
                className="w-full mt-4 py-4 rounded-xl font-black text-dark glow-btn uppercase tracking-widest disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="animate-spin" size={18} /> : <><Play size={14} fill="currentColor"/> EXECUTE FLEET</>}
              </button>
            </div>

            <div className="glass-card p-6 border-white/5 space-y-6">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="text-primary" /> Live Telemetry
              </h4>
              <div className="space-y-4">
                {[
                  { label: "Fleet Compute", val: telemetry.cpu, unit: "%" },
                  { label: "Neural Latency", val: telemetry.lat, unit: "ms" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase">
                      <span className="text-gray-500">{stat.label}</span>
                      <span className="text-white">{stat.val.toFixed(0)}{stat.unit}</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${stat.val}%` }} className="h-full bg-primary" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6 order-1 lg:order-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
               {/* Neural Stream Terminal */}
               <div className="glass-card p-6 md:p-8 relative overflow-hidden bg-black/60 flex flex-col print:bg-white print:text-black">
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(0,242,254,0.8)] animate-pulse print:hidden" />
                      <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] print:text-black">Neural Stream: {goal || 'Standby'}</h4>
                    </div>
                    {results && (
                      <button onClick={() => window.print()} className="p-2 bg-white/5 rounded-lg border border-white/10 hover:text-primary transition-all no-print">
                        <Printer size={16} />
                      </button>
                    )}
                  </div>

                  <div className="flex-1 space-y-6 font-mono text-xs overflow-y-auto scrollbar-hide print:max-h-none">
                    <AnimatePresence>
                      {results && results.steps.map((step, i) => (
                        i <= activeLogIdx && (
                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex gap-4">
                            <span className="text-white/10 font-black shrink-0 mt-1">[{i+1}]</span>
                            <div className="space-y-1">
                              <span className="text-[9px] font-black bg-white/5 px-2 py-0.5 rounded border border-white/10 text-primary uppercase print:text-black">{step.agent}</span>
                              <p className={`leading-relaxed ${step.type === 'error' ? 'text-red-400' : 'text-gray-300'} print:text-black`}>
                                {step.message}
                              </p>
                              {step.type === 'hitl' && showApproval && (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 border border-orange-500/30 bg-orange-500/10 rounded-xl no-print">
                                   <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mb-3">Intervention Required</p>
                                   <div className="flex gap-3">
                                      <button onClick={handleApprove} className="px-4 py-2 bg-orange-500 text-dark font-black text-[10px] uppercase rounded-lg hover:bg-orange-400 transition-all">Approve & Deploy</button>
                                      <button onClick={() => { setResults(null); setGoal(''); }} className="px-4 py-2 bg-white/5 text-gray-400 font-black text-[10px] uppercase rounded-lg border border-white/10 hover:bg-white/10 transition-all">Abnormal Terminate</button>
                                   </div>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                    <div ref={streamEndRef} />
                  </div>

                  {activeLogIdx >= (results?.steps.length - 1) && !showApproval && (
                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between no-print">
                      <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest text-primary">
                        <span>RELIAIBLITY: 99.9%</span>
                        <span>LATENCY: 4ms</span>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-black text-[9px] uppercase tracking-widest">
                        <CheckCircle2 size={14} /> SUCCESS
                      </div>
                    </div>
                  )}
               </div>

               {/* Multi-Agent Swarm Visualization */}
               <div className="glass-card relative overflow-hidden bg-black/40 border-white/5 flex flex-col">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Swarm Mesh Visualization</h4>
                    <span className="text-[8px] font-mono text-primary animate-pulse">LIVE NODE LINK</span>
                  </div>
                  <div className="flex-1 w-full h-full relative">
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      nodeTypes={nodeTypes}
                      fitView
                      proOptions={{ hideAttribution: true }}
                      className="bg-transparent"
                    >
                      <Background color="#1a1c2e" gap={20} />
                    </ReactFlow>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = ({ navigate }) => (
  <section className="py-24 px-6 max-w-[1400px] mx-auto xl:ml-64 lg:ml-20 no-print">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[
        { t: "ELITE FLEET", d: "12-Agent Swarm Orchestration", icon: <Bot />, path: '/fleet' },
        { t: "MCP MESH", d: "Universal Context Protocol", icon: <Server />, path: '/mcp' },
        { t: "SENTINAL SCAN", d: "Real-time Security Audit", icon: <ShieldAlert />, path: '/security' },
        { t: "VOICE BRIDGE", d: "Whisper-V3 Command Uplink", icon: <Mic />, path: '/settings' }
      ].map((f, i) => (
        <div
          key={i}
          onClick={() => navigate(f.path)}
          className="glass-card p-10 hover:border-primary/40 transition-all border-white/5 group cursor-pointer active:scale-95"
        >
          <div className="text-primary mb-4">{f.icon}</div>
          <h3 className="text-xs font-black mb-3 uppercase tracking-widest group-hover:text-primary transition-colors">{f.t}</h3>
          <p className="text-gray-500 text-[10px] uppercase tracking-widest leading-relaxed font-bold">{f.d}</p>
        </div>
      ))}
    </div>
  </section>
);

const FleetPage = () => {
  const [agents, setAgents] = useState([
    { name: "Fleet Commander", role: "Planning & Strategy", status: "Active", load: 12 },
    { name: "Source Architect", role: "Code Generation", status: "Standby", load: 0 },
    { name: "Deep Searcher", role: "Real-time Research", status: "Active", load: 45 },
    { name: "Sentinal Audit", role: "Security Scan", status: "Active", load: 8 },
    { name: "Outreach Lead", role: "CRM & Social", status: "Standby", load: 0 },
    { name: "Reflection Engine", role: "QA & Self-Healing", status: "Active", load: 4 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAgents(prev => prev.map(a => ({
        ...a,
        load: a.status === 'Active' ? Math.max(5, Math.min(95, a.load + (Math.random() * 20 - 10))) : 0
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-32 px-4 lg:px-8 xl:ml-64 lg:ml-20 min-h-screen no-print">
      <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">Fleet Control Mesh</h1>
              <p className="text-gray-500 uppercase tracking-widest font-bold text-xs">Active Agent Subsystems: 12 Units Operational</p>
            </div>
            <button className="px-6 py-3 bg-primary/10 border border-primary/20 rounded-xl text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary/20 transition-all">
              Re-Balance Load
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <div key={i} className="glass-card p-8 border-white/5 relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-xl text-gray-400 border border-white/10 group-hover:border-primary/50 group-hover:text-primary transition-all">
                        <Bot size={24} />
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-[9px] font-black uppercase border px-2 py-1 rounded ${agent.status === 'Active' ? 'text-green-500 border-green-500/20' : 'text-gray-500 border-white/10'}`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-black uppercase">{agent.name}</h3>
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mt-1 mb-6">{agent.role}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[8px] font-black uppercase text-gray-500">
                      <span>Neural Load</span>
                      <span>{agent.load.toFixed(0)}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div animate={{ width: `${agent.load}%` }} className={`h-full ${agent.load > 80 ? 'bg-red-500' : 'bg-primary'}`} />
                    </div>
                  </div>

                  <div className="absolute bottom-0 right-0 p-2 opacity-5">
                    <ActivitySquare size={80} />
                  </div>
              </div>
            ))}
          </div>
      </div>
    </div>
  );
};

const McpHub = () => {
  const [syncing, setSyncing] = useState(null);
  const [demoMode, setDemoMode] = useState(false);
  const [logs, setLogs] = useState([
    "INFO: MCP Registry initialized.",
    "INFO: 8 local tools detected."
  ]);
  const tools = ['GitHub', 'Slack', 'PostgreSQL', 'Docker', 'Stripe', 'Tavily', 'ArXiv', 'Terminal'];

  const handleSync = (tool) => {
    setSyncing(tool);
    const newLog = `SYNC: Initializing handshake with ${tool}...`;
    setLogs(prev => [newLog, ...prev].slice(0, 10));
    setTimeout(() => {
      setSyncing(null);
      setLogs(prev => [`SUCCESS: ${tool} protocol synchronized.`, ...prev].slice(0, 10));
    }, 2000);
  };

  useEffect(() => {
    let interval;
    if (demoMode) {
      interval = setInterval(() => {
        const randomTool = tools[Math.floor(Math.random() * tools.length)];
        handleSync(randomTool);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [demoMode]);

  return (
    <div className="py-32 px-4 lg:px-8 xl:ml-64 lg:ml-20 min-h-screen no-print">
      <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">MCP Tool Hub</h1>
              <p className="text-gray-500 uppercase tracking-widest font-bold text-xs">Model Context Protocol Synchronization</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setDemoMode(!demoMode)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${demoMode ? 'bg-accent text-dark shadow-[0_0_20px_rgba(247,37,133,0.4)]' : 'bg-white/5 border border-white/10 text-gray-500'}`}
              >
                {demoMode ? 'Stop Demo Mode' : 'Start Demo Mode'}
              </button>
              <button onClick={() => handleSync('ALL')} className="px-6 py-3 bg-primary text-dark text-[10px] font-black uppercase tracking-widest rounded-xl glow-btn">
                Sync All Tools
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {tools.map((tool) => (
                <div key={tool} className="glass-card p-6 border-white/5 flex flex-col items-center text-center group relative overflow-hidden h-48 justify-center">
                    <div className={`w-14 h-14 rounded-2xl mb-4 flex items-center justify-center border transition-all ${syncing === tool || (syncing === 'ALL') ? 'bg-primary/20 border-primary animate-pulse' : 'bg-white/5 border-white/10 group-hover:border-primary/50'}`}>
                      <Unplug size={28} className={syncing === tool || (syncing === 'ALL') ? 'text-primary' : 'text-gray-500'} />
                    </div>
                    <h3 className="text-xs font-black uppercase mb-1">{tool}</h3>
                    <p className="text-[7px] text-primary font-black uppercase tracking-tighter">
                      {syncing === tool || (syncing === 'ALL') ? 'SYNCING...' : 'CONNECTED'}
                    </p>

                    <button
                      onClick={() => handleSync(tool)}
                      className="mt-4 text-[7px] font-black uppercase tracking-widest text-gray-600 hover:text-primary transition-colors"
                    >
                      Refresh
                    </button>

                    {syncing === tool && (
                      <motion.div
                        layoutId="sync-glow"
                        className="absolute inset-0 bg-primary/5 pointer-events-none"
                      />
                    )}
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
               <div className="glass-card p-6 border-white/5 h-full flex flex-col bg-black/40">
                  <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
                     <Terminal size={14} className="text-primary" />
                     <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live MCP Registry</h3>
                  </div>
                  <div className="flex-1 font-mono text-[9px] space-y-3 overflow-y-auto">
                     {logs.map((log, i) => (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, x: -10 }}
                         animate={{ opacity: 1, x: 0 }}
                         className={`p-2 rounded border border-white/5 ${log.includes('SUCCESS') ? 'text-green-400 bg-green-500/5' : log.includes('SYNC') ? 'text-primary bg-primary/5' : 'text-gray-500'}`}
                       >
                         {log}
                       </motion.div>
                     ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5">
                     <div className="flex justify-between items-center text-[8px] font-black uppercase">
                        <span className="text-gray-600">Active Handshakes</span>
                        <span className="text-primary">{syncing ? 1 : 0}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
      </div>
    </div>
  );
};

const SecurityPage = ({ onTransfer }) => {
  const [risks, setRisks] = useState([
    { id: 1, title: 'XSS injection /auth', severity: 'High', status: 'Detected', pos: { t: '20%', l: '30%' } },
    { id: 2, title: 'Weak JWT secret', severity: 'Medium', status: 'Detected', pos: { t: '60%', l: '70%' } },
    { id: 3, title: 'Open Port 8080', severity: 'Critical', status: 'Detected', pos: { t: '40%', l: '50%' } }
  ]);

  const patchRisk = (id) => {
    setRisks(prev => prev.map(r => r.id === id ? { ...r, status: 'Patching...' } : r));
    setTimeout(() => {
      setRisks(prev => prev.map(r => r.id === id ? { ...r, status: 'Secured' } : r));
    }, 2000);
  };

  const transferAll = () => {
    const unpatched = risks.filter(r => r.status !== 'Secured').map(r => r.title).join(', ');
    if (onTransfer) onTransfer(`ANALYZE AND SECURE RECENT THREATS: ${unpatched}`);
  };

  return (
    <div className="py-32 px-4 lg:px-8 xl:ml-64 lg:ml-20 min-h-screen no-print">
      <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Security Sentinal</h1>
              <p className="text-gray-500 uppercase tracking-widest font-bold text-xs">Deep Vulnerability & Threat Audit</p>
            </div>
            <button
              onClick={transferAll}
              className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500/20 transition-all flex items-center gap-2"
            >
              <Share2 size={14} /> Send Report to AI
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
                <div className="glass-card p-8 border-white/5 mb-6 relative overflow-hidden">
                  <div className="flex justify-between items-center mb-8">
                      <h3 className="text-xl font-black uppercase">Live Threat Map</h3>
                      <div className="flex gap-2 items-center">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[9px] font-black uppercase">{risks.filter(r => r.status !== 'Secured').length} Active Threats</span>
                      </div>
                  </div>
                  <div className="h-96 bg-black/40 rounded-2xl flex flex-col items-center justify-center border border-white/5 relative group overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                         <div className="grid grid-cols-10 h-full w-full">
                            {Array.from({ length: 100 }).map((_, i) => (
                              <div key={i} className="border-[0.5px] border-white/20" />
                            ))}
                         </div>
                      </div>

                      <ShieldAlert size={80} className="text-red-500/20 group-hover:text-red-500/40 transition-all z-10" />

                      {risks.map((risk) => (
                        risk.status !== 'Secured' && (
                          <motion.div
                            key={risk.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ top: risk.pos.t, left: risk.pos.l }}
                            className="absolute cursor-pointer group/pin"
                            onClick={() => onTransfer(`URGENT SECURITY REMEDIATION FOR: ${risk.title}`)}
                          >
                            <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute" />
                            <div className="w-4 h-4 bg-red-600 rounded-full relative border-2 border-white/20" />
                            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap bg-red-600 text-white text-[8px] font-black p-1 rounded">
                               {risk.title}
                            </div>
                          </motion.div>
                        )
                      ))}

                      <div className="mt-6 flex flex-col items-center z-10">
                         <p className="text-[10px] font-mono text-gray-500 uppercase">Scanning Neural Network...</p>
                         <div className="w-48 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                            <motion.div animate={{ x: [-200, 200] }} transition={{ repeat: Infinity, duration: 2.5 }} className="w-20 h-full bg-red-500/50" />
                         </div>
                      </div>
                  </div>
                </div>
            </div>
            <div className="lg:col-span-4">
                <div className="glass-card p-8 border-white/5 h-full">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6">Risk Feed</h3>
                  <div className="space-y-4">
                      {risks.map((risk) => (
                        <div key={risk.id} className={`p-4 rounded-xl border transition-all ${risk.status === 'Secured' ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/10'}`}>
                          <div className="flex justify-between items-start mb-2">
                             <p className={`text-[10px] font-black uppercase ${risk.status === 'Secured' ? 'text-green-500' : 'text-red-500'}`}>{risk.title}</p>
                             <span className={`text-[7px] font-black px-1.5 py-0.5 rounded border uppercase ${risk.severity === 'Critical' ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-orange-500/20 border-orange-500/30 text-orange-400'}`}>
                               {risk.severity}
                             </span>
                          </div>
                          <div className="flex justify-between items-center mt-3">
                             <p className="text-[8px] text-gray-500 uppercase font-black">{risk.status}</p>
                             {risk.status === 'Detected' && (
                               <button
                                 onClick={() => patchRisk(risk.id)}
                                 className="text-[8px] font-black text-primary uppercase tracking-widest hover:underline"
                               >
                                 Auto-Patch
                               </button>
                             )}
                          </div>
                        </div>
                      ))}
                  </div>

                  {risks.every(r => r.status === 'Secured') && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                       <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2" />
                       <p className="text-[10px] font-black text-green-500 uppercase">System Hardened</p>
                    </motion.div>
                  )}
                </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { title: "Sandboxed Execution", desc: "All agent actions are executed in isolated Docker containers with zero network egress unless explicitly whitelisted.", icon: <Box size={20} /> },
               { title: "Prompt Sanitization", desc: "Incoming objectives are scanned for prompt injection patterns and recursive loop triggers before hitting the reasoning engine.", icon: <Shield size={20} /> },
               { title: "Audit Trail", desc: "Immutable logs of every agent decision and tool call are stored for post-mission forensic analysis.", icon: <FileText size={20} /> }
             ].map((p, i) => (
               <div key={i} className="glass-card p-6 border-white/5">
                  <div className="text-primary mb-4">{p.icon}</div>
                  <h4 className="text-xs font-black uppercase mb-2">{p.title}</h4>
                  <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{p.desc}</p>
               </div>
             ))}
          </div>
      </div>
    </div>
  );
};

const ArchitecturePage = () => {
  const layers = [
    {
      title: "1. Strategic Intent Layer",
      icon: <BrainCircuit className="text-primary" />,
      desc: "Raw user input is processed via Whisper-V3 or Terminal. Intent is parsed into a high-level goal using the Nexus Reasoning Engine.",
      details: ["Natural Language Processing", "Voice Intent Recognition", "Goal Decomposition"]
    },
    {
      title: "2. Orchestration Mesh",
      icon: <Cpu className="text-accent" />,
      desc: "The Central Orchestrator dynamically assigns sub-tasks to specialized agents based on capability scoring.",
      details: ["Dynamic Agent Allocation", "Cross-Agent Communication", "State Persistence"]
    },
    {
      title: "3. MCP Tool Integration",
      icon: <Unplug className="text-yellow-400" />,
      desc: "Model Context Protocol (MCP) bridge allows agents to interact with external tools like GitHub, Slack, and SQL databases securely.",
      details: ["Standardized Tool Execution", "Secure API Handshakes", "Context Injection"]
    },
    {
      title: "4. Security & Guardrail Layer",
      icon: <ShieldCheck className="text-green-400" />,
      desc: "Every action is passed through the Sentinel Audit layer. Sandboxed execution and prompt injection protection are mandatory.",
      details: ["Sandboxed Runtime", "Injection Sanitization", "Human-in-the-loop (HITL)"]
    }
  ];

  return (
    <div className="py-32 px-4 lg:px-8 xl:ml-64 lg:ml-20 min-h-screen no-print">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">System Architecture</h1>
          <p className="text-gray-500 uppercase tracking-widest font-bold text-xs">Deep Dive into the AutoFlow AI Neural Mesh</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 pl-12 space-y-16">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[61px] top-0 w-12 h-12 bg-dark border border-white/10 rounded-xl flex items-center justify-center z-10">
                {layer.icon}
              </div>
              <div className="glass-card p-8 border-white/5 hover:border-primary/20 transition-all">
                <h3 className="text-xl font-black uppercase mb-4 text-white flex items-center gap-3">
                   {layer.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium max-w-2xl">
                  {layer.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {layer.details.map((detail, j) => (
                    <div key={j} className="bg-white/5 border border-white/5 px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest text-primary/70">
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
              {i < layers.length - 1 && (
                <div className="absolute left-[-55px] top-12 bottom-[-64px] w-[2px] bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-24 glass-card p-10 border-accent/20 bg-accent/5">
           <div className="flex items-center gap-4 mb-6">
              <Zap className="text-accent" />
              <h2 className="text-2xl font-black uppercase tracking-tight">Real-time Data Flow</h2>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Request Latency", val: "14ms" },
                { label: "Reasoning Depth", val: "Level 4" },
                { label: "State Sync", val: "Active" },
                { label: "Memory Type", val: "Vector RAG" }
              ].map((s, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5">
                   <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
                   <p className="text-lg font-black text-white">{s.val}</p>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { currentPath, navigate } = useAppRouter();
  const [globalGoal, setGlobalGoal] = useState('');
  const [voiceEnabled, setVoiceEnabled] = useState(true); // Default to true for hackathon impact
  const [user, setUser] = useState(null);

  const handleTransferToAI = (goalText) => {
    setGlobalGoal(goalText);
    navigate('/');
  };

  useEffect(() => {
     if (voiceEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
        const speak = (text) => {
           window.speechSynthesis.cancel();
           const utterance = new SpeechSynthesisUtterance(text);
           utterance.rate = 1.1;
           const voices = window.speechSynthesis.getVoices();
           const preferredVoice = voices.find(v => v.name.includes('Google US English') || v.name.includes('Female'));
           if (preferredVoice) utterance.voice = preferredVoice;
           window.speechSynthesis.speak(utterance);
        };

        const welcomeMessages = {
           '/': "Welcome to the Nexus Dashboard.",
           '/fleet': "Accessing Fleet Control Mesh. All agents reporting for duty.",
           '/mcp': "Model Context Protocol Hub synchronized.",
           '/security': "Security Sentinal active. Scanning for vulnerabilities.",
           '/architecture': "Technical system architecture and data flow diagram.",
           '/settings': "System configuration interface loaded.",
           '/about': "Mission details and team profile.",
           '/auth': "Neural Gateway active. Please provide identity key."
        };

        const msg = welcomeMessages[currentPath] || "Navigating to " + currentPath;
        speak(msg);
     }
  }, [currentPath]);

  const renderContent = () => {
    if (!user && currentPath !== '/auth') {
      navigate('/auth');
      return null;
    }

    if (currentPath === '/auth') {
      return <NeuralGateway onAuth={setUser} navigate={navigate} />;
    }

    switch (currentPath) {
      case '/': return <><Hero /><Dashboard initialGoal={globalGoal} setInitialGoal={setGlobalGoal} voiceEnabled={voiceEnabled} /><Features navigate={navigate} /></>;
      case '/about': return <AboutUs voiceEnabled={voiceEnabled} />;
      case '/fleet': return <FleetPage />;
      case '/mcp': return <McpHub />;
      case '/security': return <SecurityPage onTransfer={handleTransferToAI} />;
      case '/architecture': return <ArchitecturePage />;
      case '/settings': return <SettingsPage voiceEnabled={voiceEnabled} setVoiceEnabled={setVoiceEnabled} />;
      default: return <><Hero /><Dashboard initialGoal={globalGoal} setInitialGoal={setGlobalGoal} voiceEnabled={voiceEnabled} /><Features navigate={navigate} /></>;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary/30 scroll-smooth">
      {user && (
        <>
          <Navbar onMenuClick={() => setIsMobileNavOpen(true)} navigate={navigate} currentPath={currentPath} />
          <Sidebar navigate={navigate} currentPath={currentPath} />
          <MobileNav isOpen={isMobileNavOpen} setIsOpen={setIsMobileNavOpen} navigate={navigate} currentPath={currentPath} />
        </>
      )}

      <main className={`relative ${!user ? 'pt-0' : ''}`}>
        {renderContent()}
      </main>

      {user && (
        <footer className="py-20 border-t border-white/5 bg-dark xl:ml-64 lg:ml-20 no-print">
          <div className="max-w-[1400px] mx-auto px-8 text-center">
            <div className="text-2xl font-black tracking-tighter mb-2 bg-gradient-to-r from-primary to-white bg-clip-text text-transparent">
              AUTOFLOW AI
            </div>
            <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.5em] mb-4">Nexus 2.0 Hackathon Submission</p>
            <div className="flex justify-center gap-6">
               <Github size={18} className="text-gray-600 hover:text-white transition-colors cursor-pointer" />
               <Twitter size={18} className="text-gray-600 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
