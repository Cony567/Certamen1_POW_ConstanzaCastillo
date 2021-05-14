tinymce.init({
    selector: '#descripcion-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });

const horarios = [];

const Menus_registro = [];

const cargarHorarios = ()=>{
    desayuno = {};almuerzo={};once = {}; cena ={};
    desayuno.valorMin = 1000;desayuno.valorMax = 10000;desayuno.valorOferta = 5000;desayuno.tipo = "desayuno";
    almuerzo.valorMin = 10000;almuerzo.valorMax = 20000;almuerzo.valorOferta = 15000;almuerzo.tipo ="almuerzo";
    once.valorMin = 5000;once.valorMax = 15000;once.valorOferta = 10000;once.tipo = "once";
    cena.valorMin = 15000;cena.valorOferta = 20000;cena.tipo = "cena";
    horarios.push(desayuno);
    horarios.push(almuerzo);
    horarios.push(once);
    horarios.push(cena);
}

const cargarTabla = ()=>{
    let tbody = document.querySelector("#tabla-tbody");
    tbody.innerHTML = "";
    for(let i=0; i<Menus_registro.length; ++i){
        let m = Menus_registro[i];

        let tr = document.createElement('tr');

        let td_Nro = document.createElement('td');
        td_Nro.innerText = i+1;
        let td_nombre = document.createElement('td');
        td_nombre.innerText = m.nombre;
        let td_horario = document.createElement('td');
        td_horario.innerText = m.horario;
        let td_valor = document.createElement('td');
        td_valor.innerText = "$" + m.valor;
        let td_desc = document.createElement('td');
        td_desc.innerHTML = m.descr;
        let td_oferta = document.createElement('td');
        let icono = document.createElement('i');
        for(let j=0;j<horarios.length;++j){
            if (m.horario == horarios[j].tipo){
                if(parseInt(m.valor) < horarios[j].valorOferta){
                    icono.classList.add("fas","fa-check-circle","text-success","fa-2x");
                    break
                }else{
                    console.log("No-desayuno")
                    icono.classList.add("far","fa-times-circle","text-danger","fa-2x");
                    break
                }
            }
        }
        td_oferta.appendChild(icono);


        tr.appendChild(td_Nro);
        tr.appendChild(td_nombre);
        tr.appendChild(td_horario);
        tr.appendChild(td_valor);
        tr.appendChild(td_desc);
        tr.appendChild(td_oferta);
        tr.classList.add("text-center");

        tbody.appendChild(tr);
    }


}

document.querySelector('#limpiar-btn').addEventListener("click",()=>{
    document.querySelector("#nombre-txt").value = "";
    document.querySelector("#horario-select").value = "desayuno";
    document.querySelector("#valor-txt").value = "";
    tinymce.get("descripcion-txt").setContent("");
});

document.querySelector('#ingresar-btn').addEventListener("click",()=>{
    cargarHorarios();
    let nombre = document.querySelector('#nombre-txt').value;
    let horario = document.querySelector('#horario-select').value;
    let valor = document.querySelector('#valor-txt').value;
    let descr = tinymce.get("descripcion-txt").getContent();
    nuev_menu = {}
    nuev_menu.nombre = nombre;
    nuev_menu.horario = horario;
    nuev_menu.valor = valor;
    nuev_menu.descr = descr;
    if (nuev_menu.nombre != ""){
        for(let i = 0; i<horarios.length; ++i){
            if (nuev_menu.horario != horarios[3].tipo && nuev_menu.horario == horarios[i].tipo){
                if((parseInt(nuev_menu.valor) < horarios[i].valorMax) &&(parseInt(nuev_menu.valor) > horarios[i].valorMin) ){
                    Menus_registro.push(nuev_menu);

                    cargarTabla();
                    Swal.fire("Exito","Se ha agregado el nuevo menú","success");
                    break
                }else{
                    Swal.fire("Error","Ingresó mal el precio, fuera de rango","error");
                    break
                }
            }else{
                if((parseInt(nuev_menu.valor) > horarios[i].valorMin) ){
                    Menus_registro.push(nuev_menu);

                    cargarTabla();
                    Swal.fire("Exito","Se ha agregado el nuevo menú","success");
                    break
                }else{
                    Swal.fire("Error","Ingresó mal el precio, fuera de rango","error");
                    break
                }
            }
        }
    }else{
        Swal.fire("Error","El campo de nombre es obligatorio","error");
    }
    
});


