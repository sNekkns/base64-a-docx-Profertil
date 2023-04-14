		function validateForm() {
			var base64 = document.getElementById("base64").value.trim();
			if (base64 === "") {
				alert("Por favor, ingrese un código base64 válido.");
				return false;
			}
			return true;
		}

		document.querySelector("form").addEventListener("submit", function(event) {
			event.preventDefault();
			if (!validateForm()) {
				return;
			}

			var xhr = new XMLHttpRequest();
			xhr.open("POST", "decode.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.responseType = "blob";

			xhr.onload = function() {
				if (xhr.status === 200) {
					var a = document.createElement("a");
					var url = URL.createObjectURL(xhr.response);
					a.href = url;
					a.download = "profertil.docx";
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				} else {
					alert("Hubo un error al decodificar el archivo en base64.");
				}
			};

			xhr.send("base64=" + encodeURIComponent(base64));
		});