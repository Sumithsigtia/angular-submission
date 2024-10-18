import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class SeatBookingComponent {
  numSeats: number = 1;
  seatLayout: any[][] = [];
  bookedSeats: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.initializeSeats();
  }

  // Initialize seats: 11 rows of 7 seats and 1 row of 3 seats
  initializeSeats() {
    for (let i = 0; i < 11; i++) {
      const row = [];
      for (let j = 1; j <= 7; j++) {
        row.push({ number: i * 7 + j, booked: false });
      }
      this.seatLayout.push(row);
    }
    const lastRow = [];
    for (let j = 1; j <= 3; j++) {
      lastRow.push({ number: 77 + j, booked: false });
    }
    this.seatLayout.push(lastRow);
  }

  // Calculate the total available seats
  getAvailableSeatsCount(): number {
    let availableSeats = 0;
    for (const row of this.seatLayout) {
      availableSeats += row.filter(seat => !seat.booked).length;
    }
    return availableSeats;
  }

  // Book seats based on user input
  bookSeats() {
    const availableSeats = this.getAvailableSeatsCount();

    // If not enough seats are available
    if (availableSeats < this.numSeats) {
      alert(`Only ${availableSeats} seats are available. You cannot book ${this.numSeats} seats.`);
      return;
    }

    if (this.numSeats > 7) {
      alert('You can only book a maximum of 7 seats.');
      return;
    }

    let seatsToBook = this.numSeats;
    const booked: number[] = [];

    // Try to book in a single row if possible
    for (let i = 0; i < this.seatLayout.length; i++) {
      const row = this.seatLayout[i];
      const availableSeatsInRow = row.filter(seat => !seat.booked);

      if (availableSeatsInRow.length >= seatsToBook) {
        for (let j = 0; j < seatsToBook; j++) {
          availableSeatsInRow[j].booked = true;
          booked.push(availableSeatsInRow[j].number);
        }
        this.bookedSeats = booked;
        return;
      }
    }

    // If not possible, book nearest available seats across rows
    for (let i = 0; i < this.seatLayout.length; i++) {
      const row = this.seatLayout[i];
      for (let j = 0; j < row.length; j++) {
        if (!row[j].booked && seatsToBook > 0) {
          row[j].booked = true;
          booked.push(row[j].number);
          seatsToBook--;
        }
      }
      if (seatsToBook === 0) break;
    }

    this.bookedSeats = booked;
  }
}
