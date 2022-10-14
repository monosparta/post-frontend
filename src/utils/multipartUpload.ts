import Uppy from "@uppy/core";
import type { UppyOptions } from "@uppy/core";
import AwsS3Multipart from "@uppy/aws-s3-multipart";

export const useUploader = (
  options: UppyOptions = {
    restrictions: {
      maxNumberOfFiles: 1,
    },
  }
): Uppy => {
  const uppy = new Uppy(options);

  uppy.use(AwsS3Multipart, {
    limit: options.restrictions?.maxNumberOfFiles ?? 1,
    companionUrl: `${import.meta.env.VITE_APP_API_URL}`,
  });

  return uppy;
};

export const decodeUploaded = (elForUploadedFiles: any) => {
  const { response, name: fileName } = elForUploadedFiles;
  const url = response.uploadURL;
  const fileUrl = response.uploadURL.replace(/(.*)amazonaws.com\//, "");
  return {
    url,
    fileUrl: decodeURIComponent(fileUrl),
    fileName,
  };
};

export const validateImageType =
  (
    formInitValue: any = null,
    supported: string[] = ["image/jpg", "image/jpeg", "image/png"]
  ) =>
  (value: any) => {
    if (!(value instanceof File)) return true;

    return value ? supported.includes(value.type) : true;
  };
