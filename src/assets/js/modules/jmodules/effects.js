/*
Title: Effects
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-03-30
*/

export class Effects {
  
  // toggle

  toggle(element) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    
    el.style.display === 'none' ?
    el.style.display = ''
    : el.style.display = 'none';
  }
}
