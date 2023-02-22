const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const itemClear = document.querySelector('#clear');

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

//Remove Item
const removeItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        e.target.parentElement.parentElement.remove();
    }
}

//Remove all items
const removeAllItems = (e) => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
}

//Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemClear.addEventListener('click', removeAllItems)
