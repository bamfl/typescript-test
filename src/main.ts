import "./style.css";
import axios from "axios";
import jsonPlaceholderService from "./services.ts";
// Импортировать типы

// Типизируйте addForm с помощью Generic, чтобы его тип стал HTMLFormElement | null
const addForm = document.querySelector(".add-form");

// Типизируйте input-ы с помощью Generic, чтобы его тип стал HTMLInputElement | null
const titleInput = document.querySelector(".title");
const bodyInput = document.querySelector(".body");

// Типизируйте posts с помощью Generic, чтобы его тип стал HTMLDivElement | null
const postsDiv = document.querySelector(".posts");

// Типизируйте post
const addPostToPostsDiv = (post) => {
  if (postsDiv) {
    postsDiv.innerHTML += `
      <div class="post mb-20">
        <div class="row justify-between">
          <div>Title: ${post.title.toUpperCase()}</div>
          <div>ID: ${post.id}</div>
        </div>
        <div>Body: ${post.body}</div>
      </div>
    `;
  }
};

// Типизируйте error
const handleError = (error: unknown) => {
  // Проверьте, является ли axios.isAxiosError(error), тогда верните message из error
  // Проверьте, является ли instanceof Error тогда верните message из error
  // Иначе верните строку "An unexpected error occurred"
};

const getPosts = async () => {
  try {
    let posts = []; // Типизируйте posts

    // Типизируйте jsonPlaceholderService.getPosts(), он должен возврать Promise<AxiosResponse<IPost[], any>>
    const response = await jsonPlaceholderService.getPosts();

    posts = response.data; // posts должен получиться типом IPost массивом

    if (postsDiv) postsDiv.innerHTML = "";

    posts = posts.filter((post) => post.id > 98);

    posts.forEach(addPostToPostsDiv);
  } catch (error: unknown) {
    handleError(error);
  }
};

const addPost = async () => {
  try {
    if (titleInput && bodyInput) {
      const newPost = { // Тип нового поста INewPost
        title: titleInput.value,
        body: bodyInput.value,
        userId: 1,
      };

      const response = await jsonPlaceholderService.addPost(newPost);

      const post = response.data; // Переделать на деструктуризацию

      addPostToPostsDiv(post);
      addForm?.reset();
    }
  } catch (error: unknown) {
    handleError(error);
  }
};

if (addForm) {
  addForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    await addPost();
  });
}

const onMounted = async () => {
  await getPosts();
};

onMounted();
