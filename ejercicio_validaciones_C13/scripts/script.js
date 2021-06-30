window.onload = () => {
    const form = document.forms.inscripcion;
    const nombre = form.nombre; 
    const contrasenia = form.pass;
    const telefono = form.tel; 
    const hobbies = form.hobbies; 
    const nacionalidades = form.nacionalidad;
    const boton = form.querySelector("button");
    const datos = new DatosInscripcion();
    
    function validar(campo, validacion, property) {
        if (validacion(campo.value)) {
            datos[property] = normalizar(campo.value);
            campo.classList.remove("error");
            boton.disabled = false;
        } else {
            campo.classList.add("error");
            boton.disabled = true;
        }
    }

    function normalizar(dato) {
        return dato.toLowerCase().trim();
    }

    function validarNombre(dato) {
        const regex = /^(?=.{4,150}$)[a-z]{2,} [a-z]{2,}/g;
        const nombre = normalizar(dato);
        return regex.test(nombre);
        
        // VALIDACIÓN MANUAL
        
        const partesNombre = dato.split(" ");
        let valido = (partesNombre.length >= 2 && nombre.length < 150);
        if (valido) {
            partesNombre.forEach(parte => {
                valido = parte.length >= 2;
            });
        }
        return valido;
        
    }

    function validarContrasenia(dato) {
        const regex = /^(?=.*?[a-zA-Z0-9!@#$%^&*]{10,15})/g;
        const password = normalizar(dato);
        return regex.test(password);
    }

    function validarTelefono(dato) {
        const regex = /^[0-9]{3,3} [0-9]{3,3} [0-9]{3,3}/g;
        const telefono = normalizar(dato);
        return regex.test(telefono);
    }
    
    nombre.addEventListener("keyup", () => { validar(nombre, validarNombre, "nombreCompleto") });

    contrasenia.addEventListener("keyup", () => { validar(contrasenia, validarContrasenia, "contrasenia") });
    
    telefono.addEventListener("keyup", () => { validar(telefono, validarTelefono, "telefono") });

    form.addEventListener("submit", event => {
        event.preventDefault();
        const hobbiesSeleccionados = [];

        hobbies.forEach(hobbie => { hobbie.checked ? hobbiesSeleccionados.push(hobbie.value) : 0 });
        if (hobbiesSeleccionados.includes("videojuegos" && "cocina")) { 
            alert("No se admite la combinación de videojuegos y cocina");
        } else if (hobbiesSeleccionados.includes("guitarra" && "lectura")) {
            alert("No se admite la combinación de guitarra y lectura");
        } else if (hobbiesSeleccionados.includes("netflix" && "tejer")) {
            alert("No se admite la combinación de netflix y tejer");
        } else {
            if (hobbiesSeleccionados.length <= 4) {
                hobbiesSeleccionados.forEach(hobbie => { datos.hobbies.push(hobbie) });
            } else {
                alert("Se pueden seleccionar como máximo 4 hobbies");
            }
        }

        let checked = 0;
        nacionalidades.forEach(nacionalidad => { nacionalidad.checked === true ? checked++ : 0 });
        if (checked === 0) {
            alert("Debe seleccionar alguna nacionalidad");
        }
        nacionalidades.forEach(nacionalidad => {
            if (nacionalidad.checked) {
                switch (nacionalidad.value) {
                    case "argentina":
                        alert("Lo sentimos, aún no estamos reclutando magos en Argentina, pero pronto llegaremos");
                        break;
                    default:
                        datos.nacionalidad = nacionalidad.value;
                        break;
                }
            }
        });

        console.log(datos);
    });
}
