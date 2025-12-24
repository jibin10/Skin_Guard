export interface AppointmentData {
  id: string;
  patient_id: string;
  booking_date: string;
  appointment_date: string;
  appointment_time: string;
  doctor: string;
  condition: string;
  status: string;
  user_details: any;
  doctor_details: any;
}
