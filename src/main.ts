import "./style.css";
import axios from "axios";
import jsonPlaceholderService from "./services.ts";
import { INewPost, IPost } from "./types.ts";

// Типизируйте addForm с помощью Generic, чтобы его тип стал HTMLFormElement | null
const addForm = document.querySelector<HTMLFormElement>(".add-form");

// Типизируйте input-ы с помощью Generic, чтобы его тип стал HTMLInputElement | null
const titleInput = document.querySelector<HTMLInputElement>(".title");
const bodyInput = document.querySelector<HTMLInputElement>(".body");

// Типизируйте posts с помощью Generic, чтобы его тип стал HTMLDivElement | null
const postsDiv = document.querySelector<HTMLDivElement>(".posts");

const addPostToPostsDiv = (post: IPost) => {
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

const handleError = (error: unknown) => {
  // Типизируйте error
  if (axios.isAxiosError(error)) {
    console.log("error message: ", error.message);

    return error.message;
  } else if (error instanceof Error) {
    console.log("unexpected error: ", error.message);

    return "An unexpected error occurred";
  } else {
    console.log("error message: ", error);

    return "An unexpected error occurred";
  }
};

const getPosts = async () => {
  try {
    let posts: IPost[] = [];

    const response = await jsonPlaceholderService.getPosts();

    posts = response.data; // Переделать на деструктуризацию, избавиться от let posts: IPost[] = [];

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
      const newPost: INewPost = {
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
