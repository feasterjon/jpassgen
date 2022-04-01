/*
Title: Interaction
Author: Jonathan Feaster, JonFeaster.com
Date: 2022-03-30
*/

export class Interaction {

  // copy to clipbord

  copyClip(element, copyElement, text, milliseconds) {
    
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];

    el.select();
    el.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(el.value);
    this.feedback(copyElement, text, milliseconds);
  }
  
  // feedback

  feedback(element, text, milliseconds = 1000) {
  
    const el = document.querySelectorAll(
      element + ', #' + element + ', .' + element
    )[0];
    
    if (el) {
      let defaultTxt = el.textContent;
      let hasInnerText = defaultTxt ? true : false;
      if (!hasInnerText) {
        defaultTxt = el.value;
      }
      el.disabled = true;
      if (text) {
        hasInnerText === true ?
        el.textContent = text
        : el.value = text;
      }
      el.focus();
      setTimeout(() => {
        hasInnerText === true ?  
        el.textContent = defaultTxt
        : el.value = defaultTxt;
        el.disabled = false;
      }, milliseconds);
    }
  }
}
