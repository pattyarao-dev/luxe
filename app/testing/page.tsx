"use client"
import React, { useState } from 'react';

const DateTimePicker: React.FC = () => {
  const [dateTime, setDateTime] = useState<string>('');
  const [chosenDateTime, setChosenDateTime] = useState<string>('');

  const handleDateTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Convert the user-inputted date and time to UTC format
    const utcDateTime = new Date(dateTime).toISOString();
    setChosenDateTime(utcDateTime);
  };

  return (
    <div>
      <h2>Date and Time Picker</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="datetime">Choose Date and Time:</label>
        <input
          type="datetime-local"
          id="datetime"
          name="datetime"
          value={dateTime}
          onChange={handleDateTimeChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {chosenDateTime && (
        <div>
          <h3>Chosen Date and Time (ISO Format - UTC):</h3>
          <p>{chosenDateTime}</p>
        </div>
      )}
    </div>
  );
};

export default DateTimePicker;
