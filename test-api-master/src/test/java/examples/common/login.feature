Feature: Login reutilizable
  # No se corre sola en el suite normal: la llaman otros features con
  # "callonce read('classpath:examples/common/login.feature')" para obtener
  # un token válido una sola vez y reusarlo en todos sus escenarios.

  Background:
    * url baseUrl

  Scenario:
    Given path '/api/auth/login'
    And request { usuario: '#(adminUser)', password: '#(adminPassword)' }
    When method post
    Then status 200
    * def token = response.token
