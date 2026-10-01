import { Star } from "lucide-react";
import { AvatarStack } from "@/components/ui/Avatar";
import { cn } from "@/lib/cn";

export function LearningProgressCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-[232px] rounded-2xl bg-white p-4 shadow-card", className)}>
      <p className="text-label-s text-neutral-950">Learning Progress</p>
      <p className="mt-1 font-heading text-[40px] font-semibold leading-tight text-neutral-950">55%</p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-100" role="img" aria-label="55 percent complete">
        <div className="h-full w-[55%] rounded-full bg-lime-500" />
      </div>
    </div>
  );
}

export function TopicCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white px-4 py-3 shadow-card", className)}>
      <p className="text-label-m text-neutral-950">UI/UX Design</p>
      <p className="mt-0.5 text-[12px] text-neutral-500">200 Courses <span className="mx-1">•</span> 1000+ Students</p>
    </div>
  );
}

export function HappyStudentsCard({ tone = "white", className }: { tone?: "white" | "lime"; className?: string }) {
  const lime = tone === "lime";
  return (
    <div className={cn("w-[258px] rounded-2xl p-4 shadow-card", lime ? "bg-lime-500" : "bg-white", className)}>
      <p className="text-label-m text-neutral-950">Happy Students</p>
      <p className="mt-0.5 flex items-center gap-1 text-[12px] text-neutral-500">
        <b className="font-medium text-neutral-950">4.5</b> (240)
        <Star className={cn("h-3.5 w-3.5", lime ? "fill-blue-600 text-blue-600" : "fill-lime-500 text-lime-500")} aria-hidden="true" />
      </p>
      <AvatarStack count={6} badge="2K+" badgeTone={lime ? "dark" : "lime"} size={36} className="mt-2" />
    </div>
  );
}

export function RevenueCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-[190px] rounded-2xl bg-blue-700 p-4 text-white shadow-card", className)}>
      <p className="text-label-m">Total Revenue</p>
      <p className="text-[10px] leading-tight text-white/80">July 1-28</p>
      <p className="mt-1 font-heading text-[22px] font-semibold">$120.29</p>
      <div className="mt-1 h-2 rounded-full bg-white"><div className="h-full w-[60%] rounded-full bg-lime-500" /></div>
    </div>
  );
}

export function YearToDateCard({ className }: { className?: string }) {
  return (
    <div className={cn("w-[140px] rounded-2xl bg-blue-700 p-4 text-white shadow-card", className)}>
      <p className="text-label-m">Year to Date</p>
      <p className="text-[10px] leading-tight text-white/80">2023</p>
      <p className="mt-1 font-heading text-[22px] font-semibold">$1,200.38</p>
      <span className="mt-2 inline-block rounded-full bg-lime-500 px-2 py-0.5 text-[10px] font-medium text-neutral-950">+12$</span>
    </div>
  );
}
