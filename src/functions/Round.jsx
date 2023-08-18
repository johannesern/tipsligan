export function RoundIsOpen(round, updateIsOpen) {
  console.log("Inside round component:", round);
  const data = {
    Id: round.id,
    Title: round.title,
    StartDate: round.startDate,
    EndDate: round.endDate,
    UserId: round.userId,
    IsActive: round.isActive,
    IsOpen: updateIsOpen,
  };
  console.log("Data leaving round component:", data);
  return data;
}

export function RoundIsActive(round, updateIsActive) {
  console.log("Inside round component:", round);
  const data = {
    Id: round.id,
    Title: round.title,
    StartDate: round.startDate,
    EndDate: round.endDate,
    UserId: round.userId,
    IsActive: updateIsActive,
    IsOpen: round.isOpen,
  };
  console.log("Data leaving round component:", data);
  return data;
}
