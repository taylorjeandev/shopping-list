const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


//Add Item Function
const onAddItemSubmit = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

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

function addItemToStorage(item) {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItems('items'));
    }

    itemsFromStorage.push(item);

    //Convert to JSON String and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));

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
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
            checkUI();
        }

    }

}

//Remove all items
const removeAllItems = (e) => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    }
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

    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    if (itemList.includes) {

    }
}

//Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', removeAllItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
