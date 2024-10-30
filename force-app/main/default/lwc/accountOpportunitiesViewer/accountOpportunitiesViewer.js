import { LightningElement, api, wire, track } from 'lwc';
import getOpportunities from '@salesforce/apex/AccountOpportunitiesController.getOpportunities';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
  { label: 'Nom Opportunité', fieldName: 'Name', type: 'text' },
  { label: 'Montant', fieldName: 'Amount', type: 'currency' },
  { label: 'Date de Clôture', fieldName: 'CloseDate', type: 'date' },
  { label: 'Phase', fieldName: 'StageName', type: 'Picklist' },
];
export default class AccountOpportunitiesViewer extends LightningElement {
  @api recordId;
  @track opportunities;
  @track error = {};
  wiredOpportunitiesResult;

  @wire(getOpportunities, { accountId: '$recordId' }) //error
  wiredOpportunities(result) {
    this.wiredOpportunitiesResult = result; // Stocke le résultat

    const { data, error } = result;
    this.isLoading = true; // Indicateur de chargement
    if (data) {
      this.opportunities = data;
      this.error = undefined;
      this.isLoading = false; // Arrête le chargement
    } else if (error) {
      this.error = error;
      this.opportunities = undefined;
      this.isLoading = false; // Arrête le chargement
    }
  }

  handleRafraichir() {
    this.isLoading = true; // Démarre le chargement

    // Vérifie si wiredOpportunitiesResult est défini
    if (this.wiredOpportunitiesResult) {
      refreshApex(this.wiredOpportunitiesResult)
        .then(() => {
          this.isLoading = false; // Arrête le chargement
        })
        .catch((error) => {
          this.error = error; // Gérer les erreurs
          this.isLoading = false; // Arrête le chargement
        });
    } else {
      this.isLoading = false; // Assure-toi d'arrêter le chargement
    }
  }

  get showTable() {
    return this.opportunities && this.opportunities.length > 0;
  }
}
