@IsTest
private class CasesSelectorTest {
  @TestSetup
  static void setup() {
    Account testAccount = TestDataFactory.createTestAccount();
    TestDataFactory.createTestCase(testAccount.Id, 'Test Subject'); // Utilisation de la méthode
  }

  @IsTest
  static void testGetCasesBySubjectAccountId() {
    // Sélectionne le compte de test créé
    Account testAccount = [SELECT Id FROM Account LIMIT 1];

    // Définit le terme de recherche pour le champ Subject
    String likeSearchTerm = 'Test%';

    Test.startTest();
    List<Case> results = CasesSelector.getCasesBySubjectAccountId(
      testAccount.Id,
      likeSearchTerm
    );
    Test.stopTest();
    Assert.areNotEqual(0, results.size(), 'Should return at least one case');
  }
}
