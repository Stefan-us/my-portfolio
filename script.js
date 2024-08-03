document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formStatus = document.getElementById('form-status');

    try {
        const response = await fetch(form.action, {
            method: form.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.innerHTML = "Thank you! Your message has been sent.";
            form.reset();
        } else {
            const data = await response.json();
            if (data.errors) {
                formStatus.innerHTML = data.errors.map(error => error.message).join(", ");
            } else {
                formStatus.innerHTML = "Oops! There was a problem submitting your form.";
            }
        }
    } catch (error) {
        formStatus.innerHTML = "Oops! There was a problem submitting your form.";
    }
});
