var pOrdTableBody = document.querySelector('.product-pop tbody');
var pOrdRows = pOrdTableBody.querySelectorAll('tr');
var pOrdSelectedRow = pOrdTableBody.querySelector('.selected-row-popup');

var cSalesTableBody = document.querySelector('.create-sales tbody');
var cSalesRows =  cSalesTableBody.querySelectorAll('tr');
var cSalesSelectedRow = cSalesTableBody.querySelector('.selected-row');

var popupSales = document.querySelector('.popup-sales');
var popupAdd = document.querySelector('.add-sales');
var popupEdit = document.querySelector('.edit-sales');

var quantityInput = document.getElementById('sales-quantity');
var confirmAddSales = document.querySelector('.confirm-add-sales');

var searchPopUp = document.getElementById('search');

var popHeadTitle = document.querySelector('.pop-head-sales h1');

popupEdit.style.display = "none";

document.querySelector('.pop-exit .close').addEventListener('click', function() {
  popupSales.style.display = "none";
  pOrdSelectedRow = pOrdTableBody.querySelector('.selected-row-popup');
  if(pOrdSelectedRow){
    pOrdSelectedRow.classList.remove('selected-row-popup');
  }
  quantityInput.value = 1;
  searchPopUp.textContent = "";
});

popupEdit.addEventListener('click', function() {
  popHeadTitle.textContent = "Edit Item";
  popupSales.style.display = "flex"
  cSalesSelectedRow = cSalesTableBody.querySelector('.selected-row');
  quantityInput.value = parseFloat(cSalesSelectedRow.cells[3].textContent);
  pOrdRows.forEach(pOrdRow => {
      if(cSalesSelectedRow.cells[2].textContent === pOrdRow.cells[2].textContent){
        pOrdRow.classList.add('selected-row-popup');
      }
  });
});

confirmAddSales.addEventListener('click', function() {
  pOrdSelectedRow = pOrdTableBody.querySelector('.selected-row-popup');
  popupSales.style.display = "none"
  let condition = true;

  popupEdit.style.display = "none";
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
  });
  }

  pOrdSelectedRow.classList.remove('selected-row-popup');
  quantityInput.value = 1;
  searchPopUp.textContent = "";

});

// UPDATE ROWS FOR PRODUCT POP UP
updateRowPopup(pOrdRows);

// WHEN CLICKING 'ADD ITEM' BUTTON
popupAdd.addEventListener('click', function() {
  popHeadTitle.textContent = "Add Item";
  popupSales.style.display = "flex"
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
  
function updateRowPopup(rows) {
    // Add click event listener to each row
    rows.forEach(row => {
        row.addEventListener('click', function(event) {
            // Remove 'selected-row' class from all rows
            rows.forEach(row => {
                row.classList.remove('selected-row-popup');
            });
            // Add 'selected-row' class to the clicked row
            row.classList.add('selected-row-popup');
            quantityInput.value = 1;
        });
  });
}