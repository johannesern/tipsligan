export function RoundIsOpen(round, updateIsOpen) {
  const data = {
    Id: round.id,
    Title: round.title,
    StartDate: round.startDate,
    EndDate: round.endDate,
    UserId: round.userId,
    IsActive: round.isActive,
    IsOpen: updateIsOpen, //This is what will update
  };
  return data;
}

export function RoundIsActive(round, updateIsActive) {
  const data = {
    Id: round.id,
    Title: round.title,
    StartDate: round.startDate,
    EndDate: round.endDate,
    UserId: round.userId,
    IsActive: updateIsActive, //This is what will update
    IsOpen: round.isOpen,
  };
  return data;
}
