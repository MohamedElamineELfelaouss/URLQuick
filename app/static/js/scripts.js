document.getElementById('shorten-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('url').value;
    const customAlias = document.getElementById('custom_alias').value;

    // Basic URL validation
    if (!isValidUrl(url)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Disable the submit button to prevent multiple submissions
    const submitButton = event.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url, custom_alias: customAlias })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            document.getElementById('original-url').value = data.original_url;
            document.getElementById('shortened-url').value = `http://127.0.0.1:5000/${data.short_url}`;
            document.getElementById('initial-form').classList.add('hidden');
            document.getElementById('result-form').classList.remove('hidden');
        }
        submitButton.disabled = false; // Re-enable the button
    })
    .catch(error => {
        console.error('Error:', error);
        submitButton.disabled = false; // Re-enable the button in case of error
    });
});

function copyToClipboard() {
    const urlField = document.getElementById('shortened-url');
    urlField.select();
    document.execCommand('copy');
    alert('Shortened URL copied to clipboard!');
}

function resetForm() {
    document.getElementById('shorten-form').reset();
    document.getElementById('initial-form').classList.remove('hidden');
    document.getElementById('result-form').classList.add('hidden');
}

function togglePanel() {
    const panel = document.getElementById('my-urls-panel');
    const body = document.querySelector('body');
    panel.classList.toggle('active');
    if (panel.classList.contains('active')) {
        fetch('/my_urls')
            .then(response => response.json())
            .then(data => {
                const urlsList = document.getElementById('urls-list');
                urlsList.innerHTML = '';
                if (data.length > 0) {
                    data.forEach(url => {
                        const li = document.createElement('li');
                        li.className = 'list-group-item';
                        li.innerHTML = `
                            <a href="/${url.short_url}" target="_blank">${url.short_url}</a>
                            <br>
                            <small>${url.original_url}</small>
                            <br>
                            <small>Created at: ${url.created_at}</small>
                        `;
                        urlsList.appendChild(li);
                    });
                } else {
                    urlsList.innerHTML = '<li class="list-group-item">No URLs created yet.</li>';
                }
            })
            .catch(error => console.error('Error:', error));
        addBlurOverlay();
    } else {
        removeBlurOverlay();
    }
}

function addBlurOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
}

function removeBlurOverlay() {
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

function isValidUrl(urlString) {
    const pattern = new RegExp(
        '^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,})' + // domain name
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(urlString);
}
