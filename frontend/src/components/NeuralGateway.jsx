import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, UserPlus, Zap, Loader2, Fingerprint, Key, Globe, Cpu } from 'lucide-react';

const NeuralGateway = ({ onAuth, navigate }) => {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'guest'
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({ signature: '', key: '' });

  const handleAction = async (e) => {
    e.preventDefault();
    setIsScanning(true);

    // Simulate Neural Uplink
    await new Promise(r => setTimeout(r, 2000));

    if (mode === 'guest') {
      const guestData = {
        id: `GUEST-${Math.floor(Math.random() * 10000)}`,
        permissions: 'Limited-Access',
        fleet_access: 'Tier-1',
        name: 'Transient Observer'
      };
      onAuth(guestData);
      navigate('/');
    } else {
      // Mock Auth for Register/Login
      const userData = {
        id: `USER-${Math.floor(Math.random() * 10000)}`,
        permissions: 'Full-Access',
        fleet_access: 'Tier-Elite',
        name: formData.signature || 'Nexus Operative'
      };
      onAuth(userData);
      navigate('/');
    }
    setIsScanning(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #7000FF 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-card p-8 border-white/5 relative overflow-hidden backdrop-blur-2xl bg-black/60 shadow-[0_0_50px_rgba(0,229,255,0.1)]">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-[#7000FF] to-[#00E5FF] mb-6 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <Cpu className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">Neural Gateway</h1>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Nexus-V11.0 Authorization Protocol</p>
          </div>

          {/* Mode Toggles */}
          <div className="flex bg-white/5 p-1 rounded-xl mb-8 border border-white/5">
            {['login', 'register', 'guest'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                  mode === m
                    ? 'bg-gradient-to-r from-[#7000FF] to-[#00E5FF] text-white shadow-lg'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {m === 'login' && 'Secure Login'}
                {m === 'register' && 'Register'}
                {m === 'guest' && 'Guest Uplink'}
              </button>
            ))}
          </div>

          <form onSubmit={handleAction} className="space-y-6">
            <AnimatePresence mode="wait">
              {mode !== 'guest' ? (
                <motion.div
                  key="form-fields"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Neural Signature</label>
                    <div className="relative group">
                      <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00E5FF] transition-colors" size={18} />
                      <input
                        type="text"
                        placeholder="Enter Operative Name"
                        value={formData.signature}
                        onChange={(e) => setFormData({...formData, signature: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF]/30 outline-none transition-all placeholder:text-gray-700"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Identity Key</label>
                    <div className="relative group">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#7000FF] transition-colors" size={18} />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.key}
                        onChange={(e) => setFormData({...formData, key: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-medium focus:border-[#7000FF] focus:ring-1 focus:ring-[#7000FF]/30 outline-none transition-all placeholder:text-gray-700"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="guest-info"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center space-y-4"
                >
                  <Globe className="mx-auto text-[#00E5FF] animate-pulse" size={32} />
                  <div>
                    <h3 className="text-xs font-black uppercase text-white tracking-widest">Transient Access Mode</h3>
                    <p className="text-[10px] text-gray-500 uppercase font-bold mt-2 leading-relaxed">
                      Temporary session key will be generated. Tier-1 fleet access only.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={isScanning}
              className={`w-full py-5 rounded-xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all relative overflow-hidden group ${
                isScanning
                  ? 'bg-white/10 text-gray-500'
                  : 'bg-gradient-to-r from-[#7000FF] to-[#00E5FF] text-white hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]'
              }`}
            >
              {isScanning ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Scanning Synapse...</span>
                </>
              ) : (
                <>
                  {mode === 'login' && <Shield size={18} />}
                  {mode === 'register' && <UserPlus size={18} />}
                  {mode === 'guest' && <Zap size={18} />}
                  <span>{mode === 'guest' ? 'Initialize Temporary Session' : 'Establish Link'}</span>
                </>
              )}

              {/* Scanning Light Effect */}
              {isScanning && (
                <motion.div
                  initial={{ top: '-100%' }}
                  animate={{ top: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-[#00E5FF]/40 to-transparent pointer-events-none"
                />
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-gray-600 uppercase">Gateway Latency</span>
              <span className="text-[10px] font-mono text-[#00E5FF]">4ms</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] font-black text-gray-600 uppercase">Encryption</span>
              <span className="text-[10px] font-mono text-[#7000FF]">RSA-4096</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#7000FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-[100px] pointer-events-none" />
    </div>
  );
};

export default NeuralGateway;
