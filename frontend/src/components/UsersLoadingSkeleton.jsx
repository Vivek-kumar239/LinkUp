function UsersLoadingSkeleton() {
  return (
  <div className="flex flex-col gap-1 p-2 overflow-hidden">
    {[1, 2, 3, 4, 5, 6].map((item) => (
      <div 
        key={item} 
        className="relative w-full flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] border border-white/[0.03] overflow-hidden"
      >
        {/* Animated Shimmer Overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.03] to-transparent" />

        {/* Avatar Skeleton */}
        <div className="relative flex-shrink-0">
          <div className="size-11 rounded-full bg-slate-800 border-2 border-slate-900 shadow-inner" />
          {/* Status Dot Skeleton */}
          <div className="absolute bottom-0 right-0 size-3.5 bg-slate-800 border-2 border-slate-900 rounded-full" />
        </div>

        {/* Text Content Skeleton */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center mb-2">
            {/* Name bar */}
            <div className="h-3 bg-slate-800 rounded-full w-24" />
            {/* Time bar */}
            <div className="h-2 bg-slate-800/50 rounded-full w-8" />
          </div>
          
          {/* Message preview bar */}
          <div className="h-2.5 bg-slate-800/60 rounded-full w-40" />
        </div>
      </div>
    ))}
  </div>
);
}
export default UsersLoadingSkeleton;
