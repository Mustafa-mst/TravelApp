/** A template is a reusable plan with no dates; a trip is one anchored to a start date. */
export enum TripDetailMode {
  Template = "template",
  Trip = "trip",
}

export enum TripStatus {
  Planned = "planned",
  Active = "active",
  Completed = "completed",
  Cancelled = "cancelled",
}
