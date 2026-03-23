import { motion } from "framer-motion";

export default function StepTable({ steps }: { steps: any[] }) {
  return (
    <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-x-auto">
      <h3 className="text-xl font-bold text-slate-900 mb-6">Memory State Timeline</h3>
      
      <div className="flex gap-3 pb-4">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col gap-2 min-w-[3.5rem] items-center">
            {/* Time Indicator */}
            <div className="text-[13px] text-slate-400 font-bold font-mono mb-1">T{i}</div>
            
            {/* Animated Memory Frames */}
            {step.frames.map((frame: any, j: number) => (
              <motion.div
                key={`${i}-${j}`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: i * 0.1 + j * 0.05, 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-xl font-mono text-lg font-bold border-2 ${
                  step.hit 
                    ? 'bg-green-50 text-green-600 border-green-200 shadow-[0_0_15px_rgba(34,197,94,0.1)]' 
                    : 'bg-red-50 text-red-600 border-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                }`}
              >
                {frame !== null ? frame : "-"}
              </motion.div>
            ))}
            
            {/* Hit/Fault Status */}
            <div className={`mt-2 text-[11px] tracking-wider font-bold ${step.hit ? 'text-green-500' : 'text-red-500'}`}>
              {step.hit ? "HIT" : "FAULT"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}