import { PlaceHolderImages } from '@/lib/placeholder-images';

// Data for randomization
export const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Katie', 'Michael', 'Sarah', 'David', 'Laura'];
export const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez'];
export const usCities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA'];
export const worldCities = ['London, UK', 'Toronto, CA', 'Sydney, AU', 'Berlin, DE', 'Tokyo, JP'];

export const testimonials = [
  {
    quote: 'This course was a game-changer for my financial literacy. The instructor breaks down complex topics into easy-to-understand lessons. Highly recommended!',
    imageId: 'testimonial-avatar-1'
  },
  {
    quote: 'I finally feel in control of my money. The budgeting strategies are practical and have made a huge difference in my savings.',
    imageId: 'testimonial-avatar-2'
  },
  {
    quote: 'The advanced investing strategies were exactly what I was looking for. I feel much more confident in my ability to manage my portfolio.',
    imageId: 'testimonial-avatar-3'
  },
  {
    quote: 'I went from being afraid of the stock market to making my first investment. This course is perfect for absolute beginners.',
    imageId: 'testimonial-avatar-4'
  },
  {
    quote: 'The real estate investing module was fantastic. I now have a clear roadmap to buying my first rental property.',
    imageId: 'testimonial-avatar-5'
  },
  {
    quote: 'An amazing deep dive into the world of crypto. I feel like I finally understand the technology and the investment opportunities.',
    imageId: 'testimonial-avatar-6'
  },
];

// Function to generate random reviewer details
export const generateRandomReviewer = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const nameFormat = Math.random();
    let name;
    if (nameFormat < 0.33) {
        name = firstName;
    } else if (nameFormat < 0.66) {
        name = `${firstName} ${lastName}`;
    } else {
        name = `${firstName} ${lastName.charAt(0)}.`
    }

    const isUsa = Math.random() < 0.85;
    const location = isUsa 
        ? usCities[Math.floor(Math.random() * usCities.length)] 
        : worldCities[Math.floor(Math.random() * worldCities.length)];

    const rating = Math.random() * (5 - 4.3) + 4.3; // Random rating between 4.3 and 5

    return { name, location, rating };
}
