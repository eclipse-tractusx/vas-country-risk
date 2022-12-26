export class Report {
  constructor(id, reportName, companyUserName, company, type, reportValues) {
    this.id = id;
    this.reportName = reportName;
    this.companyUserName = companyUserName;
    this.company = company;
    this.type = type;
    this.reportValues = reportValues;
  }
}
