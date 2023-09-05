const $d = document;
const $form = $d.querySelector(".crud-form");

//getALL
const cargarpersonas = async() => {
    const api = await
fetch('https://reqres.in/api/users?page=2');

console.log(api);
const datos= await api.json();


let personas = '';
datos.data.forEach(datosper => {
    personas += `
    <tr><td> <img src="${datosper.avatar}" ></td>
    <td>${datosper.first_name}</td>
    <td>${datosper.email}</td></tr>
    `;

    console.log(datosper)
});
document.getElementById('contenedor').innerHTML= personas;
//console.log(datos.data)

}

//create post
$d.addEventListener("DOMContentLoaded", cargarpersonas);

$d.addEventListener("submit", async e => {
    if (e.target === $form) {

        e.preventDefault();

        if (!e.target.id.value) {
            try {
                let options = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        
                        email: e.target.email.value,
                        first_name: e.target.first_name.value,
                        last_name: e.target.first_last_name,
                        avatar: e.target.avatar.value
                    })
                };

                let res = await axios("https://reqres.in/api/users", options)
                let json = await res.data;

                location.reload();
            } catch (error) {
                
                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
            }
        } else {
            try {
                let options = {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    },
                    data: JSON.stringify({
                        email: e.target.email.value,
                        first_name: e.target.first_name.value,
                        last_name: e.target.first_last_name,
                        avatar: e.target.avatar.value
                    })
                };

                let res = await axios(`https://reqres.in/api/users/${e.target.id.value}`, options)
                let json = await res.data;

                location.reload();
            } catch (error) {

                let message = error.statusText || "Ocurrió un error";
                $form.insertAdjacentHTML("afterend", `Error: ${error.status}: ${message}`);
                
            }
        }
    }
})
cargarpersonas()