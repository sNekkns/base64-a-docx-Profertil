const clearBtn = document.getElementById("clear-btn");
clearBtn.addEventListener("click", function () {
    base64Input.value = "";
    filenameInput.value = "";
    filenameInput.placeholder = "Profertil";
});

const base64Input = document.getElementById("base64");
const filenameInput = document.getElementById("filename");

// Actualizar el valor del placeholder del input del nombre de archivo
// cada vez que se escribe en el textarea del código base64
base64Input.addEventListener("input", function () {
    const code = base64Input.value.trim();
    const semicolonPos = code.indexOf(";");
    if (semicolonPos !== -1) {
        const filename = code.substring(0, semicolonPos);
        filenameInput.placeholder = filename;
    }
});
