/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global alertCallback */

$(function() {

    $("#btLogar").click(function() {
        var _cpf = $("#txtCpf").val();
        var _senha = $("#txtSenha").val();
        if (_cpf === "") {
            navigator.notification.alert("Preencha o cpf.", alertCallback, "Atenção", "Ok");
        } else if (_senha === "") {
            navigator.notification.alert("Preencha a senha.", alertCallback, "Atenção", "Ok");
        } else {
            ConsumirWebServiceLogin(_cpf, _senha);
            var store = new Lawnchair({name: 'pontoMB'}, function(store) {
                var user = {
                    key: 'userInfo',
                    cpf: _cpf,
                    senha: _senha
                };
                store.save(user);
            });
        }
    });

    if ($("#index").is(".ui-page-active")) {
        var cpfBanco = returnEntityCpf();
        var chPerLog = returnBoolCh();
        if (cpfBanco !== null) {
            $("#txtCpf").val(cpfBanco);
        }

        if (chPerLog !== null) {
            if (chPerLog === "0") {
                $("#cb_SalvarSenha").attr("checked", false).checkboxradio("refresh");
            } else {
                $("#cb_SalvarSenha").attr("checked", true).checkboxradio("refresh");
            }
        }
    }

    $("#btDemonstracao").click(function() {
        var _cpf = 63374247512;
        var _senha = "cwork";
        ConsumirWebServiceLogin(_cpf, _senha);

        var store = new Lawnchair({name: 'pontoMB'}, function(store) {
            var user = {
                key: 'userInfo',
                cpf: _cpf,
                senha: _senha
            };
            store.save(user);
        });
    });




    if ($("#index").is(".ui-page-active")) {
        var checked = returnBoolCh();
        if (checked === "1") {
            if (returnEntitySenha() !== "") {
                ConsumirWebServiceLogin(returnEntityCpf(), returnEntitySenha());
                var store = new Lawnchair({name: 'pontoMB'}, function(store) {
                    var user = {
                        key: 'userInfo',
                        cpf: returnEntityCpf(),
                        senha: returnEntitySenha()
                    };
                    store.save(user);
                });
                $("#cb_SalvarSenha").attr("checked", true).checkboxradio("refresh");
            } else {
                ("#txtCpf").val$(returnEntityCpf());
            }
        } else {
            $("#cb_SalvarSenha").attr("checked", false).checkboxradio("refresh");
        }
    }



    onLoad();
    $("#bt_CartaoPonto").click(function() {
        window.location.replace("cartaoPonto.html");
    });
});
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    if ($("#dadosUser").is(".ui-page-active")) {
        try {
            var store = new Lawnchair({name: 'pontoMB'}, function(store) {
                store.get('userInfo', function(user) {
                    var cpf = user.cpf;
                    var senha = user.senha;

                    ConsumirWebServiceLogin(cpf, senha);
                });
            });
            setTimeout(function() {
                $.mobile.loading("hide");
            }, 1);
        } catch (e) {
            alert(e)
        }
    }
}

function onBackKeyDown() {
    var activePage = $.mobile.activePage[0].id;
    if (activePage === "index") {
        navigator.app.exitApp();
    } else {
        $.mobile.changePage("#index", true, true);
    }
}

function ConsumirWebServiceLogin(cpf, senha) {
    setTimeout(function() {
        $.mobile.loading("show");
    }, 1);
    $.support.cors = true;
    $.ajax({
        type: "GET",
        url: "http://177.72.160.122:8080/WebService/ServicoMobile.svc/User/Login/?cpf="
                + cpf + "&senha=" + senha,
        dataType: "json",
        cache: false,
        async: true,
        error: function(error) {
            setTimeout(function() {
                $.mobile.loading("hide");
            }, 1);
            navigator.notification.alert("Conexão de dados inativa.", alertCallback, "Atenção", "Ok");
        },
        success: function(data) {
            if (data.WS_LoginResult.Erro === null) {
                $("#lbNomeUser").text(data.WS_LoginResult.Nome);
                $("#lbCpfUser").text(cpf);
                $("#lbNascUser").text(data.WS_LoginResult.DtNascimento);
                $("#lbPisUser").text(data.WS_LoginResult.PIS);
                $("#lbFuncUser").text(data.WS_LoginResult.Funcao);
                $("#lbEmpUser").text(data.WS_LoginResult.Empresa);
                $("#lbFotoUser").html(data.WS_LoginResult.Foto);
                var chTrue = $("#cb_SalvarSenha").prop("checked");
                if (chTrue) {
                    createEntity(cpf, senha);
                }
                $.mobile.changePage("#dadosUser", null, true, true);
            } else {
                setTimeout(function() {
                    $.mobile.loading("hide");
                }, 1);
                navigator.notification.alert(data.WS_LoginResult.Erro, alertCallback, "Atenção", "Ok");
            }
        }
    });
}