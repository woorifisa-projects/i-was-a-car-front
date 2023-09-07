export const multipartFormDataFileList = (formData, files, dataName) => {
  if (files !== null) {
    Array.from(files).forEach((file) => {
      formData.append(dataName, file);
    });
  }

  return formData;
};

export const multipartFormDataFile = (formData, file, dataName) => {
  if (file !== null) {
    formData.append(dataName, file);
  }
  return formData;
};

export const multipartFormDataJson = (formData, data, dtoName) => {
  formData.append(
    dtoName,
    new Blob([JSON.stringify(data)], {
      type: 'application/json',
    })
  );

  return formData;
};
