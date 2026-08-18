package examples.auth;

import com.intuit.karate.junit5.Karate;

// Puente entre JUnit 5 y Karate: le dice a Karate que corra auth.feature
// (mismo paquete que esta clase) como si fuera un test de JUnit normal,
// así Maven/el IDE lo detectan sin configuración extra.
class AuthRunner {

    @Karate.Test
    Karate testAuth() {
        return Karate.run("auth").relativeTo(getClass());
    }

}
