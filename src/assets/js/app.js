class App {
  constructor() {
    this.data = {
      "autoStart": true,
      "enableCreds": true,
      "enableHelp": true,
      "localDB": "JPassGen",
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
  }
}

export { App };
