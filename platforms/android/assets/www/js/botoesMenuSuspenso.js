/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {

    $("#bt_SuspCartaoPonto").click(function() {
        window.location.replace("cartaoPonto.html");
    });

    $("#bt_Sair").click(function() {
        removeEntity();
        window.location.replace("index.html");
    });

    function alertCallback() {

    }
});