// TABLE VARIABLE IN POP-UP FOR SELECTING THE ITEMS FOR SALES
var pOrdTableBody = document.querySelector('.product-pop tbody');
var pOrdRows = pOrdTableBody.querySelectorAll('tr');
var pOrdSelectedRow = pOrdTableBody.querySelector('.selected-row-popup');

// INPUT VARIABLE FOR SELECTING THE NUMBER OF ITEM QUANTITY INSIDE THE POP-UP
var quantityInput = document.getElementById('sales-quantity');

// SEARCH BAR INSIDE THE POP-UP
var searchPopUp = document.getElementById('search');
// CONFIRM CHANGES IN THE POP-UP
var confirmAddSales = document.querySelector('.confirm-add-sales');
// POPUP TITLE
var popHeadTitle = document.querySelector('.pop-head-sales h1');

// TABLE VARIABLE IN CREATING SALES 
var cSalesTableBody = document.querySelector('.create-sales tbody');
var cSalesRows =  cSalesTableBody.querySelectorAll('tr');
var cSalesSelectedRow = cSalesTableBody.querySelector('.selected-row');

// INPUT FOR THE SALES USERNAME
var inputUsercSales = document.getElementById('uname-sales');

// TEXT FOR SALES ID AND SALES DATE
var cSalesID = document.querySelector('.createSalesID');
var cSalesDate = document.querySelector('.createSalesDate');

// DIV FOR ALL THE BUTTONS
var btnDivcSales = document.querySelector('.create-sales-btn');
var btnCreateSales = document.querySelector('.create-sales-btn-confirm');
// DIV FOR TOTAL PRICE
var totalcSalesDiv = document.querySelector('.sales-total');
// TOTAL PRICE SHOWED WHILE CREATING SALES
var totalcSales = document.querySelector('.sales-total p');

// BUTTONS INSIDE CREATING SALES
var popupSales = document.querySelector('.popup-sales');
var popupAdd = document.querySelector('.add-sales');
var popupEdit = document.querySelector('.edit-sales');
var popupRemove = document.querySelector('.remove-sales');

// TABLE VARIABLE IN SHOWING ORDER LIST/ PURCHASE ORDERS
// IF SELECTED IT SHOULD UPDATE THE CREATE SALES TABLE
var orderListTableBody = document.querySelector('.purchase-history tbody');
var orderListRows = orderListTableBody.querySelectorAll('tr');
var orderListSelectedRow = orderListTableBody.querySelector('.selected-row');

// TABLE VARIABLE IN SHOWING SALES LIST
// IF SELECTED IT SHOULD UPDATE THE CREATE SALES TABLE
var salesListTableBody = document.querySelector('.sales-history tbody');
var salesListRows = salesListTableBody.querySelectorAll('tr');
var salesListSelectedRow = salesListTableBody.querySelector('.selected-row');

