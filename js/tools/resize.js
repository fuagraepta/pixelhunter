const resize = (frame, image) => {
  if (!image) {
    return frame;
  }

  const coefficient = image.width / image.height;
  const outOffWidth = image.width - frame.width;
  const outOffHeight = image.height - frame.height;

  const expected = {
    width: (outOffWidth >= outOffHeight) ? frame.width : Math.floor(frame.height * coefficient),
    height: (outOffHeight > outOffWidth) ? frame.height : Math.floor(frame.width / coefficient)
  };

  return expected;
};

export default resize;
