// ==UserScript==
// @grant         none
// @name          INTYPER-MOBILE
// @namespace     INTYPER-MOBILE
// @version       1.0.2
// @description   MOSTRA POSSÍVEIS RESPOSTAS DE DICAS NO GARTIC
// @author        THEO
// @match         https://gartic.com.br/*
// @run-at        document-end
// @require       http://code.jquery.com/jquery-3.3.1.min.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/alimentos.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/salas/alimentos2.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/config.js
// @require       https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/functions.js
// @downloadURL   https://raw.githubusercontent.com/iscandalouz/INTYPER-MOBILE/master/intyper-mobile.user.js
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

    // Colocando o botão de notificação para Mostrar ou Esconder o hack
    $('body').append('<button class="btnPequeno" id="infoSala">Info Sala</button>');

    // Estilizando o botão de informações da sala
    $('#infoSala').css({
        position: 'absolute',
        top: '300px',
        right: '240px',
        zIndex: 1000,
        backgroundColor: '#00FF00', // verde
        color: 'white', // Texto branco
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px'
    });

    $('#infoSala').click(function() {
        if ($('#console').is(':visible')) {
            $('#console').hide();
        } else {
            showBox();
            $('#console').show();
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

    // Botões com novas dimensões e posições
    $('#console_botoes').append('<input type="text" id="console_search" placeholder="palavra chave" style="text-align:center; margin-left:5px; width:350px; height:30px; float:left" />');
    $('#console_botoes').append('<button id="console_get_respostas" style="position:absolute; top:300px; right:240px; background-color:#00FF00; color:white; border:none; padding:10px 20px; font-size:16px; cursor:pointer; border-radius:5px;">Possíveis Respostas</button>');
    $('#console_get_respostas').click(function() { getRespostas() });
    $('#console_botoes').append('<button id="console_limpa_respostas" style="position:absolute; top:350px; right:240px; background-color:#00FF00; color:white; border:none; padding:10px 20px; font-size:16px; cursor:pointer; border-radius:5px;">Limpar Respostas</button>');
    $('#console_limpa_respostas').click(function() { limparRespostas() });

    // Adiciona a div de respostas ao console
    $('#console_botoes').append('<div id="console_field_respostas" style="clear:both; color:#000; font-size:18px;padding:10px; text-align:left; "></div>');
});

function getRespostas() {
    console.log('Obtendo respostas...');
    var tipo = $('#console_select').val(); // Seletor de lista
    var lista;
    switch (tipo) {
        case 'desenho_animado':
            lista = desenho_animado;
            break;
        case 'animais':
            lista = animais;
            break;
        case 'alimentos':
            lista = alimentos;
            break;
        case 'alimentos2':
            lista = alimentos2;
            break;
        case 'objetos':
            lista = objetos;
            break;
        case 'verbos':
            lista = verbos;
            break;
        case 'got':
            lista = got;
            break;
        case 'bandeiras':
            lista = bandeiras;
            break;
        default:
            console.error('Tipo de lista não encontrado.');
            return;
    }

    var palavraChave = $('#console_search').val(); // Campo de pesquisa

    // Se for uma busca por palavra chave
    if (palavraChave !== '') {
        console.log(`Buscando palavras com "${palavraChave}":`);
        $.each(lista, function(i, palavra) {
            if (palavra.toLowerCase().includes(palavraChave.toLowerCase())) {
                console.log(`- ${palavra}`);
            }
        });
    } else {
        console.log('Nenhuma palavra chave fornecida.');
    }
}

function limparRespostas() {
    console.log('Limpando respostas...');
    // Limpar resultados no console
    console.clear();
}