// SETTING THE DATE IN CREATING SALES TO THE CURRENT DATE
const today = new Date();
const formattedDate = today.toLocaleDateString('en-US', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

cSalesDate.textContent = formattedDate;

// INITIALIZATION OF PAGE
popupEdit.style.display = "none";
popupRemove.style.display = "none";
btnDivcSales.style.display = 'none';
totalcSalesDiv.style.marginBottom = '4.4vw';

// UPDATE ROWS FOR PRODUCT POP UP
updateRowPopup(pOrdRows,'selected-row-popup');
updateRowOrderList(orderListRows, 'selected-row');

// FOR CLOSING THE POP-UP ADDING ITEM
document.querySelector('.pop-exit .close').addEventListener('click', function() {
  popupSales.style.display = "none";
  pOrdSelectedRow = pOrdTableBody.querySelector('.selected-row-popup');
  if(pOrdSelectedRow){
    pOrdSelectedRow.classList.remove('selected-row-popup');
  }
  quantityInput.value = 1;
  searchPopUp.textContent = "";
});

// WHEN THE EDIT BUTTON FROM CREATING SALES IS CLICKED
// FUNCTION SHOULD BE SHOWING OF POP-UP
popupEdit.addEventListener('click', function() {
  popHeadTitle.textContent = "Edit Item";
  popupSales.style.display = "flex"
  cSalesSelectedRow = cSalesTableBody.querySelector('.selected-row');
  quantityInput.value = parseFloat(cSalesSelectedRow.cells[3].textContent);
  updateTotalSalesPrice();
  pOrdRows.forEach(pOrdRow => {
      if(cSalesSelectedRow.cells[2].textContent === pOrdRow.cells[2].textContent){
        pOrdRow.classList.add('selected-row-popup');
      }
  });
});

// WHEN THE REMOVE BUTTON FROM CREATING SALES IS CLICKED
// FUNCTION SHOULD BE REMOVAL OF ITEM SELECTED FROM THE TABLE
popupRemove.addEventListener('click', function() {
  selectedrow = document.querySelector('.selected-row');
  if (selectedrow) {
      selectedrow.parentNode.removeChild(selectedrow);
    }
  selectedrow.classList.remove('selected-row');
  updateTotalSalesPrice();

  // RESET POPUP ITEM
  popupSales.style.display = "none"
  pOrdSelectedRow.classList.remove('selected-row-popup');
  popupEdit.style.display = "none";
  popupRemove.style.display = "none";
  quantityInput.value = 1;
  searchPopUp.textContent = "";

  sortTable(0, cSalesTableBody);
  rows = cSalesTableBody.querySelectorAll('tr');
  rows.forEach(row => {
      row.cells[0].textContent = row.rowIndex; 
  });

});

// WHEN THE CONFIRM BUTTON POP-UP IS CLICKED
// SHOULD UPDATE THE TABLE
confirmAddSales.addEventListener('click', function() {
  pOrdSelectedRow = pOrdTableBody.querySelector('.selected-row-popup');
  let condition = true;
  if(pOrdSelectedRow){
    popupEdit.style.display = "none";
    popupRemove.style.display = "none";
    cSalesRows.forEach(cSalesRow => {
      cSalesRow.classList.remove('selected-row');
    });

    cSalesRows = cSalesTableBody.querySelectorAll('tr');
    cSalesRows.forEach(cSalesRow => {
        if(cSalesRow.cells[2].textContent === pOrdSelectedRow.cells[2].textContent){
            if(popHeadTitle.textContent === "Add Item"){
              var quantity = parseFloat(cSalesRow.cells[3].textContent) + parseFloat(quantityInput.value);
            }else{
              var quantity = parseFloat(quantityInput.value);
            }
            cSalesRow.cells[3].textContent = quantity;
            var priceReg = parseFloat(pOrdSelectedRow.cells[4].textContent.replace(/[^0-9\-+\.]/g, ""));
            var priceFinal = priceReg * quantity;
            priceFinal = `${priceFinal.toFixed(2)}`;
            cSalesRow.cells[4].textContent = '₱' + priceFinal;
            condition = false;
          
        }
    });

    // IF THE BUTTON FROM THE PREVIOUS CLICKED IS ADD ITEM
    if(popHeadTitle.textContent === "Add Item" && condition === true){
      const row = cSalesTableBody.insertRow(-1);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);
      const cell4 = row.insertCell(3);
      const cell5 = row.insertCell(4);
      cell1.innerHTML = cSalesTableBody.rows.length;
      cell2.innerHTML = pOrdSelectedRow.cells[1].textContent;
      cell3.innerHTML = pOrdSelectedRow.cells[2].textContent;
      cell4.innerHTML = quantityInput.value;
      var priceFinal = quantityInput.value * parseFloat(pOrdSelectedRow.cells[4].textContent.replace(/[^0-9\-+\.]/g, ""));
      priceFinal = `${priceFinal.toFixed(2)}`;
      cell5.innerHTML = '₱' + priceFinal;

      row.addEventListener('click', function(event) {
        cSalesRows =  cSalesTableBody.querySelectorAll('tr');
        cSalesRows.forEach(cSalesRow => {
          cSalesRow.classList.remove('selected-row');
        });
        row.classList.add('selected-row');
        popupEdit.style.display = "flex";
        popupRemove.style.display = "flex";
    });
    }

    updateTotalSalesPrice();
    // RESET THE POP-UP DISPLAY
    popupSales.style.display = "none"
    pOrdSelectedRow.classList.remove('selected-row-popup');
    quantityInput.value = 1;
    searchPopUp.textContent = "";
  }
});

// WHEN CLICKING 'ADD ITEM' BUTTON
popupAdd.addEventListener('click', function() {
  popHeadTitle.textContent = "Add Item";
  popupSales.style.display = "flex"
});

