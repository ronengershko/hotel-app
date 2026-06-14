import { Component , OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  
  reservations: Reservation[] = [];

  constructor (private ReservationService: ReservationService) { }
  
  ngOnInit() : void {
    this.reservations = this.ReservationService.getReservations();
  }

  deleteReservation(id: string) : void {
    this.ReservationService.deleteReservation(id);
    // this.reservations = this.ReservationService.getReservations();
  }
}
