import './style.css';
import restaurantImage from './static/restaurant_image.jpg';

// Add image by JS
const containerRestaurantImage = new Image();
containerRestaurantImage.src = restaurantImage;
document.getElementById('content').appendChild(containerRestaurantImage);

