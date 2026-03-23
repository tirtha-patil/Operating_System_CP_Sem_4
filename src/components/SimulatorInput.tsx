import { useState } from "react";
import { Cpu, Hash, Layers, Zap, Play, ChevronDown } from "lucide-react";

export default function SimulatorInput({ onSimulate, isLoading }: any) {
  const [frames, setFrames] = useState("");
  const [pages, setPages] = useState("");
  const [algorithm, setAlgorithm] = useState("FIFO");
  const [mode, setMode] = useState<"single" | "battle">("single");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pageArray = pages.split(",").map(p => parseInt(p.trim())).filter(n => !isNaN(n));
    const frameCount = parseInt(frames) || 3;
    onSimulate({ frames: frameCount, pages: pageArray, algorithm, mode });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 p-6 md:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative z-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Cpu size={24} strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 leading-tight">Configuration</h3>
          <p className="text-[13px] text-slate-500 font-medium">Set up your simulation parameters</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500"><Hash size={12} strokeWidth={3} /></div>
            Number of Frames
          </label>
          <input type="number" min="1" value={frames} onChange={(e) => setFrames(e.target.value)} placeholder="e.g. 3" className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium" required />
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <div className="w-5 h-5 rounded-full bg-purple-50 flex items-center justify-center text-purple-500"><Layers size={12} strokeWidth={3} /></div>
            Page Reference String
          </label>
          <input type="text" value={pages} onChange={(e) => setPages(e.target.value)} placeholder="e.g. 7, 0, 1, 2, 0, 3" className="w-full bg-white border border-slate-200 rounded-[14px] px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300 font-medium tracking-wide" required />
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
        {/* Toggle Pill */}
        <div className="flex items-center gap-3 px-1.5 py-1.5 bg-white border border-slate-200 rounded-[18px] shadow-sm">
          <span className={`text-[13px] font-bold pl-3 transition-colors ${mode === 'single' ? 'text-indigo-600' : 'text-slate-400'}`}>Single</span>
          <button type="button" onClick={() => setMode(mode === 'single' ? 'battle' : 'single')} className="w-12 h-6 bg-slate-100 border border-slate-200 rounded-full relative flex items-center transition-colors focus:outline-none shadow-inner">
            <div className={`w-5 h-5 bg-white rounded-full shadow absolute transition-transform duration-200 ${mode === 'battle' ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-[13px] font-bold pr-3 flex items-center gap-1 transition-colors ${mode === 'battle' ? 'text-indigo-600' : 'text-slate-400'}`}>
            <Zap size={14} className={mode === 'battle' ? 'fill-indigo-600 text-indigo-600' : ''} /> Battle
          </span>
        </div>

        {/* Dropdown */}
        <div className="relative w-full md:w-48">
          <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="w-full appearance-none bg-white border border-slate-200 rounded-[14px] px-4 py-2.5 text-[14px] font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none cursor-pointer shadow-sm">
            <option value="FIFO">FIFO</option>
            <option value="LRU">LRU</option>
            <option value="Optimal">Optimal</option>
          </select>
          <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Button */}
      <button disabled={isLoading} type="submit" className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-white py-3.5 rounded-[14px] font-bold flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgb(79,70,229,0.39)] transition-all active:scale-[0.99] tracking-wide">
        {isLoading ? "Running Simulation..." : <><Play size={16} fill="currentColor" /> Run Simulation</>}
      </button>
    </form>
  );
}