// WHEN CLICKING 'CREATE SALES' BUTTON
btnCreateSales.addEventListener('click', function() {

  if(!(cSalesTableBody.innerHTML === "")){
    const row = salesListTableBody.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.innerHTML = salesListTableBody.rows.length;
    cell2.innerHTML = cSalesDate.textContent;
    cell3.innerHTML = inputUsercSales.value;
    cell4.innerHTML = cSalesID.textContent;
    cell5.innerHTML = totalcSales.textContent;
    
    // CLEARING THE CREATE SALES DIV
    btnDivcSales.style.display = 'none';
    totalcSalesDiv.style.marginBottom = '4.4vw';
    inputUsercSales.value = "";
    totalcSales.textContent = "";
    cSalesTableBody.innerHTML = '';

    // REMOVING SELECTED FROM THE PURCHASE ORDERS
    orderListRows.forEach(orderListRow => {
      orderListRow.classList.remove('selected-row');
    });

    row.addEventListener('click', function(event) {
      salesListRows = salesListTableBody.querySelectorAll('tr');
      salesListRows.forEach(salesListRow => {
        salesListRow.classList.remove('selected-row');
      });
      orderListRows = orderListTableBody.querySelectorAll('tr');
      orderListRows.forEach( orderListRow => {
        orderListRow.classList.remove('selected-row');
      });
      row.classList.add('selected-row');
      // WHEN SELECTING THE SALES ROW, IT SHOULD DISPLAY THE INFO TO
      // THE 'CREATE SALES' DIV
      inputUsercSales.value = row.cells[2].textContent;
      cSalesDate.textContent = row.cells[1].textContent;
      cSalesID.textContent = row.cells[3].textContent;
      totalcSales.textContent = row.cells[4].textContent;
      // DISABLE CREATE SALES BUTTONS
      btnDivcSales.style.display = 'none';
  });

  }

});

// SEARCH FUNCTION
function searchFunc() {
    var input, filter, table, tr, td, i, txtValue;
    slctd = document.querySelector('.selected-row-popup');
    if (slctd) {
        slctd.classList.remove('selected-row-popup');
        quantityInput.value = 1;
      }
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = pOrdTableBody;
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }
  
// UPDATING THE TABLE ROW INSIDE THE POP-UP
function updateRowPopup(rows, text) {
    // Add click event listener to each row
    rows.forEach(row => {
        row.addEventListener('click', function(event) {
            // Remove 'selected-row' class from all rows
            rows.forEach(row => {
                row.classList.remove(text);
            });
            // Add 'selected-row' class to the clicked row
            row.classList.add(text);
            quantityInput.value = 1;
        });
  });
}

function updateRowOrderList(rows, text) {
  // Add click event listener to each row
  rows.forEach(row => {
      row.addEventListener('click', function(event) {
          // Remove 'selected-row' class from all rows
          rows.forEach(row => {
              row.classList.remove(text);
          });
          salesListRows = salesListTableBody.querySelectorAll('tr');
          salesListRows.forEach(salesListRow => {
            salesListRow.classList.remove('selected-row');
          });
          // Add 'selected-row' class to the clicked row
          row.classList.add(text);
          quantityInput.value = 1;
          orderListSelectedRow = orderListTableBody.querySelector('.selected-row');
          if(!orderListSelectedRow){
            btnDivcSales.style.display = 'none';
            totalcSalesDiv.style.marginBottom = '4.4vw';
            inputUsercSales.value = "";
            cSalesTableBody.innerHTML = '';
            totalcSales.textContent = "";
          }else{
            btnDivcSales.style.display = 'flex';
            totalcSalesDiv.style.marginBottom = '0vw';
            inputUsercSales.value = orderListSelectedRow.cells[2].textContent;
          }
      });
  });
}

// FOR SORTING THE TABLE
function sortTable(columnNo, tableBody){
  
  const rows = Array.from(tableBody.querySelectorAll("tr"));
  rows.sort((rowA, rowB) => {
    const nameA = rowA.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
    const nameB = rowB.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
    return nameA.localeCompare(nameB);
  });
  tableBody.innerHTML = "";
  rows.forEach(row => tableBody.appendChild(row));
}

// UPDATING TOTAL SALES PRICE
function updateTotalSalesPrice(){
  var totalSalesPrice = 0;
  cSalesRows =  cSalesTableBody.querySelectorAll('tr');
  cSalesRows.forEach(cSalesRow =>{
    totalSalesPrice += parseFloat(cSalesRow.cells[4].textContent.replace(/[^0-9\-+\.]/g, ""));
  });
  totalcSales.textContent = '₱'  + `${totalSalesPrice.toFixed(2)}`;
}