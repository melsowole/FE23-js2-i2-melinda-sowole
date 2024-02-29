export function stringToKebab(string) {
  const kebabString = string.split(" ").join("-");
  return kebabString;
}

export function create(tagName, classes, textContent, parent) {
  const element = document.createElement(tagName);

  if (classes) {
    if (typeof classes == "string") {
      classes = [classes];
    }

    for (let cls of classes) {
      if (cls.includes(" ")) {
        cls = stringToKebab(cls);
      }
      element.classList.add(stringToKebab(cls));
    }
  }

  if (textContent) element.textContent = textContent;

  if (parent) parent.append(element);

  return element;
}
