import axios from "axios";
// Импортировать типы

const config = {
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json", // заменить на перечисление
    Accept: "application/json", // заменить на перечисление
  },
};

const httpClient = axios.create(config);

class JSONPlaceholderService {
  async getPosts() {
    // Типизируйте метод get с помощью Generic и типом IPost чтобы возвращаемый тип был Promise<AxiosResponse<IPost[], any>>
    return await httpClient.get("/posts");
  }

  async addPost(post) {
    // Типизировать INewPost
    // Типизируйте метод get с помощью Generic и типом IPost чтобы возвращаемый тип был Promise<AxiosResponse<IPost, any>>
    return await httpClient.post("/posts", post);
  }
}

export default new JSONPlaceholderService();
