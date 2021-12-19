import { createStore } from "redux";

const add = document.getElementById("add")
const minus = document.getElementById("minus")
const number = document.querySelector("p")

number.innerText = 0;

//변수를 선언함으로써 더 안정성 있게!
const ADD = "ADD"
const MINUS = "MINUS"

const countModifier = (count=0, action) => {

    switch(action.type) {
        case ADD:
            return count + 1;
        case MINUS:
            return count -1;
        default:
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
    countStore.dispatch({type:ADD})
}

const handleMinus = () => {
    countStore.dispatch({type:MINUS})
}

add.addEventListener("click", handleAdd)
minus.addEventListener("click", handleMinus)
