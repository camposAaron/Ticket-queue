const fs = require('fs');
const path = require('path');


class Ticket {
    constructor( numero, escritorio ){
        this.numero = numero;
        this.escritorio =  escritorio;
    }
}

class ticketControl {
     
    constructor(){
        this.hoy      =  new Date().getDate();
        this.ultimo   = 0;
        this.tickets  = [];
        this.ultimos4 = [];
        this.init();
    }

    get ToJson(){
        return {
            hoy : this.hoy,
            ultimo : this.ultimo,
            ultimos4 : this.ultimos4,
            tickets : this.tickets
        }
    }

    init(){
        const { hoy, ultimo, ultimos4, tickets } = require('../db/data.json');
        if( hoy === this.hoy ){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;

        }else{
            //es otro dia
            this.guardarDB();
        }
    }
    
    guardarDB(){
        const dbpath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbpath, JSON.stringify(this.ToJson));
    }

    siguiente(){
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);
        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket( escritorio ){
        //no hay tickets
        if(this.tickets.length === 0){
            return null;
        }

        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        this.ultimos4.unshift(ticket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1, 1);
        }

        this.guardarDB();
        
        return ticket;
    }

}

module.exports = ticketControl;