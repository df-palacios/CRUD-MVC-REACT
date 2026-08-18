// Boilerplate de Create React App: mide métricas de performance (Core Web
// Vitals) y las pasa a onPerfEntry si se le da una función. Se importa el
// paquete 'web-vitals' de forma dinámica para no afectar el bundle inicial
// cuando nadie usa esta función (index.js la llama sin argumentos).
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
