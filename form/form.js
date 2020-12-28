const form = document.getElementById('contactForm')
const url = ''
const toast = document.getElementById('toast')
const submit = document.getElementById('submit')

function post(url, body, callback) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function() {
        if (req.status < 400) {
            callback(null, JSON.parse(req.responseText));
        } else {
            callback(new Error('Request failed: ' + req.statusText));
        }
    });
    req.send(JSON.stringify(body));
}
function success() {
    toast.innerHTML = 'Thanks for the message. We will get back to you shortly.'
    submit.disabled = false
    submit.blur
    form.name.focus()
    form.name.value = ''
    form.email.value = ''
    form.content.value = ''
}
function error (err) {
    toast.innerHTML = 'There was a problem submitting your message.'
    submit.disabled = false
    console.log(err)
}
form.addEventListener('submit', (e) => {
    console.log(e)
    e.preventDefault();
    toast.innerHTML = 'Sending'
    submit.disabled = true

    const payload = {
        name: form.name.value,
        email: form.email.value,
        content: form.content.value
    }

    post(url, payload, function (err,res)  {
        console.log('here', payload, url, form, form.name.value)
        if (err) { return error(err) }
        success()
    })
})
