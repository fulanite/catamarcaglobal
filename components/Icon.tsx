import {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Mail,
  Map,
  MapPin,
  MessagesSquare,
  Network,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";
import type { ComponentType } from "react";

const icons = {
  ArrowRight,
  Bot,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  FileText,
  Globe2,
  GraduationCap,
  Handshake,
  Landmark,
  Mail,
  Map,
  MapPin,
  MessagesSquare,
  Network,
  Scale,
  Send,
  ShieldCheck,
  Sparkles,
  UsersRound,
} satisfies Record<string, ComponentType<{ className?: string; "aria-hidden"?: boolean }>>;

export type IconName = keyof typeof icons;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const LucideIcon = icons[name];
  return <LucideIcon className={className} aria-hidden />;
}
