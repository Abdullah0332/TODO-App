const addForm = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
const clear = document.querySelector(".clear");
let LIST = [];
let data = localStorage.getItem("TODO");

const generteTemplate = (array) => {
    const html = `
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>${array}</span>
                        <i class="far fa-trash-alt delete"></i>
                    </li>
                `
    list.innerHTML += html;
}

const LoadList = (array) => {
    array.forEach(function(item){
        generteTemplate(item)
    });
}

if(data){
    LIST = JSON.parse(data);
    LoadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
}

addForm.addEventListener("submit", e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    LIST.push(todo);
    if(todo.length){
        generteTemplate(todo);
        addForm.reset();
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

list.addEventListener("click", e => {
    if(e.target.classList.contains("delete")){
        e.target.parentElement.remove();
        let a = e.target.parentElement.innerText.trim()
        let index = LIST.indexOf(a)
        console.log(index)
        LIST.splice(index,1);
        localStorage.setItem('TODO', JSON.stringify(LIST));
    }
});

search.addEventListener("keyup", () => {
    const searchvalue = search.value.trim();
    filteSearch(searchvalue);
});

const filteSearch = (searchvalue) => {
    Array.from(list.children)
        .filter((todo) => !todo.textContent.includes(searchvalue))
        .forEach((todo) => todo.classList.add("filtered"));

    Array.from(list.children)
        .filter((todo) => todo.textContent.includes(searchvalue))
        .forEach((todo) => todo.classList.remove("filtered"));
};

clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
})