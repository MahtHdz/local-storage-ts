const allowedFileTypes = {
  "image/jpeg": {
    types: ["jpg", "jpeg", "jpe", "jif", "jfif"],
    folderInStorage: "images",
  },
  "image/png": {
    types: ["png"],
    folderInStorage: "images",
  },
  "image/gif": {
    types: ["gif"],
    folderInStorage: "images",
  },
  "text/plain": {
    types: ["txt"],
    folderInStorage: "text",
  },
  "text/html": {
    types: ["html", "htm"],
    folderInStorage: "text",
  },
  "text/css": {
    types: ["css"],
    folderInStorage: "text",
  },
  "text/javascript": {
    types: ["js"],
    folderInStorage: "text",
  },
  "text/csv": {
    types: ["csv"],
    folderInStorage: "text",
  },
  "application/pdf": {
    types: ["pdf"],
    folderInStorage: "pdf",
  },
  "application/vnd.ms-excel": {
    types: ["xls"],
    folderInStorage: "excel",
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    types: ["xlsx"],
    folderInStorage: "excel",
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    types: ["docx"],
    folderInStorage: "word",
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    types: ["pptx"],
    folderInStorage: "powerpoint",
  },
  "application/zip": {
    types: ["zip"],
    folderInStorage: "compressedFiles",
  },
  "application/x-zip-compressed": {
    types: ["zip"],
    folderInStorage: "compressedFiles",
  },
  "application/x-tar": {
    types: ["tar"],
    folderInStorage: "compressedFiles",
  },
  "application/vnd.rar": {
    types: ["rar"],
    folderInStorage: "compressedFiles",
  },
  "application/x-7z-compressed": {
    types: ["7z"],
    folderInStorage: "compressedFiles",
  },
  "application/octet-stream": {
    types: ["bin"],
    folderInStorage: "bin",
  },
};

export default allowedFileTypes;