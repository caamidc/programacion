var contraste = () => {  /*esta funcion es del contraste que hace que la pagina se ponga en negro o blanco*/
    let body = document.body;
    let navbar = document.querySelector('.navbar');
    let cards = document.querySelectorAll('.card');
    let textoContacto = document.querySelectorAll('#contact *');
  
    if (body.classList.contains('blanco')) {
      body.classList.remove('blanco');
      body.classList.add('negro');
      navbar.classList.remove('bg-light');
      navbar.classList.add('bg-dark');
      cards.forEach(card => card.classList.add('negro'));
      textoContacto.forEach(element => element.classList.add('negro'));
    } else {
      body.classList.remove('negro');
      body.classList.add('blanco');
      navbar.classList.remove('bg-dark');
      navbar.classList.add('bg-light');
      cards.forEach(card => card.classList.remove('negro'));
      textoContacto.forEach(element => element.classList.remove('negro'));
    }
  };
  
  var registrar = () => { /*esta funcion registra los contactos que el usuario ingresa y los guarda en el localstorage*/
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let telefono = document.getElementById("telefono").value;
    let tipoEvento = document.getElementById("tipoEvento").value;
    let fechaEvento = document.getElementById("fechaEvento").value;
    let metodoContacto = document.querySelector('input[name="metodo-contacto"]:checked').value;
    let detalles = document.getElementById("detalles").value;
  
    let registro = {  /*se crea el registro*/
      "nombre": nombre,
      "email": email,
      "telefono": telefono,
      "tipoEvento": tipoEvento,
      "fechaEvento": fechaEvento,
      "metodoContacto": metodoContacto,
      "detalles": detalles
    };
  
    let listadoRegistros = JSON.parse(localStorage.getItem("registros")) || [];
    let listadoNuevo = [...listadoRegistros, registro];
  
    console.log(registro);
    console.log(listadoNuevo);
    localStorage.setItem("registros", JSON.stringify(listadoNuevo));
  
    alert("Registro realizado con éxito");
  };
  
  var cargarDatos = () => { /*en esta funcion se cargan los datos que ya hayan sido registrados*/
    let listadoRegistros = JSON.parse(localStorage.getItem("registros")) || [];
    cargarTabla(listadoRegistros);
  };
  
  var cargarTabla = (listadoNuevo) => {  /*esta funcion carga una tabla que recupera los datos y los muestra en pantalla*/
    let eContenedorTabla = document.getElementById("contenedorTabla");
    let render = "<table>";
    render += "<tr><th>Nombre</th><th>Correo electrónico</th><th>Número de teléfono</th><th>Tipo de evento</th><th>Fecha del evento</th><th>Método de contacto</th><th>Detalles adicionales</th><th>Acciones</th></tr>";
    for (let i = 0; i < listadoNuevo.length; i++) {
      const element = listadoNuevo[i];
      render += "<tr>";
      render += "<td>" + element.nombre + "</td>";
      render += "<td>" + element.email + "</td>";
      render += "<td>" + element.telefono + "</td>";
      render += "<td>" + element.tipoEvento + "</td>";
      render += "<td>" + element.fechaEvento + "</td>";
      render += "<td>" + element.metodoContacto + "</td>";
      render += "<td>" + element.detalles + "</td>";
      render += "<td>";
      render += "<button class='btnEditar' data-indice='" + i + "'>Editar</button>";
      render += "<button class='btnEliminar' data-indice='" + i + "'>Eliminar</button>";
      render += "</td>";
      render += "</tr>";
    }
    render += "</table>";
  
    eContenedorTabla.innerHTML = render;
  
    let eBtnEditar = document.getElementsByClassName("btnEditar");
    for (let i = 0; i < eBtnEditar.length; i++) {
      eBtnEditar[i].addEventListener("click", () => {
        editar(listadoNuevo, i);
      });
    }
  
    let eBtnEliminar = document.getElementsByClassName("btnEliminar");
    for (let i = 0; i < eBtnEliminar.length; i++) {
      eBtnEliminar[i].addEventListener("click", () => {
        eliminar(listadoNuevo, i);
      });
    }
  };
  
  var editar = (listadoNuevo, indice) => { /*al apretar el boton editar, esta funcion entra a trabajar, recuperando los datos para su modificacion*/
    let registro = listadoNuevo[indice];
  
    let eNombre = document.getElementById("nombre");
    let eEmail = document.getElementById("email");
    let eTelefono = document.getElementById("telefono");
    let eTipoEvento = document.getElementById("tipoEvento");
    let eFechaEvento = document.getElementById("fechaEvento");
    let eMetodoEmail = document.getElementById("metodo-email");
    let eMetodoTelefono = document.getElementById("metodo-telefono");
    let eDetalles = document.getElementById("detalles");
    let eBtnEditarUp = document.getElementById("btnEditar");
  
    eNombre.value = registro.nombre;
    eEmail.value = registro.email;
    eTelefono.value = registro.telefono;
    eTipoEvento.value = registro.tipoEvento;
    eFechaEvento.value = registro.fechaEvento;
    if (registro.metodoContacto === "Email") {
      eMetodoEmail.checked = true;
      eMetodoTelefono.checked = false;
    } else {
      eMetodoEmail.checked = false;
      eMetodoTelefono.checked = true;
    }
    eDetalles.value = registro.detalles;
    eBtnEditarUp.value = indice;
  
    eNombre.disabled = false;  /*aqui al eliminar se bloquea cualquier modificacion y solo se podra eliminar si el usuario lo desea*/
    eEmail.disabled = false;
    eTelefono.disabled = false;
    eTipoEvento.disabled = false;
    eFechaEvento.disabled = false;
    eMetodoEmail.disabled = false;
    eMetodoTelefono.disabled = false;
    eDetalles.disabled = false;
  };
  
  var eliminar = (listadoNuevo, indice) => { /*esta hace lo mismo que la anterior pero elimina los datos*/
    let confirmar = confirm("¿Estás seguro de que deseas eliminar este registro?");
  
    if (confirmar) {
      listadoNuevo.splice(indice, 1);
      localStorage.setItem("registros", JSON.stringify(listadoNuevo));
      cargarTabla(listadoNuevo);
      alert("Registro eliminado exitosamente");
    }
  };
  
  document.getElementById("btnMostrarRegistros").addEventListener("click", cargarDatos);
  document.getElementById("btn").addEventListener("click", registrar);
  document.getElementById("btn-contraste").addEventListener("click", contraste);
  