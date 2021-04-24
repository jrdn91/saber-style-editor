import Record from "./base"

export class User extends Record {
  get initials() {
    return `${this.first_name?.[0] || ""}${this.last_name?.[0] || ""}`
  }
}
