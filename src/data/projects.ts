export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    imageUrl: string;
    liveUrl?: string;
    githubUrl?: string;
    features: string[];
  }
  
  export const projects: Project[] = [
    {
      id: 'project-1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with Next.js and Stripe',
      longDescription: 'A fully featured e-commerce solution with real-time inventory management, secure payments, and an intuitive admin dashboard.',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
      imageUrl: '/projects/ecommerce.jpg',
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/yourusername/project',
      features: [
        'Real-time inventory tracking',
        'Secure payment processing',
        'Admin dashboard',
        'Order management',
        'Analytics integration'
      ]
    },
    // Add more projects as needed
  ];