export function isLiveNow(): boolean {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours + minutes / 60;

  // Sunday between 9:00 AM and 6:00 PM
  return day === 0 && currentTime >= 9.0 && currentTime <= 18.0;
}
