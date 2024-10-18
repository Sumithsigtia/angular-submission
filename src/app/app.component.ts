import { Component } from '@angular/core';
import { SeatBookingComponent } from './seat-booking/seat-booking.component'; // Import SeatBookingComponent

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [SeatBookingComponent] // Import the SeatBookingComponent here
})
export class AppComponent {
  title = 'Train Seat Reservation';
}
