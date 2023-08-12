document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Récupère valeur des champs + prépare la requête body
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    var requestBody = {
      email: username,
      password: password
    };
  
    // requete post pour connexion et redirection vers la galerie
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestBody)
    })
      .then(function(response) {
        if (response.ok) {
          
          return response.json();
        } else {
      
          throw new Error("Incorrect username or password combination!");
        }
      })
      .then(function(data) {
        
        localStorage.setItem("token", data.token);
  document.getElementById("login").innerHTML= "Logout";
  
        
        window.location.href = "index.html";
      })
      .catch(function(error) {
        
        alert(error.message);
        if (localStorage.getItem("token")) {
          // Change the button text to "Logout"
          document.getElementById("loginButton").textContent = "logout";
          
          document.getElementById("loginButton").addEventListener("click", logout);
        }
      
        
        window.location.href = "file:///D:/Users/Matis/Documents/GitHub/clone%20portfolio/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
      })
      });
      function logout() {
        // Supprime le jeton du localStorage
        localStorage.removeItem("token");
      

      }

      
      