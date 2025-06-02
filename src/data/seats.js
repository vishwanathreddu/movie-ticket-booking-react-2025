// src/data/seats.js
export const generateSeats = (rows, seatsPerRow) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const seats = [];
    
    for (let i = 0; i < rows; i++) {
      for (let j = 1; j <= seatsPerRow; j++) {
        seats.push({
          id: `${alphabet[i]}${j}`,
          row: alphabet[i],
          number: j,
          status: Math.random() < 0.2 ? "booked" : "available", // Randomly mark some seats as booked
          type: j <= 2 || j >= seatsPerRow - 1 ? "standard" : 
                (j > 2 && j < seatsPerRow - 3) ? "premium" : "standard"
        });
      }
    }
    
    return seats;
  };
  