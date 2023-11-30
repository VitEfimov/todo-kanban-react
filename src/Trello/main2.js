const lists = document.querySelectorAll('.list');
const addBoardBtn = document.querySelector('.add_board_btn');

document.addEventListener('DOMContentLoaded', () => {
    const savedBoards = JSON.parse(localStorage.getItem('boards')) || [];
    savedBoards.forEach(savedBoard => {
        createBoard(savedBoard.title, savedBoard.items);
    });
});

function createBoard(title = 'Input Name', items = []) {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards_item');
    board.innerHTML = `
        <span contenteditable="true" class="title">${title}</span>
        <div class="list"></div>
        <div class="form">
            <textarea class="textarea" placeholder="input card name"></textarea>
            <div class="buttons">
                <button class="add_item-btn">Add card</button>
                <button class="cancel_item-btn">Decline</button>
            </div>
        </div>
        <button class="add_btn"> + Add card</button>
    `;

    boards.append(board);

    const list = board.querySelector('.list');
    items.forEach(itemText => {
        const newItem = createListItem(itemText);
        list.appendChild(newItem);
    });

    changeTitle(board);
    dragAndDrop();
    addTask(board);
}

function createListItem(text) {
    const newItem = document.createElement('div');
    newItem.classList.add('list_item');
    newItem.draggable = true;
    newItem.textContent = text;
    return newItem;
}

function addTask(board) {
    const btn = document.querySelector('.add_btn');
    const addBtn = document.querySelector('.add_item-btn');
    const cancelBtn = document.querySelector('.cancel_item-btn');
    const textArea = document.querySelector('.textarea');
    const form = document.querySelector('.form');

    let value;

    btn.addEventListener('click', () => {
        form.style.display = 'block';
        btn.style.display = 'none';
        addBtn.style.display = 'none';

        textArea.addEventListener('input', e => {
            value = e.target.value;
            if (value) {
                addBtn.style.display = 'block';
            } else {
                addBtn.style.display = 'none';
            }
        });
    });

    cancelBtn.addEventListener('click', () => {
        textArea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';
    });

    addBtn.addEventListener('click', () => {
        const newItem = createListItem(value);
        const list = document.querySelector('.list');
        list.appendChild(newItem);

        textArea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';

        updateLocalStorage();
        dragAndDrop();
    });
}

function changeTitle(board) {
    const title = document.querySelector('.title');
    title.addEventListener('click', () => {
        title.textContent = '';
        updateLocalStorage();
    });
}

function dragAndDrop() {
    const listItems = document.querySelectorAll('.list_item');
    const lists = document.querySelectorAll('.list');

    listItems.forEach(item => {
        item.addEventListener('dragstart', () => {
            dragedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        });

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
                dragedItem = null;
                updateLocalStorage();
            }, 0);
        });
    });

    lists.forEach(list => {
        list.addEventListener('dragover', e => e.preventDefault());

        list.addEventListener('dragenter', function (e) {
            e.preventDefault();
            this.style.backgroundColor = 'rgba(0,255,0,.3)';
        });

        list.addEventListener('dragleave', function () {
            this.style.backgroundColor = 'rgba(0,0,0,.0)';
        });

        list.addEventListener('drop', function () {
            this.style.backgroundColor = 'rgba(0,0,0,.0)';
            this.appendChild(dragedItem);
            updateLocalStorage();
        });
    });
}

function updateLocalStorage() {
    const boards = document.querySelectorAll('.boards_item');
    const boardsData = [];

    boards.forEach(board => {
        const title = board.querySelector('.title').textContent;
        const items = [...board.querySelectorAll('.list_item')].map(item => item.textContent);
        boardsData.push({ title, items });
    });

    localStorage.setItem('boards', JSON.stringify(boardsData));
}

addTask();
dragAndDrop();

addBoardBtn.addEventListener('click', () => createBoard());
