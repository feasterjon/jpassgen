/*
Title: Events
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-12-09
*/

class Events {
  
  // blur

  blur(element, eventObject) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];

    if (el.addEventListener) {
      el.addEventListener('blur', eventObject);
    }
    else if (el.attachEvent) {
      el.attachEvent('onblur', eventObject);
    }
  }

  // change

  change(element, eventObject) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];

    if (el.addEventListener) {
      el.addEventListener('change', eventObject);
    }
    else if (el.attachEvent) {
      el.attachEvent('onchange', eventObject);
    }
  }

  // click

  click(element, eventObject) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];

    if (el.addEventListener) {
      el.addEventListener('click', eventObject);
    }
    else if (el.attachEvent) {
      el.attachEvent('onclick', eventObject);
    }
  }
}

export { Events };
