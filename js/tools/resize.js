const resize = (frame, image) => {

  const coefficient = image.width / image.height;

  const actualWidth = ((frame.width / coefficient) < frame.height)
    ? frame.width : frame.height * coefficient;

  const actualHeight = ((frame.width / coefficient) < frame.height)
    ? frame.width / coefficient : frame.height;

  return {
    width: actualWidth,
    height: actualHeight
  };
};

const preloadImage = (answer) => {
  const image = new Image();

  image.addEventListener(`load`, () => {
    const imgSize = {
      width: image.width,
      height: image.height
    };
    image.width = resize(answer.image, imgSize).width;
    image.height = resize(answer.image, imgSize).height;
  });
  image.src = answer.image.url;
  return {
    img: image,
    type: answer.type.slice(0, 5)
  };
};

export {resize, preloadImage};
