
document.querySelector('.select-wrapper').addEventListener('click', function() {
    const dpdwn = document.querySelector('.dpdwn');
    this.querySelector('.select').classList.toggle('open');
    if (this.querySelector('.select').classList.contains('open')) {
        dpdwn.textContent = "keyboard_arrow_up";
    } else {
        dpdwn.textContent = "keyboard_arrow_down";
    }
});

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.select').querySelector('.select__trigger span a').textContent = this.textContent;
        }
    });
}

const tableBody = document.querySelector('tbody');
var rows = tableBody.querySelectorAll('tr');

var btnremove = document.querySelector('.pop-remove');
var btnsave = document.querySelector('.pop-save');

var popup = document.querySelector('.popup');
var pophead = document.querySelector('.pop-head h1');

var selectedrow = document.querySelector('.selected-row');

var inputname = document.getElementById('uname');
var inputpass = document.getElementById('psw');
var inputid = document.getElementById('userid');

// Add click event listener to each row
rows.forEach(row => {
  row.addEventListener('click', function(event) {
    document.querySelector('.button-edit').style.display = 'flex';
    // Remove 'selected-row' class from all rows
    rows.forEach(row => {
      row.classList.remove('selected-row');
    });
    // Add 'selected-row' class to the clicked row
    row.classList.add('selected-row');
  });
});


// Add click event listener to the 'Add' button
document.querySelector('.add').addEventListener('click', function() {
    // Clear the form
    inputname.value = '';
    inputpass.value = '';
    inputid.value = '';
    pophead.textContent="Add User";
    btnremove.style.display = 'none';
    btnsave.style.width = '100%';
    popup.style.display = 'flex';
    if (popup.classList.contains('show')) {
        popup.classList.remove('show');
        popup.classList.add('hide');
    } else {
        popup.classList.remove('hide');
        popup.classList.add('show');
    }
});

// Add click event listener to the 'Edit' button
document.querySelector('.button-edit').addEventListener('click', function() {
    selectedrow = document.querySelector('.selected-row');
    inputname.value = selectedrow.cells[1].textContent;
    inputpass.value = selectedrow.cells[3].textContent;
    inputid.value = selectedrow.cells[2].textContent;
    pophead.textContent="Edit User";
    btnremove.style.display = 'flex';
    btnsave.style.width = '40%';
    popup.style.display = 'flex';
    if (popup.classList.contains('show')) {
      popup.classList.remove('show');
      popup.classList.add('hide');
    } else {
      popup.classList.remove('hide');
      popup.classList.add('show');
    }
  });

 // Add click event listener to the 'Save' button
document.querySelector('.pop-save').addEventListener('click', function() {

    // Get form values
    const username = inputname.value;
    const password = inputpass.value;
    const userid = inputid.value;

    // Clear the form
    inputname.value = '';
    inputpass.value = '';
    inputid.value = '';

    // Close the popup
    document.querySelector('.popup').style.display = 'none';

    if(pophead.textContent === "Edit User"){
        selectedrow.cells[1].textContent = username;
        selectedrow.cells[2].textContent = userid;
        selectedrow.cells[3].textContent = password;
    }else{
        // Create a new row and append it to the table
        const row = tableBody.insertRow(-1);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell4 = row.insertCell(2);
        const cell3 = row.insertCell(3);
        cell1.innerHTML = tableBody.rows.length;
        cell2.innerHTML = username;
        cell3.innerHTML = userid;
        cell4.innerHTML = password;

        rows = tableBody.querySelectorAll('tr');
        // Add click event listener to the new row
        row.addEventListener('click', function(event) {
          document.querySelector('.button-edit').style.display = 'flex';
          // Remove 'selected-row' class from all rows
          rows.forEach(row => {
            row.classList.remove('selected-row');
          });
          // Add 'selected-row' class to the clicked row
          row.classList.add('selected-row');
        });
    }
  });

 // Add click event listener to the 'Remove' button
 document.querySelector('.pop-remove').addEventListener('click', function() {
    selectedrow = document.querySelector('.selected-row');
    if (selectedrow) {
        selectedrow.parentNode.removeChild(selectedrow);
      }
    selectedrow.classList.remove('selected-row');
  
    // Clear the form
    inputname.value = '';
    inputpass.value = '';
    inputid.value = '';

    // Close the popup
    document.querySelector('.popup').style.display = 'none';
    document.querySelector('.button-edit').style.display = 'none';

    rows = tableBody.querySelectorAll('tr');
    rows.forEach(row => {
        row.cells[0].textContent = row.rowIndex; 
    });
     
    // Add click event listener to each row
    rows.forEach(row => {
        row.addEventListener('click', function(event) {
        // Remove 'selected-row' class from all rows
        rows.forEach(row => {
            row.classList.remove('selected-row');
        });
        // Add 'selected-row' class to the clicked row
        row.classList.add('selected-row');
        });
    });
      
});


// SEARCH FUNCTION
function searchFunc() {
    var input, filter, table, tr, td, i, txtValue;
    document.querySelector('.button-edit').style.display = 'none';
    slctd = document.querySelector('.selected-row');
    if (slctd) {
        slctd.classList.remove('selected-row');
      }
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = tableBody;
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