/*
Title: Events
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-28
*/

class Events {

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
