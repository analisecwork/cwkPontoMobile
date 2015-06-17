/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {

    var _cpf;
    var _senha;

    var store = new Lawnchair({name: 'pontoMB'}, function(store) {
        store.get('userInfo', function(user) {
            _cpf = user.cpf;
            _senha = user.senha;
        });
    });

    function InserirLinhasCartaoPontoNormal(dia, horas, cargaDiurna, cargaNoturna) {
        var html = "<div class=ui-block-a>" + dia + "</div>";
        html += "<div class=ui-block-b>" + horas + "</div>";
        html += "<div class=ui-block-c>" + cargaDiurna + "</div>";
        html += "<div class=ui-block-d>" + cargaNoturna + "</div>";
        $("#insertAfter").after(html);
    }

    function GetDadosJornada() {
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://177.72.160.122:8080/WebService/ServicoMobile.svc/User/jornada/?cpf=" + _cpf + "&senha=" + _senha,
            dataType: "json",
            cache: false,
            async: false,
            error: function(request, error) {
                navigator.notification.alert("Conexão de dados inativa.", alertCallback, "Atenção", "Ok");
            },
            success: function(data, status, req) {

                var _descJornada = "Tipo Horário: " + data.WS_GetJornadaResult[1].TipoHorario + "<br/>";
                _descJornada += "Jornada: " + data.WS_GetJornadaResult[1].Ent_1_Sai_1 + " " + data.WS_GetJornadaResult[1].Ent_2_Sai_2;

                // Atualizar labels
                $("#lb_TotalDiurno").text(data.WS_GetJornadaResult[1].TotalHorasDiurna);
                $("#lb_TotalNoturno").text(data.WS_GetJornadaResult[1].TotalHorasNoturna);
                $("#lb_DescJornada").html(_descJornada);

                var tamanhoFor = data.WS_GetJornadaResult[1].QuantidadeDias;

                for (var i = 0; i < tamanhoFor; i++) {
                    var _dia = data.WS_GetJornadaResult[i].Data + "<br/>" + data.WS_GetJornadaResult[i].DiaSemana;
                    var _horas = data.WS_GetJornadaResult[i].Ent_1_Sai_1;
                    _horas += "<br/>" + data.WS_GetJornadaResult[i].Ent_2_Sai_2;
                    var _cargaDiurna = data.WS_GetJornadaResult[i].TrabalhadaDiurna;
                    var _cargaNoturna = data.WS_GetJornadaResult[i].TotalHorasNoturna;
                    InserirLinhasCartaoPontoNormal(_dia, _horas, _cargaDiurna, _cargaNoturna);
                }
            }
        });
    }
    function alertCallback() {

    }
    GetDadosJornada();

    $("#bt_VoltarTelaCartaoPonto").click(function() {
        window.location.replace("cartaoPonto.html");
    });
    onLoad();
});

function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
}

function onBackKeyDown() {
    window.location.replace("cartaoPonto.html");
}