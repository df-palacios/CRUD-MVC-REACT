package examples.users;

import com.intuit.karate.junit5.Karate;

// Igual que AuthRunner pero para users.feature: expone el CRUD de
// contactos como un test de JUnit ejecutable vía Maven/el IDE.
class UsersRunner {

    @Karate.Test
    Karate testUsers() {
        return Karate.run("users").relativeTo(getClass());
    }

}
