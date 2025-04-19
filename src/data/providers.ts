
export interface Provider {
  id: string;
  name: string;
  serviceId: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  price: string;
  tags: string[];
  availability: string;
  slug: string;
}

export const providers: Provider[] = [
  {
    id: "1",
    name: "Mary Johnson",
    serviceId: "1",
    rating: 4.9,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Professional house cleaner with 10+ years of experience in residential and commercial cleaning.",
    price: "₹499/hr",
    tags: ["Deep Cleaning", "Regular Cleaning", "Move-out Cleaning"],
    availability: "Mon-Fri, 8 AM - 5 PM",
    slug: "mary-johnson"
  },
  {
    id: "2",
    name: "James Wilson",
    serviceId: "1",
    rating: 4.7,
    reviewCount: 95,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Specialized in eco-friendly cleaning solutions with attention to detail.",
    price: "₹599/hr",
    tags: ["Eco-Friendly", "Pet-Friendly", "Allergy-Friendly"],
    availability: "Mon-Sat, 9 AM - 6 PM",
    slug: "james-wilson"
  },
  {
    id: "3",
    name: "Chef Marco",
    serviceId: "2",
    rating: 5.0,
    reviewCount: 87,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Culinary expert specializing in international cuisine and dietary-specific meal preparation.",
    price: "₹899/hr",
    tags: ["International", "Meal Prep", "Dietary Specific"],
    availability: "Tue-Sun, Flexible Hours",
    slug: "chef-marco"
  },
  {
    id: "4",
    name: "Sophia Chen",
    serviceId: "2",
    rating: 4.8,
    reviewCount: 62,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Pastry chef and meal planning expert. Specializes in family meals and dietary restrictions.",
    price: "₹799/hr",
    tags: ["Family Meals", "Pastry", "Meal Planning"],
    availability: "Mon-Fri, 10 AM - 7 PM",
    slug: "sophia-chen"
  },
  {
    id: "5",
    name: "Mike Thomas",
    serviceId: "3",
    rating: 4.6,
    reviewCount: 43,
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Mobile car detailing expert using premium products for a showroom finish.",
    price: "₹999 per service",
    tags: ["Detailing", "Waxing", "Interior"],
    availability: "Wed-Sun, 8 AM - 6 PM",
    slug: "mike-thomas"
  },
  {
    id: "6",
    name: "Robert Garcia",
    serviceId: "4",
    rating: 4.9,
    reviewCount: 104,
    image: "https://images.unsplash.com/photo-1567515004624-219c11d31f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Licensed plumber with expertise in repairs, installations, and emergency services.",
    price: "₹1,499/hr",
    tags: ["Repairs", "Installation", "Emergency"],
    availability: "Mon-Sun, 24/7 Emergency",
    slug: "robert-garcia"
  },
  {
    id: "7",
    name: "David Miller",
    serviceId: "5",
    rating: 4.8,
    reviewCount: 76,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Custom carpentry and furniture repair specialist with an eye for detail.",
    price: "₹1,299/hr",
    tags: ["Custom Work", "Repairs", "Furniture"],
    availability: "Mon-Fri, 9 AM - 5 PM",
    slug: "david-miller"
  },
  {
    id: "8",
    name: "Elena Rodriguez",
    serviceId: "6",
    rating: 4.9,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Licensed electrician specializing in residential wiring and smart home installations.",
    price: "₹1,599/hr",
    tags: ["Wiring", "Smart Home", "Lighting"],
    availability: "Mon-Sat, 8 AM - 7 PM",
    slug: "elena-rodriguez"
  }
];

export const getProvidersByServiceId = (serviceId: string): Provider[] => {
  return providers.filter(provider => provider.serviceId === serviceId);
};

export const getProviderBySlug = (slug: string): Provider | undefined => {
  return providers.find(provider => provider.slug === slug);
};
