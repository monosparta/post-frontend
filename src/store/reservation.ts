export interface Reservation {
  id: string
  status: number
}

export enum ReservationStatus {
  Cancelled = -1,
  Reserved = 1,
}

export function formatReservationStatus(status: number): string {
  switch (status) {
    case ReservationStatus.Cancelled:
      return '已取消'
    case ReservationStatus.Reserved:
      return '已預約'
    default:
      return ''
  }
}
