 // JavaScript to display the uploaded images side by side
 const imageForm = document.getElementById('imageForm');
 const imageDisplay = document.getElementById('imageDisplay');
 const imageInput = document.getElementById('images');

 imageForm.addEventListener('submit', (e) => {
     e.preventDefault();
     imageDisplay.innerHTML = '';

     for (let i = 0; i < imageInput.files.length; i++) {
         const file = imageInput.files[i];

         if (file) {
             const reader = new FileReader();
             const imageElement = document.createElement('img');

             reader.onload = (event) => {
                 imageElement.src = event.target.result;
             };

             reader.readAsDataURL(file);
             imageDisplay.appendChild(imageElement);
         }
     }
 });

 const uploadButton = document.getElementById('uploadButton');

        uploadButton.addEventListener('click', () => {
            const titleValue = document.getElementById('title').value;
            const priceValue = document.getElementById('price').value;
            alert(`Terméke sikeresen feltöltésre került a weboldalon!\nTermék neve: ${titleValue}\nÁra: ${priceValue}Ft`);
        });