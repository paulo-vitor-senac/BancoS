const secoes = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('nav a');
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      linksNav.forEach((link) => link.classList.remove('ativo'));

      const idSecao = entrada.target.id;
      const linkCorrespondente = document.querySelector(`nav a[href="#${idSecao}"]`);
      if (linkCorrespondente) {
        linkCorrespondente.classList.add('ativo');
      }
    }
  });
}, { threshold: 0.5 });

secoes.forEach((secao) => observador.observe(secao));