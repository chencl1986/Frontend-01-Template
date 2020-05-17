function match(string) {
  for (const char of string) {
    if (char === 'a') {
      return true;
    }
  }

  return false;
}

console.log(match('I am groot'));
console.log(match('This is not groot'));
