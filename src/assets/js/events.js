/*
Title: Events
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-20
*/

class Events {

  // change

  change(el, eventObject) {

    const element = document.getElementById(el);

    if (element.addEventListener) {
      element.addEventListener('change', eventObject);
    }
    else if (element.attachEvent) {
      element.attachEvent('onchange', eventObject);
    }
  }

  // click

  click(el, eventObject) {

    const element = document.getElementById(el);

    if (element.addEventListener) {
      element.addEventListener('click', eventObject);
    }
    else if (element.attachEvent) {
      element.attachEvent('onclick', eventObject);
    }
  }
}

export { Events };
