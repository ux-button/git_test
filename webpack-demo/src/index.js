import _ from 'lodash';
import myName from './myName';

function component() {
    const element = document.createElement('div');

    // use your function!
    element.textContent = myName('Cody');
  
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
    return element;
  }
  
  document.body.appendChild(component());