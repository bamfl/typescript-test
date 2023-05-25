import "./style.css";

const container = document.querySelector(".container");

const url = "https://jsonplaceholder.typicode.com/users";

let isLoading = false;

let users = []; // fix, не должно быть any[]

// Закончите и типизируйте функцию получения данных JSON из url.
const fetchData = () => {
  try {
    isLoading = true;
    render();

    // TODO: запрос данных (users) с сервера с помощью fetch
    // Присвоить данные в переменную users, при этом тип users не должно быть any
  } catch (error) {
    throw error;
  } finally {
    isLoading = false;
    render();
  }
};

// Получить новый массив usersWithMood из массива users, добавив каждому user св-во isGoodMood: boolean
const getUsersWithMood = (usersArr) => { // fix, не должно быть any
  return usersArr.map((user) => ({ // fix, не должно быть any
    ...user,
    isGoodMood: getRandomIntInclusive(0, 1), // fix, должно быть boolean, а не число
  }));
};

// Получить рандомное число включая min, max
const getRandomIntInclusive = (min, max) => { // fix, не должно быть any
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Render loader
const renderLoader = () => {
  container.innerHTML = ""; // fix не должно быть null

  // fix не должно быть null
  container.innerHTML = `
    <div class='loading'>
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  `;
};

// Выведите данные в виде карточек с классом .user-item в html
const renderUsersWithMood = (usersWithMood) => { // fix, не должно быть any
  container.innerHTML = ""; // fix не должно быть null

  usersWithMood.forEach((user) => { // fix, не должно быть any
    // fix не должно быть null
    container.innerHTML += `
        <div class="user-item">
        <div class="row justify-between items-center">
          <div>
            <div>UserItem {{ Вывести id }}</div>
            <p>{{ Вывести name }}</p>
            <p>{{ Вывести email }}</p>
          </div>
          <button>{{ Вывести "Good mood" or "Bad mood" в зависимости от isGoodMood}}</button>
        </div>
      </div>
    `;
  });
};

const render = () => {
  if (isLoading) {
    renderLoader();
    return;
  }

  const usersWithMood = getUsersWithMood(users); // fix, не должно быть any[]

  renderUsersWithMood(usersWithMood); // fix, не должно быть any
};

const onMounted = async () => {
  await fetchData();
};

onMounted();
