import axios from "axios";
import { ContentTypes, INewPost, IPost } from "./types";

const config = {
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": ContentTypes.APPLICATION_JSON,
    Accept: ContentTypes.APPLICATION_JSON,
  },
};

const httpClient = axios.create(config);

class JSONPlaceholderService {
  async getPosts() {
    // Типизируйте метод get с помощью Generic и типом IPost чтобы возвращаемый тип был Promise<AxiosResponse<IPost[], any>>
    return await httpClient.get<IPost[]>("/posts");
  }

  async addPost(post: INewPost) {
    // Типизируйте метод get с помощью Generic и типом IPost чтобы возвращаемый тип был Promise<AxiosResponse<IPost, any>>
    return await httpClient.post<IPost>("/posts", post);
  }
}

export default new JSONPlaceholderService();
