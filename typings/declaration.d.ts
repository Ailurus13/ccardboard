/*
  Sass module for styling
  https://stackoverflow.com/questions/56563243/how-to-import-a-scss-file-into-a-typescript-file
*/
declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}
