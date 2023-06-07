// Создать перечисления типов контента ContentTypes со значениями: "application/json", "multipart/form-data", "text/html"
export enum ContentTypes {
  APPLICATION_JSON = "application/json",
  FORM_DATA = "multipart/form-data",
  TEXT_HTML = "text/html",
}

export interface INewPost {
  title: string;
  body: string;
  userId: number;
}

export interface IPost extends INewPost {
  id: number;
}
