const config = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

function submitExpense(e) {
  e.preventDefault();
  const newExpense = {
    desc: e.target.desc.value,
    amount: e.target.amount.value,
    cat: e.target.cat.value,
  };

  axios.post("http://localhost:3000/addex", newExpense, config).then((res) => {
    listExpenses();
  });
}

listExpenses();

async function listExpenses() {
  document.getElementById("expenselist").innerHTML = `  <tr>
   
    <th>Description</th>
    <th>Category</th>
    <th>Amount</th>
    <th>Delete</th>
    <th>Edit</th>
</tr>`;
  axios.get("http://localhost:3000/getAll", config).then((all) => {
    // all.data is the array of all expenses
    console.log(all.data);
    all.data.forEach((expense) => {
      document.getElementById("expenselist").innerHTML =
        document.getElementById("expenselist").innerHTML +
        `<tr id="${expense.id}">
        
        <td>${expense.desc}</td>  
        <td>${expense.cat}</td>
        <td>${expense.amount}</td>
        <td><button class="btn btn-danger " onclick="deleteExpense(${expense.id})">Delete</button></td>
        <td><button class="btn btn-warning " onclick="editExpense(${expense.id})">Edit</button></td>
    </tr> `;
    });
  });
}

//delete

function deleteExpense(id) {
  axios
    .post("http://localhost:3000/delete", { id: id }, config)
    .then((response) => {
      console.log(response);
      listExpenses();
    });
}

function logOut(e) {
 e.preventDefault();
 localStorage.clear();
 window.location.href = "index.html";
}


checkLogin();
function checkLogin(){
  if(!localStorage.getItem('token')){
    window.location.href = "index.html";
  }
}
function download(e){
  e.preventDefault();
  axios.get("http:/localhost:3000/download" , config).then(res=>{
    if(res.status === 200){
      console.log(res);
      var a = document.createElement('a');
      a.href = res.data.fileUrl;
      a.download = 'myexpense.csv'
      a.click();
    }
    else {
      throw new Error(res.data.message)
    }
  }).catch(err=>{
   alert(err.response.data.message);
  })
}
