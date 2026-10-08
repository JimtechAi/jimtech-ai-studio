import type { SVGProps } from 'react';

export type IconName = 'web' | 'spark' | 'growth' | 'cart' | 'design' | 'search' | 'cloud' | 'arrow' | 'check' | 'menu' | 'close' | 'mail' | 'phone' | 'pin' | 'shield' | 'layers' | 'support' | 'play' | 'external' | 'instagram' | 'whatsapp';

const paths: Record<IconName, React.ReactNode> = {
  web: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4M3 8h18" /></>,
  spark: <><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" /></>,
  growth: <><path d="M3 17 9 11l4 4 8-9" /><path d="M15 6h6v6M4 21h16" /></>,
  cart: <><path d="M3 4h2l2.3 11.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 1.9-1.4L22 8H6" /><circle cx="10" cy="21" r="1" /><circle cx="18" cy="21" r="1" /></>,
  design: <><path d="m4 20 4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z" /><path d="m14.8 6.2 3 3M4 20h16" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5M8 11h5m-2.5-2.5v5" /></>,
  cloud: <><path d="M7 18a5 5 0 1 1 .7-9.9A6.5 6.5 0 0 1 20 10a4 4 0 0 1-1 8H7Z" /><path d="m9 14 2 2 4-4" /></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  phone: <path d="M7 3h3l2 5-2 2a16 16 0 0 0 4 4l2-2 5 2v3a2 2 0 0 1-2 2C10 19 5 14 5 5a2 2 0 0 1 2-2Z" />,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  shield: <><path d="M12 3 20 6v5c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></>,
  layers: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></>,
  support: <><path d="M4 13v-2a8 8 0 0 1 16 0v2" /><path d="M4 13h3v6H6a2 2 0 0 1-2-2v-4Zm16 0h-3v6h1a2 2 0 0 0 2-2v-4Zm-8 7h3" /></>,
  play: <path d="m9 6 10 6-10 6V6Z" />,
  external: <><path d="M14 4h6v6m0-6-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></>,
  whatsapp: <><path d="M20.5 14.2A8.5 8.5 0 0 1 6.6 18L4 20l2.1-5.7a8.5 8.5 0 1 1 14.4-.1Z" /><path d="M15.8 14.1c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.2-.7.9-.8 1.1-.2.2-.3.2-.6.1a6.8 6.8 0 0 1-2.1-1.3A7.7 7.7 0 0 1 8.5 11c-.2-.3-.1-.4.1-.6.1-.1.2-.3.3-.4.1-.1.1-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.7-1.7-.9-2.3-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.4.1-.7.3-.2.3-.8 1-.8 2.4s.9 2.8 1 3c.1.2 1.8 2.8 4.4 3.8.6.3 1 .5 1.4.6.6.2 1.2.2 1.7.1.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.1-1.3-.1-.2-.3-.2-.6-.4Z" /></>,
};

export function Icon({ name, size = 22, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name]}</svg>;
}
