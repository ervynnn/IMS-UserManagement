var prdTableBody = document.querySelector('.product tbody');
var prdRows = prdTableBody.querySelectorAll('tr');

var ordTableBody = document.querySelector('.order tbody');
var ordRows = ordTableBody.querySelectorAll('tr');

updateRow();

document.querySelector('.co-filter').addEventListener('click', function() {
  
    btnFilter = document.querySelector('.co-filter');
      if (btnFilter.classList.contains('filter-on')) {
          btnFilter.classList.remove('filter-on');
          sortTable(0);
        }else{
          btnFilter.classList.add('filter-on');
          sortTable(1);
        }
  });

// SEARCH FUNCTION
function searchFunc() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = prdTableBody;
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
  
    
function updateRow() {
    // Add click event listener to each row
    prdRows.forEach(row => {
        addQuantity = row.cells[6].querySelector(".add-quantity");
        addQuantity.addEventListener('click', function(event) {
            let qntty = parseFloat(row.cells[5].textContent);
            let stock = parseFloat(row.cells[3].textContent);
            if (qntty < stock) {
                qntty++;
                row.cells[5].textContent = qntty;
                updateOrder(row, qntty);
            }
          });
        removeQuantity = row.cells[6].querySelector(".remove-quantity");
        removeQuantity.addEventListener('click', function(event) {
            let qntty = parseFloat(row.cells[5].textContent);
            if(qntty > 0){
                qntty--;
                row.cells[5].textContent = qntty;
                updateOrder(row, qntty);
            }
          });
    });
}

function updateOrder(row, qntty) {
        let quantity = parseFloat(row.cells[5].textContent);
        let condition = true;
        var totalPrice = 0;   
        ordRows = ordTableBody.querySelectorAll('tr');
        ordRows.forEach(ordRow => {
            if(row.cells[1].textContent === ordRow.cells[1].textContent){
                ordRow.cells[2].textContent = qntty;
                condition = false;
                var price = row.cells[4].textContent;
                var priceReg = price.replace(/[^0-9\-+\.]/g, "");
                var priceFinal = parseFloat(priceReg);
                priceFinal = priceFinal * qntty;
                priceFinal = `${priceFinal.toFixed(2)}`;
                ordRow.cells[3].textContent = '₱' + priceFinal;
            }
            if(parseFloat(ordRow.cells[2].textContent) === 0){
                ordRow.parentNode.removeChild(ordRow); 
                rowUpdates = ordTableBody.querySelectorAll('tr');
                rowUpdates .forEach(rowUpdate => {
                    rowUpdate.cells[0].textContent = rowUpdate.rowIndex; 
                });
            }
        });
        if( quantity > 0 && condition === true ){
            const insertRow = ordTableBody.insertRow(-1);
            const cell1 = insertRow.insertCell(0);
            const cell2 = insertRow.insertCell(1);
            const cell3 = insertRow.insertCell(2);
            const cell4 = insertRow.insertCell(3);
            cell1.innerHTML = ordTableBody.rows.length;
            cell2.innerHTML = row.cells[1].textContent;
            cell3.innerHTML = row.cells[5].textContent;
            cell4.innerHTML = row.cells[4].textContent;
        }

        ordRows = ordTableBody.querySelectorAll('tr');
        ordRows.forEach(ordRow => {
                var price =  ordRow.cells[3].textContent;
                var priceReg = price.replace(/[^0-9\-+\.]/g, "");
                var priceFinal = parseFloat(priceReg);
                totalPrice = totalPrice + parseFloat(priceFinal);
        });
        totalPrice = `${totalPrice.toFixed(2)}`;
        document.getElementById('total-price').textContent = '₱' + totalPrice;
        document.getElementById('total-items').textContent = ordTableBody.rows.length;
}

function sortTable(columnNo){
  
    const rows = Array.from(prdTableBody.querySelectorAll("tr"));
    rows.sort((rowA, rowB) => {
      const nameA = rowA.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
      const nameB = rowB.querySelector(`td:nth-child(${columnNo + 1})`).textContent.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  
    prdTableBody.innerHTML = "";
    rows.forEach(row => prdTableBody.appendChild(row));
  }