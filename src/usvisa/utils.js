import config from "./vars.js";

const baseScheduleUrl = `/es-mx/niv/schedule/${config.scheduleId}`;

export const xpaths = {
  // login
  usernameInput: '//input[@id="user_email"]',
  passwordInput: '//input[@id="user_password"]',
  policyCheckbox: '//input[@id="policy_confirmed"]',
  loginButton: '//input[@type="submit"]',
  // verify login status
  signedIn: '(//a[@href="/es-mx/niv/users/sign_out"])[1]',
  invalidCredentials: '//p[contains(@class, "error")]',
  // appointments page
  continueWithAppoinmentButton: `//a[@href="${baseScheduleUrl}/continue_actions"]`,
  // appointment actions page
  reScheduleButton: `//a[@href="${baseScheduleUrl}/appointment" and not(contains(@data-method, "delete"))]`,
  // reschedule appointment page
  noAppointmentsAvailable: '//div[@id="consulate_date_time_not_available"]',
  consulateFacilitiesDropdown:
    '//select[@id="appointments_consulate_appointment_facility_id"]',
  consulateAppointmentDatepicker:
    '//input[@id="appointments_consulate_appointment_date"]',
  consulateAppointmentTimeDropwdown:
    '//select[@id="appointments_consulate_appointment_time"]',
  casFacilitiesDropdown:
    '//select[@id="appointments_asc_appointment_facility_id"]',
  casAppoinmentDatepicker: '//input[@id="appointments_asc_appointment_date"]',
  casAppoinmentTimeDropdown:
    '//select[@id="appointments_asc_appointment_time"]',
  datepickerNextMonthButton: '//a[@data-handler="next"]',
  datepickerPreviousMonthButton: '//a[@data-handler="prev"]',
};
