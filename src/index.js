import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
    return {
      type: ADD_TODO,
      text
    };
  };
  
  const deleteToDo = id => {
    return {
      type: DELETE_TODO,
      id
    };
  };
  
const reducer = (state = [], action) => {
    switch(action.type){
        // todo list를 추가
        case ADD_TODO:
            const newToDoObj = { text: action.text, id: Date.now() };
            console.log(action.id);
            return [newToDoObj, ...state];
            
        // todo list를 제거
        case DELETE_TODO:{
        //삭제해야 할 toDO의 id가 없는 array를 반환
        // 예를 들어 1, 2, 3, 4, 5가 있으면 deleteTodo의 id 값이 state의 id를 돌며 하나씩 대조하여 id값이 같은 것을 제외한 새로운 array를 반환하게 되면 toDo가 정상적으로 유지된다.
            const cleaned = state.filter(toDo => toDo.id !== action.id);
            console.log(action.id);
            return cleaned;
        }
        default:
            return state
    }
};

// store 생성
const store = createStore(reducer)


store.subscribe(() => console.log(store.getState()))

// text 인자는 밑에 onSubmit 함수에서 toDO를 받아 ul에 append 해주는 방식으로 작동
const dispatchAddToDo = text => {
    store.dispatch(addToDo(text));
  };
  
  const dispatchDeleteToDo = e => {
    const id = parseInt(e.target.parentNode.id);
    store.dispatch(deleteToDo(id));
  };
  
  const paintToDos = () => {
    const toDos = store.getState();
    ul.innerHTML = "";
    toDos.forEach(toDo => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.innerText = "DEL";
      btn.addEventListener("click", dispatchDeleteToDo);
      li.id = toDo.id;
      li.innerText = toDo.text;
      li.appendChild(btn);
      ul.appendChild(li);
    });
  };
  
  store.subscribe(paintToDos);
  

  const onSubmit = e => {
    e.preventDefault();
    const toDo = input.value;
    input.value = "";
    dispatchAddToDo(toDo);
  };


form.addEventListener("submit", onSubmit);