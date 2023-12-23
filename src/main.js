//constants.js
const cell = document.querySelectorAll('.cell')
const ABC = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];
//elements.js
let main = document.getElementById('main');
//logic.js
function setUp() {
    randomTitleColor();
    generateTable(6, 4);
    settings();
    generateKeyBoard();
    keyboardWriting();

}

function keyboardWriting() {
  const keyboardContainer = document.getElementById('keyboardContainer');

  keyboardContainer.addEventListener('click', (event) => {
    const target = event.target;
    const cells = document.querySelectorAll('.cell');

    // Check if the clicked element is a key within the keyboard
    if (target.classList.contains('key-1') || target.classList.contains('key-2') || target.classList.contains('key-3')) {
      cells.forEach(cell => {
        cell.textContent = target.textContent; 
        cell.style.borderColor = '#a7adc0';
        cell.style.borderWidth = '3px';
      });
    }
  });
}

function randomTitleColor() {
    function changeColor() {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      const title = document.getElementById("title");
      title.style.color = "#" + randomColor;
    }
  
    setInterval(changeColor, 1000);
  }

function generateTable(rows, cols) {
    let tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    let table = document.createElement('div');
    table.classList.add('table');

    for (let i = 0; i < rows; i++) {
      let row = document.createElement('div');
      row.classList.add('row');

      for (let j = 0; j < cols; j++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.innerHTML = ``;
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    tableContainer.appendChild(table);
}
//Instead modify the code above, make a switch or an if statement to changes the table size based on the number of rows and columns.




function  generateKeyBoard() {
    let keyboardContainer = document.getElementById('keyboardContainer');
    keyboardContainer.innerHTML = '';
    let keyboard = createKeyboard();    

    keyboard.appendChild(createRow('row-1', ABC[0], 'key-1'));
    keyboard.appendChild(createRow('row-2', ABC[1], 'key-2'));
    keyboard.appendChild(rowWithSpecialKeys());
    
    keyboardContainer.appendChild(keyboard);

  }

function createRow(rowClass, letters, keyClass) {
  const row = document.createElement('div');
  row.classList.add(rowClass);

for(const letter of letters){
  let key = document.createElement('div');
  key.classList.add(keyClass);
  key.innerHTML = letter;
  row.appendChild(key);
}
  return row
}

function rowWithSpecialKeys() {
const row = document.createElement('div');
row.classList.add('row-3');

row.appendChild(createSpecialKeys('./assets/backspace.svg', 'backspace', 'key-3-backspace'));

  for(const letter of ABC[2]) {
    let key = document.createElement('div');
    key.classList.add('key-3');
    key.innerHTML = letter;
    row.appendChild(key);
  }
  row.appendChild(createSpecialKeys('./assets/enter.svg', 'enter', 'key-3-enter'));

  return row
}

function createSpecialKeys(keyPath, altText, keyClass) {
 const key = document.createElement('div')
  key.classList.add(keyClass);
  key.innerHTML = `<img src="${keyPath}" alt="${altText}">`;
  return key
}

function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  return keyboard
}


let isPanelDisplayed = false;
function settings() {
  let settingsContainer = document.getElementById('options');
  let settingsButton = createOptionButton('./assets/settings.svg', 'settings',);
  settingsContainer.appendChild(settingsButton)

  function togglePanel() { 
    if(isPanelDisplayed) { 
    removeOptionsPanel('settings-panel');
      isPanelDisplayed = false
    }
    else {
      createOptionsPanel('settings-panel', 'Settings',
      `
      
      `
      );  //this is temporary only to show the real power of createOptionsPanel
      isPanelDisplayed = true
    }
  }
  
  settingsButton.addEventListener('click', togglePanel)
}

function createOptionButton(keyPath, buttonClass) {
  const option = document.createElement('button');
  option.classList.add(buttonClass);
  option.innerHTML = `<img src="${keyPath}" alt="${buttonClass}">`;
  return option;
}


function createOptionsPanel(panelClass, title , panelContent) {
  const panelBar = document.createElement('div');
  panelBar.classList.add('panel-bar');

  const closeButton = createOptionButton('./assets/close.svg', 'close');
  panelBar.appendChild(closeButton)

  const settingsText = document.createElement('span');
  settingsText.textContent = `${title}`;
  panelBar.appendChild(settingsText);

  const panel = document.createElement('div')
  panel.classList = panelClass
  panel.innerHTML = panelContent // like <h1> Hello </h1> <p> hi </p> ok like an html file
  panel.appendChild(panelBar);

  main.appendChild(panel)

  function togglePanel() {
    if (isPanelDisplayed) {
      removeOptionsPanel(panelClass);
      isPanelDisplayed = false;
    } else {
      main.appendChild(panel);
      isPanelDisplayed = true;
    }
  }

  closeButton.addEventListener('click', togglePanel);


  return main
}

function removeOptionsPanel(optionClassToDelete) {
  const option = document.querySelector(`.${optionClassToDelete}`)
  option.remove()
}
//eventHandlers.js


window.addEventListener('load', setUp);
