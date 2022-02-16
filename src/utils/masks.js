function numberMask(value) {
  return String(value)
    .replace(/\D+/g, '');
}

function cnpjMask(value) {
  return String(value)
    .replace(/\D+/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function cpfMask(value) {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

function cepMask(value) {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(.\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
}

function telephoneMask(value) {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
}

function rgMask(value) {
  return String(value)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(.\d{3})(\d)/, '$1.$2')
    .replace(/(.\d{3}.\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');
}

export {
  cnpjMask,
  cpfMask,
  cepMask,
  rgMask,
  telephoneMask,
  numberMask
}