let url = "api/name_list_get";

function htmlSafe(data) {
    return data.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;");
}

function formatPhoneNumber(phoneNumberString) {
    // removes all non-numbers
    let cleaned = phoneNumberString.replace(/\D/g, '');

    // checks if there are 10 digits
    // and groups numbers together in phone format
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    // runs code if string it had 10 digits
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }

    // returns our newly formatted phone number
    return phoneNumberString;
}

function getLocalDateFormatString(sqlDate) {
    // Strip non-digits
    let cleaned = sqlDate.replace(/\D/g, '');

    // Match and group
    let match = cleaned.match(/^(\d{4})(\d{2})(\d{2})$/);

    // Create a new Date object
    let resultDate = new Date(match[1], match[2], match[3]);

    // return date string
    return resultDate.toDateString();
}

$.getJSON(url, null, function(json_result) {

        // json_result is an object. You can set a breakpoint, or print
        // it to see the fields. Specifically, it is an array of objects.
        // Here we loop the array and print the first name.


        for (let i = 0; i < json_result.length; i++) {
            // Print the first name
            let id = json_result[i].id
            let first = json_result[i].first
            let last = json_result[i].last
            let email = json_result[i].email
            let phone = json_result[i].phone
            let birthday = json_result[i].birthday
            $('#datatable tbody:last').after('<tr><td>' + id + '</td><td>' + htmlSafe(first) + '</td>' +
                '<td>' + htmlSafe(last) + '</td><td>' + htmlSafe(email) + '</td><td>' +
                formatPhoneNumber(htmlSafe(phone)) + '</td>' +
                '<td>' + getLocalDateFormatString(htmlSafe(birthday)) + '</td></tr>');
        }
        $('#datatable tbody:first').remove()
        console.log("Done");

    }
);


function onFormOpen() {
    console.log("Opening add item dialog")
    $("#id").val("")
    $("#firstName").val("")
    $("#lastName").val("")
    $("#email").val("")
    $("#phoneNumber").val("")
    $("#birthday").val("")

    $("#myModal").modal("show")
} $("#addItem").on("click", onFormOpen);

function validateFunction(value, regular) {
    // Get the field
    console.log(value)
}

function validate(field, isValid) {
    if (isValid) {
        field.removeClass("is-invalid")
        field.addClass("is-valid")
    } else {
        field.removeClass("is-valid")
        field.addClass("is-invalid")
    }
}

function clear(field) {
    field.removeClass("is-invalid")
    field.removeClass("is-valid")
    field.val("")
}

function onSaveChanges() {
    console.log("save changes test!")

    let firstName = $("#firstName")
    let firstNameValue = firstName.val()
    let firstNameReg = /^[A-Za-zéüöêå’]{1,45}$/;
    let firstNameTest = firstNameReg.test(firstNameValue)
    if (firstNameTest) {console.log("First name good!")} else {console.log("First name bad!")}
    validate(firstName, firstNameTest)

    let lastName = $("#lastName")
    let lastNameValue = lastName.val()
    let lastNameReg = /^[A-Za-zéüöêå']{1,45}$/;
    let lastNameTest = lastNameReg.test(lastNameValue)
    if (lastNameTest) {console.log("Last name good!")} else {console.log("Last name bad!")}
    validate(lastName, lastNameTest)

    let email = $("#email")
    let emailValue = email.val()
    let emailReg = /^[A-Za-z0-9_]{1,200}@[A-Za-z]{1,50}.com$/;
    let emailTest = emailReg.test(emailValue)
    if (emailTest) {console.log("email good!")} else {console.log("email bad!")}
    validate(email, emailTest)

    let phone = $("#phone")
    let phoneValue = phone.val()
    console.log(phoneValue)
    let phoneReg = /^[1-9][0-9][0-9]-?[0-9][0-9][0-9]-?[0-9][0-9][0-9][0-9]$/;
    let phoneTest = phoneReg.test(phoneValue)
    if (phoneTest) {console.log("phone number good!")} else {console.log("phone number bad!")}
    validate(phone, phoneTest)

    let birthday = $("#birthday")
    let birthdayValue = birthday.val()
    console.log(birthdayValue)
    let birthdayReg = /^[0-9][0-9][0-9][1-9]-[0-9][1-9]-[0-9][1-9]$/;
    let birthdayTest = birthdayReg.test(birthdayValue)
    if (birthdayTest) {console.log("Birthdate good!")} else {console.log("Birthdate bad!")}
    validate(birthday, birthdayTest)
}
$("#saveChanges").on("click", onSaveChanges)

$('#myModal').on("hide", function () {

})

$('#myModal').on('hidden.bs.modal', function(event) {
    console.log("Clearing data")
    clear($("#firstName"))
    clear($("#lastName"))
    clear($("#email"))
    clear($("#phone"))
    clear($("#birthday"))
})