/**
 * Collection of all photo URLs used throughout the project
 * Each URL is grouped by the file it appears in
 */

export const photos = {
  // Photos from Home.tsx
  home: {
    hero: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Hero section image
    testimonials: {
      emily: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Emily Johnson testimonial
      michael: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Michael Chen testimonial
      sarah: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Sarah Williams testimonial
    }
  },

  // Photos from HowItWorks.tsx
  howItWorks: {
    createAccount: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Create account step
    findTutor: "https://images.pexels.com/photos/4144101/pexels-photo-4144101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Find tutor step
    scheduleSessions: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Schedule sessions step
    learnGrow: "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Learn and grow step
    leaveReview: "https://images.pexels.com/photos/7129701/pexels-photo-7129701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Leave review step
  },

  // Photos from About.tsx
  about: {
    team: "https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Team image
    ceo: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // CEO photo
    cto: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // CTO photo
    coo: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // COO photo
  },

  // Photos from tutors.ts (mock and real data)
  tutors: {
    female1: "https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=600", // Жанна Смит аватар
    male1: "https://images.pexels.com/photos/5384445/pexels-photo-5384445.jpeg?auto=compress&cs=tinysrgb&w=600", // Иван Петров аватар
    female2: "https://images.pexels.com/photos/3783952/pexels-photo-3783952.jpeg?auto=compress&cs=tinysrgb&w=600",
    male2: "https://images.pexels.com/photos/6325984/pexels-photo-6325984.jpeg?auto=compress&cs=tinysrgb&w=600",
    female3: "https://images.pexels.com/photos/7242744/pexels-photo-7242744.jpeg?auto=compress&cs=tinysrgb&w=600",
    male3: "https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=600",
    female4: "https://images.pexels.com/photos/8363042/pexels-photo-8363042.jpeg?auto=compress&cs=tinysrgb&w=600",
    male4: "https://images.pexels.com/photos/4342401/pexels-photo-4342401.jpeg?auto=compress&cs=tinysrgb&w=600",
    female5: "https://images.pexels.com/photos/5212692/pexels-photo-5212692.jpeg?auto=compress&cs=tinysrgb&w=600",
    male5: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg?auto=compress&cs=tinysrgb&w=600",
  },

  // Generic placeholder avatars that can be used for profiles
  placeholders: {
    avatar1: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1",
    avatar2: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1",
    avatar3: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1",
    avatar4: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=128&h=128&dpr=1",
    defaultAvatar: "https://via.placeholder.com/128x128?text=User",
  }
};

export default photos;
