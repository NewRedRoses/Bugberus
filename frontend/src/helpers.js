// Does not work with irregular plurals
const handlEnglisheWordingForMultiples = (word, size) => {
  if (size <= 0) {
    return `No ${word}s`;
  } else if (size == 1) {
    return `1 ${word}`;
  } else {
    return `${size} ${word}s`;
  }
};

export { handlEnglisheWordingForMultiples };
