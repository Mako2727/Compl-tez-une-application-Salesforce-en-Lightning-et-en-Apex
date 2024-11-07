@IsTest
private class AccountCasesControllerTest {
    @TestSetup
    static void setup() {
      Account testAccount = TestDataFactory.createTestAccount();
      TestDataFactory.createTestCase(testAccount.Id, 'Test Subject'); // Utilisation de la méthode
    }
  
    @IsTest
    static void testFindCasesBySubject() {
      // Sélectionne le compte de test créé
      Account testAccount = [SELECT Id FROM Account LIMIT 1];
  
      // Définit le terme de recherche pour le champ Subject
      String likeSearchTerm = 'Test%';
  
      Test.startTest();
      List<Case> results = AccountCasesController.findCasesBySubject(
        likeSearchTerm,
        testAccount.Id
        
      );
      Test.stopTest();
      Assert.areNotEqual(0, results.size(), 'Should return at least one case');
    }
}