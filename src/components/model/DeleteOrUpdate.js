export class DeleteOrUpdate {
    constructor(
      id,
      operation,
      doubleCheckMessage,
      newReport
    ) {
      this.id = id;
      this.operation = operation;
      this.doubleCheckMessage = doubleCheckMessage;
      this.newReport = newReport;
    }
  }
  