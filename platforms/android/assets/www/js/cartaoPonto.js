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

    function InserirLinhasCartaoPonto(data, dia, marcacao, saldo, ref, diaSemana, nmDia, consMaisMeses, j) {

        var inc = j % 2;

        if (consMaisMeses) {
            var html = "<div class='ui-block-a'style='height: 70px'>" + " <p class='textoInvertido'>" + diaSemana + "</p> " + "</div>";
            html += "<div class='ui-block-b cel" + inc + "' style='height: 70px'>" + nmDia + "</div>";
            html += "<div class='ui-block-c cel" + inc + "' style='height: 70px' id='y" + data + "'>" + marcacao + "</div>";
            html += "<div class='ui-block-d cel" + inc + "' style='height: 70px' id='y" + data + "'><b>" + saldo + "</b></div>";
        } else {
            var html = "<div class='ui-block-a'>" + " <p class='textoInvertido'>" + diaSemana + "</p> " + "</div>";
            html += "<div class='ui-block-b cel" + inc + "'>" + nmDia + "</div>";
            html += "<div class='ui-block-c cel" + inc + "' id='y" + data + "'>" + marcacao + "</div>";
            html += "<div class='ui-block-d cel" + inc + "' id='y" + data + "'><b>" + saldo + "</b></div>";
        }
        $("#insertAfter" + ref).after(html);
    }

    $("div").on("click", function(event) {
        if (event.target.id.charAt(0) === "y") {
            event.preventDefault();
            event.stopImmediatePropagation();
            GetTotalizadorDiario(event.target.id.replace("y", ""));
            $.mobile.changePage("#totalDiario", null, true, true);
        }
    });

    $("#lb_Jornada0").click(function() {
        window.location.replace("jornada.html");
    });
    $("#lb_Jornada1").click(function() {
        window.location.replace("jornada.html");
    });
    $("#lb_Jornada2").click(function() {
        window.location.replace("jornada.html");
    });

    GetDadosCartaoPonto();

    function GetDadosCartaoPonto() {
        setTimeout(function() {
            $.mobile.loading("show");
        }, 1);
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://177.72.160.122:8080/WebService/ServicoMobile.svc/User/CartaoPonto/?cpf=" + _cpf + "&senha=" + _senha,
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
                for (var j = 0; j < data.WS_GetCartaoPontoResult[0].qntCartoesMes; j++) {
                    var _consMaisMeses = false;
                    var _dia = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].Dia + "<br/>";
                    _dia += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].Data;
                    var _marc = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida1 + "<br/>";
                    _marc += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida2 + "<br/>";

                    if (data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida3 !== '--:-- - --:--') {
                        _marc = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida1 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida2 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida3;
                        _consMaisMeses = true;
                    }

                    if (data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida4 !== '--:-- - --:--') {
                        _marc = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida1 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida2 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida3 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].EntradaSaida4;
                        _consMaisMeses = true;
                    }

                    var _saldo = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].HorasTrabalhadas;
                    var _data = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].Data;
                    var _diaSemana = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].Dia;
                    var _nmDia = data.WS_GetCartaoPontoResult[0].listaCartaoPonto[j].NmDia;

                    $("#lb_TotalHoras0").text(data.WS_GetCartaoPontoResult[0].qntHorasMensais);
                    $("#lb_Mes0").text(data.WS_GetCartaoPontoResult[0].mes);
                    $("#lb_Jornada0").html(data.WS_GetCartaoPontoResult[0].jornada);
                    InserirLinhasCartaoPonto(_data, _dia, _marc, _saldo, "0", _diaSemana, _nmDia, _consMaisMeses, j);
                }
                for (var j = 0; j < data.WS_GetCartaoPontoResult[1].qntCartoesMes; j++) {
                    var _consMaisMeses = false;
                    var _dia = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].Dia + "<br/>";
                    _dia += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].Data;
                    var _marc = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida1 + "<br/>";
                    _marc += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida2 + "<br/>";

                    var _saldo = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].HorasTrabalhadas;
                    var _data = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].Data;
                    var _diaSemana = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].Dia;
                    var _nmDia = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].NmDia;

                    if (data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida3 !== '--:-- - --:--') {
                        _marc = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida1 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida2 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida3;
                        _consMaisMeses = true;
                    }

                    if (data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida4 !== '--:-- - --:--') {
                        _marc = data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida1 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida2 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida3 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[1].listaCartaoPonto[j].EntradaSaida4;
                        _consMaisMeses = true;
                    }

                    $("#lb_TotalHoras1").text(data.WS_GetCartaoPontoResult[1].qntHorasMensais);
                    $("#lb_Mes1").text(data.WS_GetCartaoPontoResult[1].mes);
                    $("#lb_Jornada1").html(data.WS_GetCartaoPontoResult[1].jornada);
                    InserirLinhasCartaoPonto(_data, _dia, _marc, _saldo, "1", _diaSemana, _nmDia, _consMaisMeses, j);
                }
                for (var j = 0; j < data.WS_GetCartaoPontoResult[2].qntCartoesMes; j++) {
                    var _consMaisMeses = false;
                    var _dia = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].Dia + "<br/>";
                    _dia += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].Data;
                    var _marc = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida1 + "<br/>";
                    _marc += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida2 + "<br/>";

                    if (data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida3 !== '--:-- - --:--') {
                        _marc = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida1 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida2 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida3;
                        _consMaisMeses = true;
                    }

                    if (data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida4 !== '--:-- - --:--') {
                        _marc = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida1 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida2 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida3 + " - ";
                        _marc += data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].EntradaSaida4;
                        _consMaisMeses = true;
                    }

                    var _saldo = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].HorasTrabalhadas;
                    var _data = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].Data;
                    var _diaSemana = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].Dia;
                    var _nmDia = data.WS_GetCartaoPontoResult[2].listaCartaoPonto[j].NmDia;

                    $("#lb_TotalHoras2").text(data.WS_GetCartaoPontoResult[2].qntHorasMensais);
                    $("#lb_Mes2").text(data.WS_GetCartaoPontoResult[2].mes);
                    $("#lb_Jornada2").html(data.WS_GetCartaoPontoResult[2].jornada);
                    InserirLinhasCartaoPonto(_data, _dia, _marc, _saldo, "2", _diaSemana, _nmDia, _consMaisMeses, j);
                }
                setTimeout(function() {
                    $.mobile.loading("hide");
                }, 1);
            }
        });
    }

    function GetTotalizadorMensal(_mes) {
        setTimeout(function() {
            $.mobile.loading("show");
        }, 1);
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://177.72.160.122:8080/WebService/ServicoMobile.svc/User/CartaoPonto/TotalMensal/?cpf=" + _cpf + "&mes=" + _mes + "&senha=" + _senha,
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
                $("#lb_TrabalhadoDiurnoMensal").text(data.WS_GetTotalMensalResult.TrabalhadaDiurna);
                $("#lb_TrabalhadoNoturnoMensal").text(data.WS_GetTotalMensalResult.TrabalhadaNoturna);
                $("#lb_HorasFaltasDiurnaMensal").text(data.WS_GetTotalMensalResult.FaltaDiurna);
                $("#lb_HorasFaltasNoturnaMensal").text(data.WS_GetTotalMensalResult.FaltaNoturna);
                $("#lb_HorasDSRMensal").text(data.WS_GetTotalMensalResult.DSR);
                $("#lb_PercentualXtraDiurna50Mensal").text(data.WS_GetTotalMensalResult.pExt50Diurno);
                $("#lb_PercentualXtraDiurna100Mensal").text(data.WS_GetTotalMensalResult.pExt100Diurno);
                $("#lb_PercentualXtraDiurnaTotalMensal").text(data.WS_GetTotalMensalResult.pExtTotalDiurno);
                $("#lb_PercentualXtraNoturna50Mensal").text(data.WS_GetTotalMensalResult.pExt50Diurno);
                $("#lb_PercentualXtraNoturna100Mensal").text(data.WS_GetTotalMensalResult.pExt100Diurno);
                $("#lb_PercentualXtraNoturnaTotalMensal").text(data.WS_GetTotalMensalResult.pExtTotalDiurno);
                $("#lb_BHCreditoMensal").text(data.WS_GetTotalMensalResult.BhCreditoMes);
                $("#lb_BHDebitoMensal").text(data.WS_GetTotalMensalResult.BhDebitoMes);
                $("#lb_BHSaldoAnterior").text(data.WS_GetTotalMensalResult.BhSaldoAnterior);
                $("#lb_BHSaldoAtual").text(data.WS_GetTotalMensalResult.BhSaldoAtual);
                setTimeout(function() {
                    $.mobile.loading("hide");
                }, 1);
            }
        });
    }

    $("#lb_TotalHoras0").click(function() {
        var m = $("#lb_Mes0").text();
        GetTotalizadorMensal(m);
        $.mobile.changePage("#totalMensal", null, true, true);
    });

    $("#lb_TotalHoras1").click(function() {
        var m = $("#lb_Mes1").text();
        GetTotalizadorMensal(m);
        $.mobile.changePage("#totalMensal", null, true, true);
    });

    $("#lb_TotalHoras2").click(function() {
        var m = $("#lb_Mes2").text();
        GetTotalizadorMensal(m);
        $.mobile.changePage("#totalMensal", null, true, true);
    });

    function GetTotalizadorDiario(_dia) {
        setTimeout(function() {
            $.mobile.loading("show");
        }, 1);
        $.support.cors = true;
        $.ajax({
            type: "GET",
            url: "http://177.72.160.122:8080/WebService/ServicoMobile.svc/User/CartaoPonto/TotalDiario/?cpf=" + _cpf + "&dia=" + _dia + "&senha=" + _senha,
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
                $("#lb_TrabalhadoDiurnoDiario").text(data.WS_GetTotalDiarioResult.TrabalhadaDiurna);
                $("#lb_TrabalhadoNoturnoDiario").text(data.WS_GetTotalDiarioResult.TrabalhadaNoturna);
                $("#lb_HorasFaltasDiurnaDiario").text(data.WS_GetTotalDiarioResult.FaltaDiurna);
                $("#lb_HorasFaltasNoturnaDiario").text(data.WS_GetTotalDiarioResult.FaltaNoturna);
                $("#lb_HorasDSRDiario").text(data.WS_GetTotalDiarioResult.DSR);
                $("#lb_PercentualXtraDiurna50Diario").text(data.WS_GetTotalDiarioResult.pExt50Diurno);
                $("#lb_PercentualXtraDiurna100Diario").text(data.WS_GetTotalDiarioResult.pExt100Diurno);
                $("#lb_PercentualXtraDiurnaTotalDiario").text(data.WS_GetTotalDiarioResult.pExtTotalDiurno);
                $("#lb_PercentualXtraNoturna50Diario").text(data.WS_GetTotalDiarioResult.pExt50Diurno);
                $("#lb_PercentualXtraNoturna100Diario").text(data.WS_GetTotalDiarioResult.pExt100Diurno);
                $("#lb_PercentualXtraNoturnaTotalDiario").text(data.WS_GetTotalDiarioResult.pExtTotalDiurno);
                $("#lb_BHCreditoDiario").text(data.WS_GetTotalDiarioResult.BhCredito);
                $("#lb_BHDebitoDiario").text(data.WS_GetTotalDiarioResult.BhDebito);
                setTimeout(function() {
                    $.mobile.loading("hide");
                }, 1);
            }
        });
    }

    function alertCallback() {

    }

    function selectbubble(page) {
        $.each($('#bubble-holder div'), function(index, value) {
            var bubble = $(this);
            bubble.css('background', '#8B8B7A');
            if (bubble.attr('id') === 'page' + page.attr('data-pagination') + '-bubble') {
                bubble.css('background', '#7FFF00');
            }
        });
    }

    $(document).on('pagebeforeshow', 'div[data-role="page"]', function() {
        selectbubble($(this));
    });

    $("#bt_VoltarTelaUser").on("click", function() {
        window.location.replace("index.html#dadosUser");
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
    if ($.mobile.activePage.attr('id') === 'totalDiario' || $.mobile.activePage.attr('id') === 'totalMensal') {
        window.location.replace("cartaoPonto.html");
    } else {
        window.location.replace("index.html#dadosUser");
    }
}