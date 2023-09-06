document.addEventListener('DOMContentLoaded', function () {
    consultar();
});

const consultar = ()=>{
    fetch('https://reqres.in/api/users')
        .then(response => response.json())
        .then(data => {
            let elementos = document.getElementById("elementos")
            let tarjetas =  "";
            for (let obj of data.data) {
                // style='width: 18rem;'
                
                let tarjeta = "<div id='"+obj.id+"' class='col d-flex align-items-stretch'><div style='border:0px;' class='card h-100 w-100 custom'><img src='"+obj.avatar+"' class='card-img-top rounded-circle' alt='user'><div class='card-body'><p class='card-text text-center'><b>"+obj.email+"</b><br>"+obj.first_name +" "+ obj.last_name+"</p><div class='container'><div class='row'><div class='col-xs-1' align='center'><button type='button' onclick='consulta("+obj.id+")' class='btn btn-primary mt-auto align-self-start rounded-circle' data-bs-toggle='modal' data-bs-target='#userview'><i class='fas fa-eye'></i></button> <button onclick='eliminar("+obj.id+")' class='btn btn-danger rounded-circle'><i class='fas fa-trash'></i></button></div></div></div></div></div></div>"
                // let tarjeta = "<div class='card my-3'><div class='card-body'><b>"+obj.email+"</b><br>"+obj.first_name +" "+ obj.last_name+"<br><button onclick='eliminar("+obj.id+")' class='btn btn-danger float-end'>Delete <i class='fas fa-trash'></i></button></div></div>"
                tarjetas+=tarjeta
            }
            elementos.innerHTML = tarjetas;
        });
}

const agregar = ()=>{
    let objeto = {
        name: document.getElementById("one").value,
        job: document.getElementById("two").value
    };
    fetch("https://reqres.in/api/users", {method: 'POST', body: JSON.stringify(objeto),headers:{'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let registro = "<div id='"+data.id+"' class='col d-flex align-items-stretch'><div style='border:0px;' class='card h-100 w-100 custom'><img src='https://www.brang.mx/admin/img/user.png' class='card-img-top rounded-circle' alt='user'><div class='card-body'><p class='card-text text-center'><b>example"+data.id+"@gmail.com</b><br>"+data.name+"</p><div class='container'><div class='row'><div class='col-xs-1' align='center'><button type='button' onclick='ver(\""+data.name+"\",\""+data.id+"\")' class='btn btn-primary mt-auto align-self-start rounded-circle' data-bs-toggle='modal' data-bs-target='#userviewc'><i class='fas fa-eye'></i></button> <button onclick='eliminar("+data.id+")' class='btn btn-danger rounded-circle'><i class='fas fa-trash'></i></button></div></div></div></div></div></div>"
            let registros = document.getElementById("elementos").innerHTML 
            document.getElementById("elementos").innerHTML = registro+registros
            alert("¡Registro exitoso!")
        });
}

const eliminar = (id)=>{
    fetch("https://reqres.in/api/users/"+id, {method: 'DELETE'})
        //.then(response => response.json())
        .then(data => {
            if (data.ok)
                document.getElementById(id).remove()
                alert("¡Eliminación exitosa!")
        });
}

const consulta = (id)=>{
    fetch("https://reqres.in/api/users/"+id)
        .then(response => response.json())
        .then(data => {
            let user = data.data;
            console.log(user);
            let title = document.getElementById("exampleModalLabel")
            title.innerText = user.first_name + " " + user.last_name; 
            let img = document.getElementById("c-img")
            img.src = user.avatar;
            let email = document.getElementById("c-email")
            email.innerText = user.email;
            let name = document.getElementById("c-name")
            name.innerText = user.first_name + " " + user.last_name; 

        });
}

const ver = (nombre,id)=>{
    let title = document.getElementById("userviewctitle");
    title.innerText = nombre;
    let email = document.getElementById("cc-email");
    email.innerText = "example"+id+"@gmail.com";
    let name = document.getElementById("cc-name");
    name.innerText = nombre;
}
