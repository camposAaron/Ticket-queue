//referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAsignar = document.querySelector('button');
const lblTicketA = document.querySelector('small');
const divAlert =  document.querySelector('.alert');
const lblCola = document.querySelector('#lblPendientes');

divAlert.style.display = 'none';


const searchParams = new URLSearchParams( window.location.search );

if( searchParams.has('Escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
console.log(escritorio);
lblEscritorio.innerText = escritorio;

const socket = io();

socket.on('connect', ()=>{
    btnAsignar.disabled = false;
});

socket.on('disconnect', ()=>{
    btnAsignar.disabled = true;
});

btnAsignar.addEventListener('click', ()=>{
    socket.emit('atender-ticket', { escritorio }, ({ok, msg, ticket})=>{
        // lblTicketA.innerText = ticketAsignado
        if(!ok){
            divAlert.style.display = '';
            divAlert.innerText = msg;
        }

        if(!ticket){
            divAlert.style.display = '';
            divAlert.innerText = msg;
            lblTicketA.innerText ='Nadie'; 
        }else{
            lblTicketA.innerText =`Ticket ${ticket.numero}`; 
            socket.on('cola', (numero)=>{
                console.log(numero);
                lblCola.innerText = numero;
            });
        }

    });
});

socket.on('cola', (numero)=>{
    console.log(numero);
    lblCola.innerText = numero;
    if(numero>0)
        divAlert.style.display = 'none';
    else   
         divAlert.style.display = '';
});