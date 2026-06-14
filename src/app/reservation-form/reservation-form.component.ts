import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router ,ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private frombuilder : FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }
  ngOnInit(): void {
    this.reservationForm = this.frombuilder.group({
      checkInDate : ['',Validators.required],
      checkOutDate : ['',Validators.required],
      guestName : ['',Validators.required],
      guestEmail : ['',[Validators.required, Validators.email]],
      roomNumber : ['',Validators.required]
    });
    let id = this.route.snapshot.paramMap.get('id');
    if (id){
       let reservation = this.reservationService.getReservation(id);
       if (reservation){
        this.reservationForm.patchValue(reservation);
       }
    }
  }
  onSubmit() {
    if (this.reservationForm.valid) {
      console.log("la",this.reservationForm.value);
        let reservation : Reservation = this.reservationForm.value;
         let id = this.route.snapshot.paramMap.get('id');
         console.log("id",id);
         if (id){
            //update
            this.reservationService.editReservation(id,reservation);
         }else{
            //add
            this.reservationService.addReservation(reservation);
         }
        this.router.navigate(['/list']);
    }else{
      console.log("invalid");
    }
  }



}
