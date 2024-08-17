// ==UserScript==
// @grant         none
// @name          INTYPER
// @namespace     INTYPER
// @version       1.0.2
// @description   MOSTRA POSSIVEIS RESPOSTAS DE DICAS NO GARTIC
// @author        THEO
// @match         https://gartic.com.br/*
// @run-at        document-end
// @require       http://code.jquery.com/jquery-3.3.1.min.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/alimentos.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/animais.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/bandeiras.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/desenho_animado.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/got.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/objetos.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/verbos.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/config.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/functions.js
// @downloadURL   https://raw.githubusercontent.com/iscandalouzINTYPER-MOBILE/master/intyper-mobile.user.js
// @updateURL     https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/intyper-mobile.user.js
// ==/UserScript==

/** ================
*   FRONT JQUERY
* ==================
*/

// Executando o jQuery no modo noConflict para não dar conflito com o script do gartic
this.$ = this.jQuery = jQuery.noConflict(true);

$(function($) {

    // fix bug novo layout do gartic
    $("#tela").css("height", "auto");

    var jQuery = window.jQuery;

    // Colocando o botão de notificação para Mostrar ou Esconder o hack
    $('.opcoes').click(function() { // class do GARTIC
        if ($(this).attr('class') == 'opcoes gartips_hide') {
            console.clear(); // Limpa o console
            $(this).addClass('gartips_show').removeClass('gartips_hide');
        } else {
            showBox();
            $(this).addClass('gartips_hide');
        }
    });

    // Adiciona botões e campos ao console
    console.log('Adicionando opções ao console...');
    console.log('Selecionar lista:');
    $.each(salas, function(i, sala) {
        console.log(`- ${sala.nome.toUpperCase()} (${sala.arr.length})`);
    });

    // Adiciona campo de pesquisa e botões
    console.log('Campo de pesquisa e botões adicionados ao console.');

    $('#tela').append('<div id="console" style="height:auto;"></div>');
    $('#console').append('<div id="console_botoes" style="clear: both; padding-top:10px; text-align:right;"></div>');

    // Select com opções de listas
    $('#console_botoes').append('<select id="console_select" style="height:39px; width:295px; text-align:center; float:left;"></select>');
    $.each(salas, function(i, sala) {
        $('#console_select').append(`<option value="${sala.nome.toLowerCase()}">${sala.nome.toUpperCase()} (${sala.arr.length})</option>`);
    });

    // Botões
    $('#console_botoes').append('<input type="text" id="console_search" placeholder="palavra chave" style="text-align:center; margin-left:5px; width:350px; height:30px; float:left" />');
    $('#console_botoes').append('<button id="console_get_respostas" style="margin-left:5px; width:290px; height:39px; text-align:center; float:left;">Possíveis Respostas</button>');
    $('#console_get_respostas').click(function() { getRespostas() });
    $('#console_botoes').append('<button id="console_limpa_respostas" style="margin-left:5px; width: 172px; height:39px; float:left;">Limpar Respostas</button>');
    $('#console_limpa_respostas').click(function() { limparRespostas() });

    // Adiciona a div de respostas ao console
    $('#console_botoes').append('<div id="console_field_respostas" style="clear:both; color:#000; font-size:18px;padding:10px; text-align:left; "></div>');
});

function getRespostas() {
    console.log('Obtendo respostas...');
    // Implementar a lógica de obtenção das respostas e logar no console
}

function limparRespostas() {
    console.log('Limpando respostas...');
    // Implementar a lógica para limpar as respostas e logar no console
}

