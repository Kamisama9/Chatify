const ImageUpload = async (file) => {
  return new Promise(async (resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD}/image/upload`,
        {
          method: "post",
          body: data,
        }
      );

      if (!res.ok) {
        reject("Error uploading image: " + res.statusText);
        return;
      }

      const value = await res.json();
      resolve(value.secure_url);
    } catch (error) {
      reject("Error uploading image: " + error.message);
    }
  });
};

export default ImageUpload;
