import Ticket from "../Ticket";
import { v4 as uuidv4 } from 'uuid';
import Board from "../Board";

export default class TicketHook {

    public static async generateReservationNumber(ticket: Ticket) {
        const reservationNumber = uuidv4();
        ticket.reservationNumber = reservationNumber;
        ticket.status = "PENDING";
        ticket.state = true;
    }

    public static async toggleBoardToBusy(ticket: Ticket) {
        if (ticket.$dirty.status) {
            const isBusy = ticket.$dirty.status === "FINALIZED" 
                || ticket.$dirty.status === "CANCEL" ? 0 : 1;
            // actualizar board
            await Board.query()
                .where('id', ticket.boardId)
                .update({ isBusy })
        }
    }

}