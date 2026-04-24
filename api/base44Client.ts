// Mock base44 client for demonstration
// In a real application, this would connect to your actual API

class Base44Client {
  private baseUrl: string;

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
  }

  // Mock data for demonstration
  private mockProperties = [
    {
      id: '1',
      title: 'Luxury Villa in Palm Jumeirah',
      description: 'Stunning 5-bedroom villa with private beach access and panoramic sea views. This luxurious property features modern architecture, high-end finishes, and exceptional amenities.',
      price: 8500000,
      bedrooms: 5,
      bathrooms: 6,
      area: 7500,
      location: 'Palm Jumeirah',
      category: 'for-sale',
      property_type: 'villa',
      images: ['/placeholder-property-1.jpg'],
      featured: true,
      reference_number: 'PROP-001',
      created_date: '2024-01-15T10:00:00Z',
      is_active: true
    },
    {
      id: '2',
      title: 'Modern Apartment in Downtown Dubai',
      description: 'Contemporary 2-bedroom apartment in the heart of Downtown Dubai with Burj Khalifa views. Perfect for urban living with world-class amenities.',
      price: 2200000,
      bedrooms: 2,
      bathrooms: 2,
      area: 1450,
      location: 'Downtown Dubai',
      category: 'for-sale',
      property_type: 'apartment',
      images: ['/placeholder-property-2.jpg'],
      featured: false,
      reference_number: 'PROP-002',
      created_date: '2024-01-14T15:30:00Z',
      is_active: true
    },
    {
      id: '3',
      title: 'Penthouse with Marina Views',
      description: 'Exclusive 4-bedroom penthouse offering breathtaking marina and skyline views. Premium finishes and spacious living areas.',
      price: 5500000,
      bedrooms: 4,
      bathrooms: 5,
      area: 4200,
      location: 'Dubai Marina',
      category: 'for-sale',
      property_type: 'penthouse',
      images: ['/placeholder-property-3.jpg'],
      featured: true,
      reference_number: 'PROP-003',
      created_date: '2024-01-13T09:15:00Z',
      is_active: true
    },
    {
      id: '4',
      title: 'Townhouse in Arabian Ranches',
      description: 'Family-friendly 3-bedroom townhouse in a gated community with excellent facilities including parks, schools, and retail outlets.',
      price: 1800000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2100,
      location: 'Arabian Ranches',
      category: 'for-sale',
      property_type: 'townhouse',
      images: ['/placeholder-property-4.jpg'],
      featured: false,
      reference_number: 'PROP-004',
      created_date: '2024-01-12T14:20:00Z',
      is_active: true
    },
    {
      id: '5',
      title: 'Studio Apartment in Business Bay',
      description: 'Efficient studio apartment perfect for young professionals. Modern design with excellent connectivity to business districts.',
      price: 850000,
      bedrooms: 0,
      bathrooms: 1,
      area: 550,
      location: 'Business Bay',
      category: 'for-rent',
      property_type: 'apartment',
      images: ['/placeholder-property-5.jpg'],
      featured: false,
      reference_number: 'PROP-005',
      created_date: '2024-01-11T11:45:00Z',
      is_active: true
    },
    {
      id: '6',
      title: 'Commercial Office Space',
      description: 'Premium office space in DIFC with modern facilities and excellent business environment. Ideal for corporate headquarters.',
      price: 3500000,
      bedrooms: 0,
      bathrooms: 4,
      area: 3500,
      location: 'DIFC',
      category: 'commercial',
      property_type: 'office',
      images: ['/placeholder-property-6.jpg'],
      featured: false,
      reference_number: 'PROP-006',
      created_date: '2024-01-10T16:00:00Z',
      is_active: true
    }
  ];

  entities = {
    Property: {
      filter: async (filters: Record<string, any>, sortBy: string = '-created_date', limit: number = 100) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filtered = [...this.mockProperties];
        
        // Dynamic filtering for any key passed in the filters object
        if (filters) {
          filtered = filtered.filter((p: any) => 
            Object.keys(filters).every(key => p[key] === filters[key])
          );
        }
        
        // Apply sorting
        if (sortBy === '-created_date') {
          filtered.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
        } else if (sortBy === 'price') {
          filtered.sort((a, b) => a.price - b.price);
        } else if (sortBy === '-price') {
          filtered.sort((a, b) => b.price - a.price);
        }
        
        // Apply limit
        filtered = filtered.slice(0, limit);
        
        return filtered;
      }
    }
  };
}

export const base44 = new Base44Client();
