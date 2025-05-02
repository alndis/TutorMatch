import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Generate star rating UI
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 text-amber-500 fill-current" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 text-amber-500 fill-current" />);
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }
    
    return stars;
  };
  
  // Форматирование даты
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.userName}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {review.userName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-800">{review.userName}</h4>
              <div className="flex items-center mt-1">
                {renderStars(review.rating)}
              </div>
            </div>
            <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
          </div>
          
          <p className="mt-3 text-gray-600">{review.comment}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;