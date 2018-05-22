self.onmessage = (e) => {
  const data = e.data;

  const bitmapOptions = {
    resizeQuality: 'pixelated',
    resizeWidth: typeof data.width === 'number' ? data.width : undefined,
    resizeHeight: typeof data.height === 'number' ? data.height : undefined
  };

  createImageBitmap(data.blob, bitmapOptions)
    .then(bitmap => self.postMessage({ bitmap }));
};
