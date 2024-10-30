public with sharing class AccountCasesController {
  @AuraEnabled
  public static List<Case> findCasesBySubject(
    String searchTerm,
    string accountId
  ) {
    try {
      // Construction de la chaîne avec les wildcards pour la recherche
      String likeSearchTerm = '%' + searchTerm + '%';
      return CasesSelector.getCasesBySubjectAccountId(
        accountId,
        likeSearchTerm
      );
    } catch (Exception e) {
      // Lance une exception gérée pour que le LWC puisse comprendre l'erreur
      throw new AuraHandledException(
        'Erreur lors de la recherche des cas: ' + e.getMessage()
      );
    }
  }
}
