function getAndUpdate() {
    console.log("Item added");
    tit = document.getElementById('title').value;
    desc = document.getElementById('description').value;
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        itemsJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('itemsJson')
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([tit, desc]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    updateList();
}

function updateList() {
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray))
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    }

    // Populating the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str += `
                    <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td> 
                    <td><button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button></td> 
                    </tr>`;
    });
    tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
updateList();

function deleteTask(itemIndex) {
    console.log("Task", itemIndex, "deleted.");
    itemsJsonArrayStr = localStorage.getItem('itemsJson')
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    // Delete itemIndex element from the array
    itemsJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    updateList();
}

function clearStorage() {
    if (confirm("Do you areally want to clear?")) {
        console.log('Storage cleared')
        localStorage.clear();
        updateList();
    }
}
