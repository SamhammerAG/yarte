export type ActionsContext = {
  imageUpload: (file: File) => Promise<string>;
};