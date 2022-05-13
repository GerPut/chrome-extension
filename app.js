
// VARIABLES
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsfromLs = JSON.parse(localStorage.getItem("myLeads"));
const saveTab = document.getElementById("save-tab")

if (leadsfromLs) {
    myLeads = leadsfromLs
    renderLeads(myLeads)
}

//MAIN FUNCTION

function renderLeads(leads) {
    let listItems = " ";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
        <a href='${leads[i]}' target='_blank'>${leads[i]}</a>
        </li>
        `
    }
    ulEl.innerHTML = listItems
}


// EVENTS
saveTab.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        renderLeads(myLeads)
    });
})


deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = [];
    renderLeads(myLeads)
})


inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ''
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})


