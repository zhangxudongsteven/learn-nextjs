import { NavPage } from "@/app/lib/definitions";

// Chatbot Pages
export const CHATBOTS: NavPage[] = [
  { name: '个人助理', href: '/dashboard/chatbot' },
  { name: 'AI说明书', href: '/dashboard/chatbot/manual' },
  { name: '经济学助教', href: '/dashboard/chatbot/economy' },
];

// Media Pages
export const MEDIAS: NavPage[] = [
  { name: '说文解字', href: '/dashboard/media' },
  { name: '成语解读', href: '/dashboard/media/idiom' },
];
