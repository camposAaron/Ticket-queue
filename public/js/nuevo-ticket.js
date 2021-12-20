
const lblTicket  = document.querySelector('#lblNuevoTicket');
const btnCrear   = document.querySelector('button');

const socket = io();

socket.on('connect', ()=> {
    btnCrear.disabled = false;
});

socket.on('disconnet', ()=> {
    btnCrear.disabled = true;
});

 socket.on('ultimo-ticket', (payload)=>{
        lblTicket.innerText = payload;
});

btnCrear.addEventListener('click', ()=>{
    socket.emit('siguiente-ticket', null, (ticket)=>{
        lblTicket.innerText = ticket;
    });
});