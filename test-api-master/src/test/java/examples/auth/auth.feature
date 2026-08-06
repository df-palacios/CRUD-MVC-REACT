Feature: Autenticación

  Background:
    * url baseUrl


  Scenario: Login exitoso devuelve un token

    Given path '/api/auth/login'
    And request { usuario: '#(adminUser)', password: '#(adminPassword)' }
    When method post
    Then status 200

    And match response.ok == true
    And match response.token == '#string'
    And match response.token != ''


  Scenario: Login con password incorrecto

    Given path '/api/auth/login'
    And request { usuario: '#(adminUser)', password: 'password-incorrecta' }
    When method post
    Then status 401

    And match response.ok == false


  Scenario: Login con usuario que no existe

    Given path '/api/auth/login'
    And request { usuario: 'usuario_que_no_existe', password: 'cualquiera' }
    When method post
    Then status 401

    And match response.ok == false


  Scenario: Login sin usuario o password -> 400

    Given path '/api/auth/login'
    And request { usuario: '', password: '' }
    When method post
    Then status 400

    And match response.ok == false


  Scenario: Consultar usuarios sin token -> 401

    Given path '/api/usuarios'
    When method get
    Then status 401

    And match response.ok == false


  Scenario: Consultar usuarios con token inválido -> 401

    Given path '/api/usuarios'
    And header Authorization = 'Bearer token-invalido-no-existe'
    When method get
    Then status 401

    And match response.ok == false


  Scenario: Crear usuario sin token -> 401

    * def usuario =
    """
    {
      "nombres": "Sin",
      "apellidos": "Token",
      "correo": "sintoken@test.com",
      "telefonos": 111,
      "celular": 222,
      "direccion": "Calle 1",
      "ciudad": "Cali"
    }
    """

    Given path '/api/usuarios'
    And request usuario
    When method post
    Then status 401

    And match response.ok == false
