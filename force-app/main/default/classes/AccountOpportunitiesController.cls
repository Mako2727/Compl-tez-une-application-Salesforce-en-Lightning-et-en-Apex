public with sharing class AccountOpportunitiesController {
    @AuraEnabled(Cacheable=true)
    public static List<Opportunity> getOpportunities(Id accountId) {
        try {
            return OpportunitySelector.getOpportunitiesByAccountId(accountId);
          } catch (Exception e) {
            // Lance une exception gérée pour que le LWC puisse comprendre l'erreur
            throw new AuraHandledException(
              'Erreur lors de la recherche des cas: ' + e.getMessage()
            );
          }
    }
}