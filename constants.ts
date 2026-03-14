
import { Project, Experience, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus Fintech App',
    category: 'UI/UX',
    imageUrl: 'https://picsum.photos/800/600?random=1',
    description: 'Modern banking interface focusing on clean data visualization and seamless user flow.'
  },
  {
    id: '2',
    title: 'Cyberpunk Event Poster',
    category: 'Poster',
    imageUrl: 'https://picsum.photos/800/600?random=2',
    description: 'Neon-infused graphic design for an underground electronic music festival.'
  },
  {
    id: '3',
    title: 'Eco-Friendly Brand Identity',
    category: 'Branding',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    description: 'Holistic branding solution for a sustainable luxury lifestyle company.'
  },
  {
    id: '4',
    title: 'Vanguard Social Banner',
    category: 'Banner',
    imageUrl: 'https://picsum.photos/800/600?random=4',
    description: 'Dynamic social media assets designed to maximize engagement and CTR.'
  }
];

export const LOGO_DESIGNS: Project[] = [
  {
    id: 'l1',
    title: 'Apex Systems',
    category: 'Logo',
    imageUrl: 'https://picsum.photos/400/400?random=10',
    description: 'Minimalist geometric logo for a tech infrastructure firm.'
  },
  {
    id: 'l2',
    title: 'Bloom Floral',
    category: 'Logo',
    imageUrl: 'https://picsum.photos/400/400?random=11',
    description: 'Soft organic mark for a boutique florist.'
  },
  {
    id: 'l3',
    title: 'Stellar Coffee',
    category: 'Logo',
    imageUrl: 'https://picsum.photos/400/400?random=12',
    description: 'Vintage-modern hybrid badge for an artisanal roastery.'
  },
  {
    id: 'l4',
    title: 'Kinetix Studio',
    category: 'Logo',
    imageUrl: 'https://picsum.photos/400/400?random=13',
    description: 'Abstract symbol representing movement and energy.'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'e1',
    company: 'Pixel Perfect Agency',
    role: 'Senior Visual Designer',
    period: '2021 - Present',
    description: 'Leading creative direction for enterprise-level clients and mentoring junior designers.'
  },
  {
    id: 'e2',
    company: 'Creative Hub Studio',
    role: 'Graphic Designer',
    period: '2018 - 2021',
    description: 'Developed branding packages and promotional materials for various startups.'
  },
  {
    id: 'e3',
    company: 'Freelance Design',
    role: 'Logo & UI Designer',
    period: '2016 - 2018',
    description: 'Successfully completed 50+ diverse projects for clients globally.'
  }
];

export const SKILLS: Skill[] = [
  { name: 'Figma', level: 95, icon: 'Layout' },
  { name: 'Adobe Illustrator', level: 90, icon: 'PenTool' },
  { name: 'Adobe Photoshop', level: 85, icon: 'Image' },
  { name: 'UI/UX Design', level: 92, icon: 'MousePointer2' },
  { name: 'Brand Identity', level: 88, icon: 'Target' },
  { name: 'Poster Design', level: 94, icon: 'FileText' }
];
