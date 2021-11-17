/*
Title: Effects
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-11-17
*/

class Effects {
  
  // toggle

  toggle(element) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    
    if (el.style.display === 'none') {
      el.style.display = '';
    }
    else {
      el.style.display = 'none';
    }
  }
}

export { Effects };
