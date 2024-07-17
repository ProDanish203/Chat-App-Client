export const convertImage = async (file: File): Promise<string> => {
  const reader = new FileReader();
  await new Promise<void>((resolve, reject) => {
    reader.onload = () => {
      resolve();
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });

  return reader.result as string;
};

export const convertDateToYYYYMMDD = (date: any) => {
  const jsDate = new Date(date);

  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(jsDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
export const getFileType = (url: string) => {
  // @ts-ignore
  // const extension = url.split(".").pop().toLowerCase();
  // if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) return "image";
  // if (["mp4", "webm", "ogg"].includes(extension)) return "video";
  // if (["mp3", "wav", "ogg"].includes(extension)) return "audio";
  // return "other";
  const extension = url.split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension ?? ""))
    return "image";
  if (["mp4", "webm"].includes(extension ?? "")) return "video";
  if (["mp3", "wav"].includes(extension ?? "")) return "audio";
  if (extension === "ogg") return "audio";
  return "other";
};
