function fn() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);
  if (!env) {
    env = 'dev';
  }
  var config = {
    env: env,
    baseUrl: 'http://localhost:8001',
    // credenciales de test: se pueden sobreescribir con
    // -Dadmin.user=... -Dadmin.password=... (ver README-KARATE.md)
    adminUser: karate.properties['admin.user'] || 'admin',
    adminPassword: karate.properties['admin.password'] || 'admin123'
  }
  if (env == 'dev') {
    // customize
    // e.g. config.foo = 'bar';
  } else if (env == 'e2e') {
    config.baseUrl = karate.properties['e2e.baseUrl'] || config.baseUrl;
  }
  karate.configure('connectTimeout', 5000);
  karate.configure('readTimeout', 5000);
  return config;
}