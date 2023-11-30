const lists = document.querySelectorAll('.list');
const addBoardBtn = document.querySelector('.add_board_btn');

function addTask() {
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

    })
    addBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.classList.add('list_item');
        newItem.draggable = true;
        newItem.textContent = value;
        lists[0].append(newItem);
        // form.style.display = 'none';

        textArea.value = '';
        value = '';
        form.style.display = 'none';
        btn.style.display = 'flex';

        dragAndDrop();

    })
};

addTask();

function addBoard() {
    const boards = document.querySelector('.boards');
    const board = document.createElement('div');
    board.classList.add('boards_item');
    board.innerHTML = `
    <span contenteditable="true" class="title" >Input Name</span>
    <div class="list"></div>
    <div class="form">

    <textarea class="textarea" placeholder="input card name"></textarea>
    <div class="buttons">
        <button class="add_item-btn">Add card</button>
        <button class="cancel_item-btn">Dicline</button>
    </div>
</div>

<button class="add_btn"> + Add card</button>
`;
    boards.append(board);

    changeTitle();
    // addTask();

}
addBoardBtn.addEventListener('click', addBoard);

function changeTitle() {
    const titles = document.querySelectorAll('.title');
    titles.forEach(title => {
        title.addEventListener('click', e => e.target.textContent = '')
    })
}

changeTitle();
dragAndDrop();


let dragedItem = null;
function dragAndDrop() {
    const listItems = document.querySelectorAll('.list_item');
    const lists = document.querySelectorAll('.list');

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];

        item.addEventListener('dragstart', () => {
            dragedItem = item;
            setTimeout(() => {
                item.style.display = 'none';
            }, 0);
        })

        item.addEventListener('dragend', () => {
            setTimeout(() => {
                item.style.display = 'block';
                dragedItem = null;
            }, 0);
        })

        item.addEventListener('dblclick', () => {
            item.remove();
        })

        for (let j = 0; j < lists.length; j++) {
            const list = lists[j];

            list.addEventListener('dragover', e => e.preventDefault());

            list.addEventListener('dragenter', function (e) {
                e.preventDefault();
                this.style.backgroundColor = 'rgba(0,255,0,.3)'
            })

            list.addEventListener('dragleave', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0,.0)'
            })

            list.addEventListener('drop', function (e) {
                this.style.backgroundColor = 'rgba(0,0,0,.0)'
                this.append(dragedItem);

            })
        }
    };

};
dragAndDrop();