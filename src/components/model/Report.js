export class Report {
  constructor(
    id,
    reportName,
    companyUserName,
    company,
    email,
    type,
    reportValues
  ) {
    this.id = id;
    this.reportName = reportName;
    this.companyUserName = companyUserName;
    this.company = company;
    this.email = email;
    this.type = type;
    this.reportValues = reportValues;
  }
}
