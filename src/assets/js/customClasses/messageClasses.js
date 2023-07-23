export default class Message {
  constructor(variant, message) {
    this.id = crypto.randomUUID();
    this.variant = variant === "error" ? "danger" : variant;
    this.message = message;
  }
}
