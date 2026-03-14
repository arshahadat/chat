
export interface Project {
  id: string;
  title: string;
  category: 'Logo' | 'UI/UX' | 'Poster' | 'Banner' | 'Branding';
  imageUrl: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  icon: string;
}
