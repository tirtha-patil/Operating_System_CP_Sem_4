import { Monitor } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="bg-white border border-slate-200 p-16 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center text-center mt-6">
      <div className="w-[84px] h-[84px] bg-slate-50 border border-slate-100 rounded-[24px] flex items-center justify-center text-indigo-300 mb-6 shadow-sm">
        <Monitor size={36} strokeWidth={2} />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">No data yet</h3>
      <p className="text-slate-400 max-w-xs text-[14px] leading-relaxed font-medium">
        Configure your parameters above and run a simulation to see results.
      </p>
    </div>
  );
}