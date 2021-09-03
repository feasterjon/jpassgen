const data = {
  "autoStart": true,
  "enableCreds": true,
  "localDB": "jPasswordGen",
  "templateId": "template",
  "saveId": "save",
  "outputId": "output",
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
    "resetId": "button-reset"
  }
};
const jPasswordGen = new main.App.init(data);
