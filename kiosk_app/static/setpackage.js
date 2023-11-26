function setPackaging(isPackaging) {
    // Set the 'packaging' cookie based on the user's choice
    document.cookie = `packaging=${isPackaging}`;

    // Additional code to send the packaging preference to the server
    sendPackagingPreferenceToServer(isPackaging);
    
    // Redirect to the '/order' page
    window.location.href = '/order';
}

function sendPackagingPreferenceToServer(isPackaging) {
    // Fetch API to send the packaging preference to the server
    fetch('/set_packaging_preference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            packagingPreference: isPackaging,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);  // Handle the response from the server if needed
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

// 추가: 포장 여부 확인 함수
function getPackagingPreferenceFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'packaging') {
            return value === 'true';
        }
    }
    return false;
}