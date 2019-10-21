const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};

// Dom elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// Event Handlers
generateEl.addEventListener("click", () => {
  const length = parseInt(lengthEl.value);
  const hasLowercase = lowercaseEl.checked;
  const hasUppercase = uppercaseEl.checked;
  const hasNumber = numberEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerHTML = generatePassword(
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSymbol,
    length
  );
});

clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) return;

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("copied to clipboard");
});

// Generator functions

function getRandomLower() {
  /**
   * Explain the logic:
   * Checkout the link http://www.net-comber.com/charset.html for the code of lowercase characters
   * The code ranges from 97 to 122 (26 characters).
   * We generate a random number (ranges from 0 to 26) then add with 97
   * So that the result would range from 97 to 122 (which we expect)
   */
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  /**
   * Explain the logic:
   * It is the same with getRandomLower()
   * But the code of characters ranges from 65 to 90
   */
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  /**
   * Explain the logic:
   * It is the same with getRandomLower()
   * But the code of characters ranges from 48 to 57 (0, 1, 2, ...9)
   */
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  /**
   * Explain the logic:
   * We have a symbols string '!@#$%^&*(){}=<>/,.'
   * Then we can get a symbol character of the string like the case of an array
   * exp: symbols[0] would return the first character of the symbols string.
   * So we can get a random symbol by a random index.
   */
  const symbols = "!@#$%^&*()<>{}[]=/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(lower, upper, number, symbol, length) {
  /**
   * Explain the logic:
   * Init the password variable
   * Filter out unchecked type(s)
   * Loop over the length and call the generator function
   * Add final password to the password variable and return
   */
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArray = [{ lower }, { upper }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  );

  if (typesCount === 0) return "Dis*mie*may";

  for (let i = 0; i < length; i += typesCount) {
    typesArray.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
}
