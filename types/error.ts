export enum ErrorMessageEnum {
  IsRequired = "Value is required",
  EmailIsNotValid = "Value is not a valid email address",
  EmailNotFound = "Firebase: Error (auth/user-not-found).",
  PasswordNotFound = "Firebase: Error (auth/wrong-password).",
  PasswordMinLength = "This field should be at least 6 characters long",
  InvalidCradential = "Firebase: Error (auth/invalid-credential).",
  InvalidData = "Function addDoc() called with invalid data. Unsupported field value: undefined",
  InvalidDataUpdate = "Function updateDoc() called with invalid data. Unsupported field value: undefined",
}
