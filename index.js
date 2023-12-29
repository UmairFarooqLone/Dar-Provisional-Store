document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
  
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
  
      });
    });
  
  });
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyCp58XGxlCFy3H90YG3sIAK-IGviK8PskY",
  authDomain: "dar-provisional-store.firebaseapp.com",
  projectId: "dar-provisional-store",
  storageBucket: "dar-provisional-store.appspot.com",
  messagingSenderId: "280938064333",
  appId: "1:280938064333:web:dac6e0aea00091f8d7fc84",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
      document.getElementById('user').innerHTML += `<p>Logged in as: ${user.email}</p>`;
      document.getElementById('nav-start').innerHTML += ` <a href="create.html" class="navbar-item ">
      Add Product
    </a>`;
  } else {
      // No user is signed in.
      document.getElementById('user').innerHTML += ` <a href="login.html" class="button is-primary">
      <strong>Login</strong>
    </a>`;
  }
  var db = firebase.firestore();
  db.collection("products").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          var data = doc.data();
          var productCard = `<div class="child">
          <div class="child-img">
            <div class="img">
            <img src="${data.image}">
            </div>
          </div>
          <div class="child-title">${data.title}</div>
          <hr class="child-divider" />
          <div class="child-footer">
            <div class="child-price"><span>₹</span> ${data.offer}</div>
            <button class="child-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z">
                </path>
                <path
                  d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z">
                </path>
                <path
                  d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z">
                </path>
                <path
                  d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z">
                </path>
              </svg>
            </button>`;
          if (user) {
              productCard += `<button class="child-btn" onclick="deleteProduct('${doc.id}')">
              <img src="/del.svg">
              </button>`;
          }
          productCard += `</div></div>`;
          document.getElementById('productList').innerHTML += productCard;
      });
  });
});


function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
      var db = firebase.firestore();
      db.collection("products").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          document.getElementById("body").innerHTML =
                `
                 <link rel="stylesheet" href="animation.css">
                 <div class="svg-container">
                   <svg
                     class="ft-green-tick"
                     xmlns="http://www.w3.org/2000/svg"
                     height="100"
                     width="100"
                     viewBox="0 0 48 48"
                     aria-hidden="true"
                   >
                     <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22" />
                     <path
                       class="tick"
                       fill="none"
                       stroke="#FFF"
                       stroke-width="6"
                       stroke-linecap="round"
                       stroke-linejoin="round"
                       stroke-miterlimit="10"
                       d="M14 27l5.917 4.917L34 17"
                     />
                   </svg>
                 </div>
                 `;
                 setTimeout(() => {
                     window.location.href = "index.html";
                 }, 3000);
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }
}








// function deleteProduct(id) {
//   if (confirm('Are you sure you want to delete this product?')) {
//       var db = firebase.firestore();
//       db.collection("products").doc(id).get().then((doc) => {
//           var data = doc.data();
//           var image = data.image; // assuming this is the path of the image in Firebase Storage
//           // Create a reference to the file to delete
//           var storageRef = firebase.storage().ref();
//           var imageRef = storageRef.child(image);

//           // Delete the file
//           imageRef.delete().then(() => {
//               console.log("Image successfully deleted!");
//               // Delete the document
//               db.collection("products").doc(id).delete().then(() => {
//                 document.getElementById("body").innerHTML =
//                 `
//                  <link rel="stylesheet" href="animation.css">
//                  <div class="svg-container">
//                    <svg
//                      class="ft-green-tick"
//                      xmlns="http://www.w3.org/2000/svg"
//                      height="100"
//                      width="100"
//                      viewBox="0 0 48 48"
//                      aria-hidden="true"
//                    >
//                      <circle class="circle" fill="#5bb543" cx="24" cy="24" r="22" />
//                      <path
//                        class="tick"
//                        fill="none"
//                        stroke="#FFF"
//                        stroke-width="6"
//                        stroke-linecap="round"
//                        stroke-linejoin="round"
//                        stroke-miterlimit="10"
//                        d="M14 27l5.917 4.917L34 17"
//                      />
//                    </svg>
//                  </div>
//                  `;
//                  setTimeout(() => {
//                      window.location.href = "index.html";
//                  }, 3000);
              
//               }).catch((error) => {
//                   console.error("Error removing document: ", error);
//               });
//           }).catch((error) => {
//               console.error("Error removing image: ", error);
//           });
//       }).catch((error) => {
//           console.error("Error getting document:", error);
//       });
//   }
// }

  