export default function BattleResults({ comparison }: { comparison: any[] }) {
  return (
    <div className="bg-card/50 backdrop-blur-md border border-border/40 p-6 rounded-2xl">
      <h3 className="text-lg font-bold mb-4 text-center text-foreground">Algorithm Battle Results</h3>
      <div className="space-y-3">
        {comparison.map((alg, i) => (
          <div key={i} className="flex justify-between items-center bg-background p-4 rounded-xl border border-border">
            <span className="font-bold text-foreground">{alg.algorithm}</span>
            <span className="text-red-500 font-mono font-medium">{alg.faults} Page Faults</span>
          </div>
        ))}
      </div>
    </div>
  );
}