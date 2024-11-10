function createTable(currentCustomer, keys) {
    let total = []

    for(let i = 0; i < keys.length; i++) {
        let mainBox = document.getElementById('mainBox')

        let mainSamanDiv = createMainBox(mainBox)

        let dateDiv = createDateElement(mainSamanDiv, keys[i])

        let containerTable = createSamanTable(mainSamanDiv)

        createTableHeader(containerTable)

        let monthTotal = createTableRows(containerTable, currentCustomer[keys[i]])

        total.push(monthTotal)
    }

    return total
}

function createMainBox(mainBox) {
    let mainSamanDiv = document.createElement('div');
            
    mainSamanDiv.classList.add('main-saman');

    mainBox.appendChild(mainSamanDiv);

    return mainSamanDiv
}

function createDateElement(mainSamanDiv, date) {
    let dateDiv = document.createElement('div');

    dateDiv.classList.add('date')

    dateDiv.textContent = `Date: ${date}`;

    mainSamanDiv.appendChild(dateDiv);

    return dateDiv
}

function createSamanTable(mainSamanDiv) {
    let samanTableDiv = document.createElement('div');
            
    samanTableDiv.classList.add('saman-table');

    mainSamanDiv.appendChild(samanTableDiv);

    let containerTable = document.createElement('table')

    containerTable.classList.add('container');

    samanTableDiv.appendChild(containerTable);

    return containerTable
}

function createTableHeader(containerTable) {
    let tableHead = document.createElement('thead')
    const tr = document.createElement('tr');
    const th1 = document.createElement('th');
    const th2 = document.createElement('th');
    const th3 = document.createElement('th');
    const h1_1 = document.createElement('h1');

    // h1_1.textContent = '#';

    // th1.appendChild(h1_1)

    const h1_2 = document.createElement('h1');

    h1_2.textContent = 'Name';

    th2.appendChild(h1_2)

    const h1_3 = document.createElement('h1');

    h1_3.textContent = 'Price';

    th3.appendChild(h1_3)

    // tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);

    tableHead.appendChild(tr);

    containerTable.appendChild(tableHead)
}

function createTableRows(containerTable, data) {
    const tbody = document.createElement('tbody');

    for(let j = 0; j < data.length; j++) {
        const tr = document.createElement('tr');

        // const td1 = document.createElement('td');

        // td1.textContent = j + 1;

        const td2 = document.createElement('td');

        td2.textContent = data[j].name;

        const td3 = document.createElement('td');

        td3.textContent = data[j].price;

        // tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tbody.appendChild(tr);
    }

    const tr = document.createElement('tr');

    const td1 = document.createElement('td');

    td1.textContent = 'Total';

    const td2 = document.createElement('td');

    td2.classList.add('yellow-background')

    let total = getTotal(data)

    td2.textContent = total;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);

    containerTable.appendChild(tbody)

    return total
}

function getTotal(data) {
    return data.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.price), 0);
}

function fetchData() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    let loader = document.getElementById('loader')
    let summary = document.getElementById('summary')

    if (!name) {
        summary.innerText = 'No Data Found'

        loader.style.display = 'none'
    }
    else {
        fetch(`./data/${name}.json`)
            .then((response) => response.json())
            .then((response) => {
                let headinhH1 = document.getElementById('headingh1')

                headinhH1.innerText = `Welcome ${name}`

                let keys = Object.keys(response)

                let total = createTable(response, keys)

                summary.innerText = `Dates: ${keys.shift()} - ${keys.pop()}\n Total: ${total.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0)}`

                loader.style.display = 'none'
            })
            .catch(() => {
                summary.innerText = 'No Data Found'

                loader.style.display = 'none'
            });
    }
}

fetchData()