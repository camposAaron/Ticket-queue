const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl()

const socketController = (socket) => {
    //cuando un cliente se conecta
    socket.emit('ultimos-4', ticketControl.ultimos4);
    socket.broadcast.emit('cola', ticketControl.tickets.length);
    socket.emit('ultimo-ticket', 'Ticket ' + ticketControl.ultimo);

    socket.on('siguiente-ticket', (payload, callback) => {

        const ticket = ticketControl.siguiente();
        socket.broadcast.emit('cola', ticketControl.tickets.length);
        callback(ticket);

    });

    socket.on('atender-ticket', (payload, callback) => {

        if (!payload.escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }
        const ticket = ticketControl.atenderTicket(payload.escritorio);
        socket.broadcast.emit('ultimos-4', ticketControl.ultimos4);
        socket.emit('cola', ticketControl.tickets.length);
        socket.broadcast.emit('cola', ticketControl.tickets.length);


        console.log(ticket);
        if (!ticket) {
            return callback({
                ok: false,
                msg: 'ya no hay mas tickets'
            });
        } else {
            return callback({
                ok: true,
                ticket
            });
        }
    });
}

module.exports = {
    socketController
}

