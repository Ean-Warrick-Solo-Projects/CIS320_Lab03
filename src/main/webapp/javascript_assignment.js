// Part 1
let button1 = $("#button1")

function button1OnClick(event) {
    return console.log("Hello")
}

button1.on("click", button1OnClick)


// Part 2
let button2 = $("#button2")

let field1 = $("#field1")
let field2 = $("#field2")
let field3 = $("#field3")

function checkIfInputExists() {
    return field1.val() !== "" && field2.val() !== ""
}

function addFields(event) {
    if (checkIfInputExists()) {
        let number1 = parseFloat(field1.val())
        let number2 = parseFloat(field2.val())
        field3.val(number1 + number2)
    } else{
        field3.val("Error: Input missing")
    }
}

button2.on("click", addFields)


// Part 3
let button3 = $("#button3")
let paragraph = $("#paragraphToHide")
function toggleParagraph() {
    return paragraph.toggle(100)
}
button3.on("click", toggleParagraph)


// Part 4
let button4 = $("#button4")
let phoneField = $("#phoneField")
let validation = /\b[1-9][\d][\d]-[\d][\d][\d]-[\d][\d][\d][\d]\b/

function validate() {
    let fieldValue = phoneField.val()
    let isOK = validation.test(fieldValue)
    return console.log(isOK && "OK" || "Bad")
}

button4.on("click", validate)


// Part 5
let button5 = $("#button5")
let firstNameField = $("#firstName")
let lastNameField = $("#lastName")
let emailField = $("#email")

function createNewObject(firstName, lastName, email) {
    let self = {}
    self.firstName = firstName
    self.lastName = lastName
    self.email = email
    return self
}

function printJSON(json) {
    let objectString = JSON.stringify(json)
    console.log(objectString)
}

function activatePart5() {
    let firstName = firstNameField.val()
    let lastName = lastNameField.val()
    let email = emailField.val()
    let jsonObject = createNewObject(firstName, lastName, email)
    printJSON(jsonObject)
}

button5.on("click", activatePart5)
