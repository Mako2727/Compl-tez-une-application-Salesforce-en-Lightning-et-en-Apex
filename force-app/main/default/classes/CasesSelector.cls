public with sharing class CasesSelector {
  public static List<Case> getCasesBySubjectAccountId(
    Id accountId,
    String likeSearchTerm
  ) 
  {
    return [
      SELECT Subject, Status, Priority
      FROM Case
      WHERE Subject LIKE :likeSearchTerm AND AccountId = :accountId
    ];
  }
}
