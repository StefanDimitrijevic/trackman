export const isFacilityOpen = (
  openingHour: string,
  closingHour: string
): boolean => {
  const now = new Date();
  // calculate number of minutes since midnight of the current day
  const currentMinutesSinceMidnight = now.getHours() * 60 + now.getMinutes();

  // Split "HH:MM" into [hour, minute], convert to numbers, and assign via destructuring.
  const [openH, openM] = openingHour.split(":").map(Number);
  const [closeH, closeM] = closingHour.split(":").map(Number);

  const openingTimeInMinutes = openH * 60 + openM;
  const closingTimeInMinutes = closeH * 60 + closeM;

  // Case 1: Opening and closing hours are on the same day (e.g. 09:00 – 17:00)
  if (openingTimeInMinutes < closingTimeInMinutes) {
    return (
      currentMinutesSinceMidnight >= openingTimeInMinutes &&
      currentMinutesSinceMidnight < closingTimeInMinutes
    );
  } else {
    // Case 2: Overnight hours (e.g. 23:00 – 02:00)
    // It's considered "open" if the current time is after opening OR before closing
    return (
      currentMinutesSinceMidnight >= openingTimeInMinutes ||
      currentMinutesSinceMidnight < closingTimeInMinutes
    );
  }
};
