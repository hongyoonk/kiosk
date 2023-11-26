// Function to handle form submission
function submitForm() {
  // HTML form에서 입력받은 정보를 가져옵니다.
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const photo = document.getElementById("cameraInput").files[0]; // Update to use the correct input id

  // FormData 객체를 생성합니다.
  const formData = new FormData();
  formData.append("name", name);
  formData.append("age", age);
  formData.append("photo", photo);

  // 서버로 데이터를 전송합니다.
  fetch("/signup", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.status === 'error') {
        // If an error occurs, show a popup with the error message
        alert(data.message);
      } else {
        // Redirect to the success page after successful submission
        window.location.href = "/signsuccess";
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Event listener for the form submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission
  submitForm(); // Call the function to handle form submission
});

// Event listener for the "돌아가기" button
document.getElementById("back_btn").addEventListener("click", function () {
  // Redirect to the main page
  window.location.href = "/"; // Replace "/" with the actual URL of your main page
});
