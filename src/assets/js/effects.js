/*
Title: Effects
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-20
*/

class Effects {
  
  // toggle

  toggle(el) {

    const element = document.getElementById(el);

    if (element.style.display === 'none') {
      element.style.display = '';
    }
    else {
      element.style.display = 'none';
    }
  }
}

export { Effects };
