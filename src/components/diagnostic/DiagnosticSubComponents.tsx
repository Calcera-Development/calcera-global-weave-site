import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StackCardProps {
    icon: LucideIcon;
    title: string;
    content: string;
    color?: string;
    iconColor?: string;
}

export const StackCard = ({ icon: Icon, title, content, color = "bg-blue-50", iconColor = "text-blue-600" }: StackCardProps) => (
    <div className={cn("p-4 rounded-xl border border-slate-100 flex gap-4 transition-all duration-300 hover:shadow-md", color)}>
        <div className={cn("p-2.5 rounded-lg bg-white shadow-sm flex-shrink-0", iconColor)}>
            <Icon className="h-5 w-5" />
        </div>
        <div>
            <h4 className="text-sm font-bold text-slate-900 mb-1">{title}</h4>
            <p className="text-xs text-slate-600 leading-relaxed">{content}</p>
        </div>
    </div>
);

interface ROIMetricProps {
    label: string;
    value: string | number;
    sub: string;
}

export const ROIMetric = ({ label, value, sub }: ROIMetricProps) => (
    <div className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
        <p className="text-2xl font-black text-slate-900 leading-none mb-1">{value}</p>
        <p className="text-[10px] text-slate-500 font-medium">{sub}</p>
    </div>
);

interface TrustBadgeProps {
    icon: LucideIcon;
    text: string;
}

export const TrustBadge = ({ icon: Icon, text }: TrustBadgeProps) => (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200/50">
        <Icon className="h-3 w-3 text-slate-500" />
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-tight">{text}</span>
    </div>
);
