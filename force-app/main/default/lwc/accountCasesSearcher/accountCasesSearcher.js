import { LightningElement, track, api } from "lwc";
import findCasesBySubject from "@salesforce/apex/AccountCasesController.findCasesBySubject";
import AccountId from "@salesforce/schema/AccountHistory.AccountId";

const COLUMNS = [
  { label: "Sujet", fieldName: "Subject", type: "text" },
  { label: "Statut", fieldName: "Status", type: "Picklist" },
  { label: "Priorité", fieldName: "Priority", type: "Picklist" }
];

export default class AccountCaseSearchComponent extends LightningElement {
  @api recordId;
  @track cases;
  @track error;
  searchTerm = "";
  columns = COLUMNS;

  updateSearchTerm(event) {
    this.searchTerm = event.target.value;
    // Vérifie que le terme de recherche n'est pas vide
    if (this.searchTerm) {
      findCasesBySubject({
        searchTerm: this.searchTerm,
        accountId: this.recordId
      })
        .then((result) => {
          this.cases = result; // Stocke les résultats
        })
        .catch((error) => {});
    } else {
      this.cases = null; // Réinitialise le tableau si le terme est vide
    }
  }

  handleSearch() {
    this.loading = true; // Démarre le chargement
    findCasesBySubject({
      searchTerm: this.searchTerm,
      accountId: this.recordId
    })
      .then((result) => {
        this.cases = result;
        this.error = undefined;
      })
      .catch((error) => {
        this.error =
          "Une erreur est survenue lors de la recherche des cases : " +
          error.body.message;
      })
      .finally(() => {
        this.loading = false; // Termine le chargement
      });
  }

  get showTable() {
    return this.cases && this.cases.length > 0;
  }
}
