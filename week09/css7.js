let linkIndex = 4;

copy(
  (
    document.querySelector('#Specifications') ||
    document.querySelector('#Specification')
  ).nextElementSibling
    .querySelectorAll('tbody tr')
    [linkIndex].children[0].querySelector('a')
    .getAttribute('href'),
);

// linkIndex++;
