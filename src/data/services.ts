
export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
  iconName: string;
  slug: string;
  popular: boolean;
}

export const services: Service[] = [
  {
    id: "1",
    name: "House Cleaning",
    description: "Professional home cleaning services to keep your space spotless",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "home",
    slug: "house-cleaning",
    popular: true
  },
  {
    id: "2",
    name: "Cooking & Meal Prep",
    description: "Personal chefs and meal preparation for busy households",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "utensils",
    slug: "cooking",
    popular: true
  },
  {
    id: "3",
    name: "Car Washing",
    description: "Mobile car washing and detailing at your convenience",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "car",
    slug: "car-washing",
    popular: false
  },
  {
    id: "4",
    name: "Plumbing",
    description: "Expert plumbing services for repairs and installations",
    image: "https://images.unsplash.com/photo-1585704123905-c3cb1b56912f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "pipe",
    slug: "plumbing",
    popular: true
  },
  {
    id: "5",
    name: "Carpentry",
    description: "Skilled carpenters for furniture repair and custom woodwork",
    image: "https://images.unsplash.com/photo-1601058268499-e52e4af5f3b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "hammer",
    slug: "carpentry",
    popular: false
  },
  {
    id: "6",
    name: "Electrical Work",
    description: "Licensed electricians for all your electrical needs",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "electric",
    slug: "electrical",
    popular: true
  },
  {
    id: "7",
    name: "Painting",
    description: "Professional painting services for interior and exterior",
    image: "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "paint-roller",
    slug: "painting",
    popular: false
  },
  {
    id: "8",
    name: "Appliance Repair",
    description: "Expert repair services for all household appliances",
    image: "https://images.unsplash.com/photo-1581141849291-1125c7b692b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    iconName: "washing-machine",
    slug: "appliance-repair",
    popular: true
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getPopularServices = (): Service[] => {
  return services.filter(service => service.popular);
};
