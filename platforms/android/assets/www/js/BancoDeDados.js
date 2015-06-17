function createEntity(cpf, senha) {
    window.localStorage.setItem("cpf", cpf);
    window.localStorage.setItem("senha", senha);
    window.localStorage.setItem("ch", "1");
}

function returnEntityCpf() {
    return window.localStorage.getItem("cpf");
}

function returnEntitySenha() {
    return window.localStorage.getItem("senha");
}

function returnBoolCh(){
    return window.localStorage.getItem("ch");
}

function removeEntity() {
    window.localStorage.setItem("senha", "");
    window.localStorage.setItem("ch", "0");
}