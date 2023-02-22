const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');

//Add Item Function
const addItem = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

    if (newItem === '') {
        alert('Please add a value')
        return;
    }
    console.log('success');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);
    itemList.appendChild(li);
    itemInput.value = '';
}

//Create Button Function
const createButton = (classes) => {
    const button = document.createElement('button');
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon);
    button.className = classes;
    return button;
};

//Create Icon
const createIcon = (classes) => {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}

//Event Listeners
itemForm.addEventListener('submit', addItem)
