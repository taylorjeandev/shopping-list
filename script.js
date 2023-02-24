const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

//Display Items on Page Load
function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
    checkUI();
}

//Add Item Function
function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value;

    //Check for edit mode
    if (isEditMode) {
        const itemToEdit = document.querySelector('.edit-mode')

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if (checkIfItemExists(newItem)) {
            alert('That item already exists');
            return;
        }
    }

    //Validate Input
    if (newItem === '') {
        alert('Please add a value')
        return;
    }
    addItemToDOM(newItem);
    addItemToStorage(newItem);
    checkUI();

    itemInput.value = '';
}

function addItemToDOM(item) {
    //Create List Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item btn-link text-red");
    li.appendChild(button);

    //Add li to the DOM
    itemList.appendChild(li);
}

//Add Items to Local Storage
function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    // Add new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//Get items From Local Storage
function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
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

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target)
    }
}

function setItemToEdit(item) {
    isEditMode = true;

    itemList.querySelectorAll('li')
        .forEach(i => i.classList.remove('edit-mode'));


    item.classList.add('edit-mode')



    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;

}

//Remove Item
function removeItem(item) {
    if (confirm('Are you sure?')) {
        item.remove();

        removeItemFromStorage(item.textContent)

        checkUI();
    }

}

//Check for Duplicates
function checkIfItemExists(item) {
    const itemsFromStorage = getItemsFromStorage();

    return itemsFromStorage.includes(item);
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemsFromStorage();

    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    //Reset local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

//Remove all items
function removeAllItems(e) {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('items')

    checkUI();
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach(item => {
        const itemName = item.firstChild.textContent;
        if (itemName.toLowerCase().indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    })
    console.log(text);
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    itemInput.value = ''

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    formBtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item"
    formBtn.style.backgroundColor = '#333'
    isEditMode = false;
}

function init() {
    //Event Listeners
    itemForm.addEventListener('submit', onAddItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', removeAllItems);
    itemFilter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems);

    checkUI();
}

init();
