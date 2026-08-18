package examples;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

// Punto de entrada "corre todo": en vez de ejecutar cada Runner por
// separado (AuthRunner, UsersRunner), busca y corre TODOS los .feature
// bajo classpath:examples de una sola vez. El test de JUnit falla si
// cualquier escenario de Karate falla (results.getFailCount() > 0).
class ExamplesTest {

    @Test
    void testParallel() {

        Results results = Runner.path("classpath:examples")
                //.outputCucumberJson(true)
                .parallel(1); // 1 hilo: los escenarios comparten datos contra el mismo backend

        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }

}