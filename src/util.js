const shuffleArray = (array) => {
  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = array[randomIndex];

    array[randomIndex] = array[i];
    array[i] = itemAtIndex;
  }
  return array;
}

module.exports = {
  shuffleArray
}
