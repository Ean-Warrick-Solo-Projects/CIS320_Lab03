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