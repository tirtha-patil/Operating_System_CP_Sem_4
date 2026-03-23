export default function StatsCard({ faults, hits }: { faults: number; hits: number }) {
  const total = faults + hits;
  const rate = total > 0 ? ((hits / total) * 100).toFixed(1) : "0.0";
  return (
    <div className="bg-card/50 backdrop-blur-md border border-border/40 p-6 rounded-2xl space-y-4 text-center">
      <h3 className="text-lg font-bold text-foreground">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <div className="text-3xl font-bold text-red-500">{faults}</div>
          <div className="text-xs text-muted-foreground uppercase mt-1">Page Faults</div>
        </div>
        <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
          <div className="text-3xl font-bold text-green-500">{hits}</div>
          <div className="text-xs text-muted-foreground uppercase mt-1">Page Hits</div>
        </div>
      </div>
      <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
        <div className="text-2xl font-bold text-foreground">{rate}%</div>
        <div className="text-xs text-muted-foreground uppercase mt-1">Hit Rate</div>
      </div>
    </div>
  );
}
