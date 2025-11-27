import { CalendarDays, Code, Gift, Images, Video, Volume2 } from "lucide-react";
import { FaFemale, FaMale } from "react-icons/fa";

type IconConfig = {
  key: string;
  label: string;
  icon: React.ReactNode;
};

export const ICONS_CONFIG: IconConfig[] = [
  { key: "groom", icon: <FaMale size={30} />, label: "Mempelai Pria" },
  { key: "bride", icon: <FaFemale size={30} />, label: "Mempelai Wanita" },
  { key: "event", icon: <CalendarDays size={30} />, label: "Acara" },
  { key: "photos", icon: <Images size={30} />, label: "Foto" },
  { key: "gifts", icon: <Gift size={30} />, label: "Kado Digital" },
  { key: "audio", icon: <Volume2 size={30} />, label: "Audio" },
  { key: "video", icon: <Video size={30} />, label: "Video" },
  { key: "meta", icon: <Code size={30} />, label: "Meta" },
];
