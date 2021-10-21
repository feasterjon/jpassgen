/*
Title: Interaction
Author: Jonathan Feaster, JonFeaster.com
Date: 2021-10-20
*/

class Interaction {

  // copy to clipbord

  copyClip(id, copyId) {

    const element = document.getElementById(id);

    element.select();
    element.setSelectionRange(0, 99999); /* For mobile devices */
    navigator.clipboard.writeText(element.value);
    if (typeof(copyId) !== 'undefined') {
      const copyElement = document.getElementById(copyId);
      const defaultInnerHTML = copyElement.innerHTML;
      copyElement.disabled = true;
      copyElement.innerHTML = "Copied!";
      copyElement.focus();
      setTimeout(function(){
        copyElement.innerHTML = defaultInnerHTML;
        copyElement.disabled = false;
      }, 1000);
    }
  }
}

export { Interaction };
