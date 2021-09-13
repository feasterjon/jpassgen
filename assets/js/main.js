const data = {
  "autoStart": true,
  "enableCreds": true,
  "enableHelp": true,
  "localDB": "jPasswordGen",
  "templateId": "template",
  "saveId": "flexSwitchCheckChecked",
  "outputId": "output",
  "helpContentId": "help",
  "templateFields": {
    "lengthId": "length",
    "lettersLowerId": "letters-lower",
    "lettersUpperId": "letters-upper",
    "numbersId": "numbers",
    "symbolsId": "symbols",
    "amountId": "amount"
  },
    "templateButtons": {
    "submitId": "button-generate",
    "copyId": "button-copy",
    "resetId": "button-reset",
    "helpId": "button-help"
  }
};
const jPasswordGen = new main.App.init(data);
