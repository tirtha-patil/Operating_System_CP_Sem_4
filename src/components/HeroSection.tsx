export default function HeroSection() {
  return (
    <div className="max-w-5xl mx-auto py-16 md:py-24 px-4 relative z-10 w-full flex flex-col items-start">
      
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF2FF] border border-[#E0E7FF] text-[#4F46E5] text-[14px] font-medium mb-8">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></span>
        Page Replacement Algorithms
      </div>
      
      {/* Heading */}
      <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold text-[#111827] leading-[1.1] mb-6 tracking-tight flex flex-wrap gap-x-4 items-center">
        <span>Virtual Memory</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] to-[#38BDF8]">
          Simulator
        </span>
      </h1>
      
      {/* Subtitle */}
      <p className="text-[#6B7280] text-lg md:text-[22px] mb-10 leading-relaxed max-w-2xl font-normal">
        Visualize FIFO, LRU & Optimal algorithms. Compare performance in Battle Mode.
      </p>
      
      {/* Bottom Tags */}
      <div className="flex gap-3">
        {['FIFO', 'LRU', 'Optimal'].map(algo => (
          <span 
            key={algo} 
            className="px-5 py-2.5 rounded-[14px] bg-[#F3F4F6] text-[14px] font-mono text-[#374151] font-semibold tracking-wide"
          >
            {algo}
          </span>
        ))}
      </div>

    </div>
  );
}