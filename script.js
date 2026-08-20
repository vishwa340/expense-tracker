const form = document.getElementById("transaction-form");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", function(event) {

    event.preventDefault();

const text = textInput.value.trim();
const amount = Number(amountInput.value);
 const type = typeInput.value;

    if (text === "" || amount <= 0) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
    id: Date.now(),
     text: text,
     amount: amount,
     type: type
    };
transactions.push(transaction);

saveTransactions();
form.reset();
displayTransactions();

});
function displayTransactions() {
    transactionList.innerHTML = "";
    transactions.forEach(function(transaction) {

    const li = document.createElement("li");
    li.classList.add(
            "transaction",
            transaction.type
        );
    const sign = transaction.type === "income" ? "+" : "-";

        li.innerHTML = `
         <div class="transaction-info">

         <span>${transaction.text}</span>

         <span class="transaction-amount">
               ${sign} ₹${transaction.amount}
                </span>

        </div>
            <button 
            class="delete-btn"
            onclick="deleteTransaction(${transaction.id})"
            >
             Delete
            </button>
        `;
        transactionList.appendChild(li);
    });

    updateSummary();
}
function updateSummary() {
    let income = 0;
    let expense = 0;
    transactions.forEach(function(transaction) {
        if (transaction.type === "income") {
            income += transaction.amount;

        } else {
         expense += transaction.amount;

        }
    });
    const balance = income - expense;

    incomeElement.innerText = `₹${income}`;
    expenseElement.innerText = `₹${expense}`;
    balanceElement.innerText = `₹${balance}`;

}
function deleteTransaction(id) {
    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;

    });
    saveTransactions();

    displayTransactions();

}
function saveTransactions() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}
displayTransactions();
