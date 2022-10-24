//Global Variables
const transactionsUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

//Function save data local storage
const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => 
        transaction.id !== ID)
        updateLocalStorage()
    init()
}


const addTransactionIntoDOM = transaction => {
    const operator = transaction.amount < 0 ? '- ' : '+' 
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const amoutWithoutOperator = Math.abs(transaction.amount)
    const li = document.createElement('li')

    li.classList.add(CSSclass)
    li.innerHTML = `
    ${transaction.name} 
    <span>${operator}R$ ${amoutWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">
    x
    </button> 
    `
   transactionsUl.append(li) 
}

const updateBalanceValues = () => {
    const transctionsAmounts = transactions.map(transaction => transaction.amount)
    const total = transctionsAmounts
    .reduce((acumulator, transaction) => acumulator + transaction, 0)
    .toFixed(2) //RECEBE O VALOR E ADICONA DUAS CASAS DECIMAIS
    const income = transctionsAmounts.
    filter(value => value > 0)
    .reduce((acumulator, value) => acumulator + value, 0)
    .toFixed(2)
    const expense = Math.abs(transctionsAmounts
    .filter(value => value < 0)
    .reduce((acumulator, value) => acumulator + value, 0))
    .toFixed(2)
    
    balanceDisplay.textContent = `R$ ${total}`
    incomeDisplay.textContent = `R$ ${income}`
    expenseDisplay.textContent = `R$ ${expense}`
}

const init = () => {
    transactionsUl.innerHTML = ''
    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()
}

init()

//Function update local storage
const updateLocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const addToTransactionsArray = (transactionName, transactionAmount) => {
    transactions.push({ 
        id: generateID(), 
        name: transactionName, 
        amount: Number(transactionAmount) 
    })
}

const cleanInputs = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''
}

const handleFormSubmit = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const isSomeInputs = transactionName === '' || transactionAmount === ''
    if (isSomeInputs) {
        alert('Por favor, preencha o nome e o valor da transação')
        return
    }

    addToTransactionsArray(transactionName, transactionAmount)
    init()
    updateLocalStorage()
    cleanInputs()
    
}

form.addEventListener('submit', handleFormSubmit)