document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve the values of the text fields
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Perform login operations here, such as data validation

  // Make an AJAX request
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5678/api/works", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);

          // Handle the response
          if (response.authenticated) {
              window.location.href = "file:///D:/Users/Matis/Documents/GitHub/clone%20portfolio/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
          } else {
              alert("Incorrect username or password combination!");
          }
      } else if (xhr.readyState === 4) {
          console.error("Error:", xhr.status, xhr.statusText);
      }
  };
  var data = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
  xhr.send(data);
});