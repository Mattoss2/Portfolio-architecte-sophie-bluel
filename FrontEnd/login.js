document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Retrieve the values of the text fields
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Prepare the request body
    var requestBody = {
      email: username,
      password: password
    };
  
    // Make a POST request using fetch
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(function(response) {
        if (response.ok) {
          // Successful authentication
          return response.json();
        } else {
          // Authentication failed
          throw new Error("Incorrect username or password combination!");
        }
      })
      .then(function(data) {
        // Save the token in localStorage
        localStorage.setItem("token", data.token);
  document.getElementById("login").innerHTML= "Logout";
  
        // Redirect to the homepage
        window.location.href = "index.html";
      })
      .catch(function(error) {
        // Handle the error
        alert(error.message);
        if (localStorage.getItem("token")) {
          // Change the button text to "Logout"
          document.getElementById("loginButton").textContent = "logout";
          
      
          // Add an event listener for the logout button
          document.getElementById("loginButton").addEventListener("click", logout);
        }
      
        // Redirect to the homepage
        window.location.href = "file:///D:/Users/Matis/Documents/GitHub/clone%20portfolio/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
      })
      });
      function logout() {
        // Supprime le jeton du localStorage
        localStorage.removeItem("token");
      

      }

      
      