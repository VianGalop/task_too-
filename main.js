

/* Los siguientes nombres de funciones son una sugerencia de funciones que necesitarás en tu programa,
sin embargo, no te limites solo a estas funciones. Crea tantas como consideres necesarias.

La estructura de cada objeto "tarea" es la siguiente:

{
  id: 1,
  title: "tarea",
  completed: false
}

*/
listaTarea=[
  {
    id:1,
    titulo: "Proyecto Final",
    completed:true
  },
  {
    id:2,
    titulo: "Repaso de temas",
    completed:false
  },
  {
    id:3,
    titulo: "Organizar carpetas",
    completed:true
  },
  {
    id:4,
    titulo: "Buscar papeles",
    completed:false
  }
];

const all =  document.querySelector('#all');
const active = document.querySelector('#active');
const complet = document.querySelector('#completed');
const divCheck = document.querySelector(".check");

all.addEventListener('click', completeTask);
active.addEventListener('click',filterUncompleted);
complet.addEventListener('click',filterCompleted);


// Función para añadir una nueva tarea
function addTask(titulo) {

  let id = 1;
  if(listaTarea.length > 0){
    let tarea = listaTarea[listaTarea.length-1]
    id = tarea.id + 1;
  }
  listaTarea.push({
    id:id,
    titulo: titulo,
    completed:false
  });
  return id;
}


// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(id) {
      //linea azul nav.
      all.classList.add("active");
      active.classList.remove("active");
      complet.classList.remove("active");


      divCheck.innerHTML = "";
      formTask(1); // numero para saber desde que apartado manda una tarea 1: all o 2:active
      listaTarea.forEach(element => {
        tareas(element.titulo,element.id,element.completed,1);
      });

    }




// Función para borrar una tarea
function deleteTask(id) {
  const rs = listaTarea.filter(task => task.id != parseInt(id))
  listaTarea = rs;
  filterCompleted();
}

// Funcion para borrar todas las tareas
function deleteAll() {
    console.log("BorrandoTodo");
    const rs = listaTarea.filter(task => task.completed != true );
    listaTarea = rs;
    filterCompleted();
}

// Función para filtrar tareas completadas
function filterCompleted() {
    all.classList.remove("active");
    active.classList.remove("active");
    complet.classList.add("active");

    divCheck.innerHTML = "";
    listaTarea.forEach(element => {
      if(element.completed){ //true
          console.log(element.titulo);
          formDelete(element.titulo,element.id);
      }
    });
    formBtnDelete();
}

// Función para filtrar tareas incompletas
function filterUncompleted() {
    all.classList.remove("active");
    active.classList.add("active");
    complet.classList.remove("active");
    divCheck.innerHTML = "";
    formTask(2);
    listaTarea.forEach(element => {
      if(!element.completed){//false
          tareas(element.titulo,element.id,element.completed,2);
      }
    });
}


function formTask(donde){
  const divNuevo = document.createElement('div');
  const inpuTask = document.createElement('input');
  const btnAdd = document.createElement('button');

  //propiedades del boton
  btnAdd.type="button";
  btnAdd.id = "add";
  btnAdd.classList.add("btn", "btn-primary");
  btnAdd.textContent = "Add";
  //propiedades del input
  inpuTask.type = "text";
  inpuTask.id = "newTask";
  inpuTask.classList.add("form-control", "nuevoElemento");
  inpuTask.placeholder = "Add details";

  //contenedor
  divNuevo.classList = "contenedorNuevo";
  divNuevo.append(inpuTask,btnAdd);
  divCheck.appendChild(divNuevo);

  btnAdd.addEventListener('click',() => {
      let task = inpuTask.value;
      if(isNaN(task)){
        let idc = addTask(task);
        console.log("Su id es: "+idc);
        if(donde === 1){
          completeTask(idc);
        }else{
          filterUncompleted();
        }
        
      }
      
  })
}


function formDelete(title, id){
  const divEtiq = document.createElement('div');
  const span = document.createElement('span');
  const etiqueta = document.createElement('label');
  const inputCheck = document.createElement('input');
  const bote = document.createElement('a');
  const imgDel = document.createElement('img'); 

  inputCheck.type = "checkbox"
  inputCheck.classList.add("form-check-input");
  inputCheck.id = id;
  inputCheck.checked = true;

  etiqueta.classList.add("form-check-label","hecho");
  etiqueta.for = "flexCheckDefault";
  etiqueta.textContent = title;

  bote.href="#";
  imgDel.src="./design/delete.png";
  imgDel.alt = "borrar";

  divEtiq.classList.add("etiqueta2");
  divEtiq.classList.remove("etiqueta");

  bote.appendChild(imgDel);
  span.append(inputCheck,etiqueta);
  divEtiq.append(span,bote);

  divCheck.classList.add("check2");
  divCheck.classList.remove("check");
  divCheck.appendChild(divEtiq); 

  inputCheck.addEventListener('click',() => {
    if(inputCheck.checked){//true
      etiqueta.classList.add("hecho")
    }else{
      etiqueta.classList.remove("hecho")
      divCheck.removeChild(divEtiq);
    }    

    const rs = listaTarea.map(task => {
      if(task.id === parseInt(inputCheck.id) ){
          task.completed == true ? task.completed = false:task.completed = true;
      }
      return task;
    })
    listaTarea = rs;
    console.log(rs);
})



  bote.addEventListener('click',() =>{
    console.log("Borrado"+ inputCheck.id);
    deleteTask(inputCheck.id)
  })
}


function formBtnDelete(){
  const divBtn = document.createElement('div');
  const btnDel = document.createElement('button');
  const imgbote = document.createElement('img');
  const par  = document.createElement('strong')

  imgbote.src = "./design/delete.png";
  imgbote.alt = "borrar";
  btnDel.type = "button";
  btnDel.classList.add("deleteAll","btn","btn-danger");
  btnDel.id = "deleteAll"
  par.textContent = "delete all"
  btnDel.append(imgbote,par);    
 

  divBtn.classList.add("botonDelete");
  divBtn.appendChild(btnDel);
  divCheck.appendChild(divBtn);
 
  btnDel.addEventListener('click',deleteAll);
 
}

function tareas(title,id,check_box,campo){
  const divEtiq = document.createElement('div');
  const etiqueta = document.createElement('label');
  const inputCheck = document.createElement('input');

  inputCheck.type = "checkbox"
  inputCheck.classList.add("form-check-input");
  inputCheck.id = id;

  etiqueta.classList.add("form-check-label");
  etiqueta.for = "flexCheckDefault";
  etiqueta.textContent = title;

  //mantener completado o no
  if(check_box){ //checa completed
    inputCheck.checked = true;
    etiqueta.classList.add("hecho")
  }else{
    inputCheck.checked = false;
    etiqueta.classList.remove("hecho")
  }

  divEtiq.classList.add("etiqueta");
  divEtiq.classList.remove("etiqueta2");
  divEtiq.append(inputCheck,etiqueta);

  divCheck.classList.add("check");
  divCheck.classList.remove("check2");
  divCheck.appendChild(divEtiq);

  inputCheck.addEventListener('click',() => {
      if(inputCheck.checked){//true
          etiqueta.classList.add("hecho")
          if(campo == 2){ //quitar la tarea marcada
            divCheck.removeChild(divEtiq);
          }
      }else{
        etiqueta.classList.remove("hecho")
      }    

      const rs = listaTarea.map(task => {
        if(task.id === parseInt(inputCheck.id) ){
            task.completed == true ? task.completed = false:task.completed = true;
        }
        return task;
      })
      listaTarea = rs;
      console.log(rs);
  })

}
