import { createStore } from "redux";

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("p")

number.innerText = 0;
const countModifier = (count=0, action) => {
    
    if (action.type === "ADD") {
        return count + 1;
    } else if (action.type ==="MINUS") {
        return count - 1;
    } else {
        return count;
    }
};

const countStore = createStore(countModifier);



const onChange = () => {
    number.innerText = countStore.getState();
};

// subscribe: store 안에 있는 변화 감지, store.subscribe(함수)// store 변화 시에 함수 자동 실행

countStore.subscribe(onChange);

const handleAdd = () => {
    countStore.dispatch({type:"ADD"})
}

const handleMinus = () => {
    countStore.dispatch({type:"MINUS"})
}

add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)
