import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MemoryStick, Sun, Moon, Sparkles } from "lucide-react";
import SimulatorInput from "./components/SimulatorInput";
import StepTable from "./components/StepTable";
import StatsCard from "./components/StatsCard";
import BattleResults from "./components/BattleResults";
import EmptyState from "./components/EmptyState";
import HeroSection from "./components/HeroSection";

interface SimResult {
  steps: { frames: number[]; hit: boolean }[];
  faults: number;
  hits: number;
  comparison?: { algorithm: string; faults: number }[];
}

const FloatingOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.15, 1],
    }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const App = () => {
  const [result, setResult] = useState<SimResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"single" | "battle">("single");
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSimulate = async (config: {
    frames: number;
    pages: number[];
    algorithm: string;
    mode: "single" | "battle";
  }) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setMode(config.mode);

    try {
      const res = await fetch("http://localhost:5000/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const data: SimResult = await res.json();
      setResult(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to connect to the simulation server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 overflow-hidden relative">
      {/* Animated dot grid background */}
      <div className="fixed inset-0 dot-grid pointer-events-none" />
      
      {/* Floating orbs with multi-color */}
      <FloatingOrb className="w-80 h-80 bg-primary/15 -top-32 -right-24" delay={0} />
      <FloatingOrb className="w-96 h-96 bg-accent/10 bottom-40 -left-48" delay={2} />
      <FloatingOrb className="w-64 h-64 bg-cyan/10 top-1/3 right-1/4" delay={4} />
      
      {/* Top gradient wash */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.08),transparent)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,hsl(var(--accent)/0.04),transparent)] pointer-events-none" />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 bg-card/50 backdrop-blur-2xl border-b border-border/40"
      >
        <div className="max-w-5xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.05 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg glow-primary"
              style={{ background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))" }}
            >
              <MemoryStick className="w-5 h-5 text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-base font-bold text-foreground leading-tight flex items-center gap-1.5">
                VMM Simulator
                <Sparkles className="w-3.5 h-3.5 text-cyan" />
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium">Virtual Memory Management</p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleDark}
            className="w-9 h-9 rounded-xl bg-secondary/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors border border-border/30"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={dark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Hero */}
      <HeroSection />

      <main className="max-w-5xl mx-auto px-4 pb-16 space-y-6 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <SimulatorInput onSimulate={handleSimulate} isLoading={isLoading} />
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="gradient-border-card rounded-2xl p-5 text-destructive text-sm font-medium backdrop-blur-sm bg-card"
            >
              ⚠️ {error}
            </motion.div>
          )}

          {!result && !isLoading && !error && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <EmptyState />
            </motion.div>
          )}

          {result && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {mode === "single" && result.steps && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <motion.div
                    className="lg:col-span-2"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <StepTable steps={result.steps} />
                  </motion.div>
                  <motion.div
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <StatsCard faults={result.faults} hits={result.hits} />
                  </motion.div>
                </div>
              )}
              {mode === "battle" && result.comparison && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <BattleResults comparison={result.comparison} />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer accent line */}
      <div className="fixed bottom-0 left-0 right-0 h-[2px] opacity-40" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--cyan)), transparent)" }} />
    </div>
  );
};

export default App;