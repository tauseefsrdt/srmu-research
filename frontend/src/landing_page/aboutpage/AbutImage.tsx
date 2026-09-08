const images = [
  "Images/5.png",
  "Images/6.png",
  "Images/7.png",
  "Images/8.png",
  "Images/9.png",
  "Images/10.png",
  "Images/11.png",
  "Images/12.png",
  "Images/13.png",
  "Images/14.png",
  "Images/15.png",
  "Images/16.png",
];

function ImageRows() {
  // Group images into pairs [ [1,2], [3,4], ... ]
  const rows = [];
  for (let i = 0; i < images.length; i += 2) {
    rows.push(images.slice(i, i + 2));
  }

  
  return (
    <div className="flex flex-col gap-6 mt-5">
      {rows.map((pair, rowIndex) => (
        <div
          key={rowIndex}
          className="flex flex-col md:flex-row h-screen"
        >
          {pair.map((src, i) => (
            <div
              key={i}
              className="flex w-full md:w-1/2 h-1/2 md:h-full items-center justify-center bg-white"
            >
              <img
                src={src}
                alt={`Gallery item ${rowIndex * 2 + i + 1}`}
                className="w-70 h-80 object-cover"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ImageRows;