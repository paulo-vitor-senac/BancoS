const form = document.getElementById('formCadastro');

const campoNome           = document.getElementById('nome');
const campoIdade          = document.getElementById('idade');
const campoCPF            = document.getElementById('cpf');
const campoEmail          = document.getElementById('email');
const campoTelefone       = document.getElementById('telefone');
const campoSenha          = document.getElementById('senha');
const campoConfirmarSenha = document.getElementById('confirmarSenha');

const mensagemSucesso = document.getElementById('mensagem-sucesso');
campoCPF.addEventListener('input', () => {
  let valor = campoCPF.value.replace(/\D/g, ''); 

  if (valor.length > 3)  valor = valor.slice(0, 3) + '.' + valor.slice(3);
  if (valor.length > 7)  valor = valor.slice(0, 7) + '.' + valor.slice(7);
  if (valor.length > 11) valor = valor.slice(0, 11) + '-' + valor.slice(11);

  campoCPF.value = valor;
});
campoTelefone.addEventListener('input', () => {
  let valor = campoTelefone.value.replace(/\D/g, '');

  if (valor.length > 0)  valor = '(' + valor;
  if (valor.length > 3)  valor = valor.slice(0, 3) + ') ' + valor.slice(3);
  if (valor.length > 10) valor = valor.slice(0, 10) + '-' + valor.slice(10);

  campoTelefone.value = valor;
});
function mostrarErro(campo, mensagem) {
  const erroElemento = document.getElementById('erro-' + campo.id);
  erroElemento.textContent = mensagem;
  campo.classList.add('invalido');
}
function limparErro(campo) {
  const erroElemento = document.getElementById('erro-' + campo.id);
  erroElemento.textContent = '';
  campo.classList.remove('invalido');
}
function validarFormulario() {
  let valido = true;
  if (campoNome.value.trim() === '') {
    mostrarErro(campoNome, 'Por favor, informe seu nome.');
    valido = false;
  } else {
    limparErro(campoNome);
  }
  const idade = parseInt(campoIdade.value);
  if (isNaN(idade) || idade < 18 || idade > 120) {
    mostrarErro(campoIdade, 'Idade deve ser entre 18 e 120 anos.');
    valido = false;
  } else {
    limparErro(campoIdade);
  }
  const cpfLimpo = campoCPF.value.replace(/\D/g, '');
  if (cpfLimpo.length !== 11) {
    mostrarErro(campoCPF, 'CPF inválido. Informe todos os 11 dígitos.');
    valido = false;
  } else {
    limparErro(campoCPF);
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(campoEmail.value)) {
    mostrarErro(campoEmail, 'Informe um e-mail válido.');
    valido = false;
  } else {
    limparErro(campoEmail);
  }
  const telLimpo = campoTelefone.value.replace(/\D/g, '');
  if (telLimpo.length < 10 || telLimpo.length > 11) {
    mostrarErro(campoTelefone, 'Informe um telefone válido com DDD.');
    valido = false;
  } else {
    limparErro(campoTelefone);
  }
  if (campoSenha.value.length < 6) {
    mostrarErro(campoSenha, 'A senha deve ter no mínimo 6 caracteres.');
    valido = false;
  } else {
    limparErro(campoSenha);
  }
  if (campoConfirmarSenha.value !== campoSenha.value) {
    mostrarErro(campoConfirmarSenha, 'As senhas não coincidem.');
    valido = false;
  } else if (campoConfirmarSenha.value === '') {
    mostrarErro(campoConfirmarSenha, 'Por favor, confirme sua senha.');
    valido = false;
  } else {
    limparErro(campoConfirmarSenha);
  }

  return valido;
}
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  if (validarFormulario()) {
    mensagemSucesso.style.display = 'block';
    form.reset();
  }
});