/** ===============================
 *  Arquivo de funções do script
 * ================================
 */


/**
 *   Setar resposta no console
 *
 *   @param string str Palavra resposta
 *   @return void
 */
function setResposta(str) {
    console.log(`Resposta selecionada: ${str}`);
}


/**
 *   Faz a requisição de buscar palavras pela caixa de busca
 *
 *   @param array arr Array com as palavras da sala
 *   @param string str Palavra a ser pesquisada
 *   @return void
 */
function getSearch(arr, str) {
    str = str.toLowerCase();
    console.log(`Buscando palavras que contêm "${str}":`);
    for (var i = 0; i < arr.length; i++) {
        var nome = arr[i].toLowerCase();
        if (nome.indexOf(str) !== -1) {
            console.log(`[${nome}]`);
            // Adiciona um click listener para logs no console
            console.log(`Clique para selecionar a resposta: ${nome}`);
        }
    }
}


/**
 *   Mostra o box do script (no caso, apenas um log de que a caixa foi mostrada)
 *
 *   @return void
 */
function showBox() {
    console.log('Box do script mostrado.');
}


/**
 *   Limpa o box de respostas
 *
 *   @return void
 */
function limparRespostas() {
    console.log('Respostas limpas.');
    // Não há campo de pesquisa no console
}


/**
 *   Faz a filtragem da dica, busca por possíveis palavras e mostra o box
 *
 *   @return void
 */
function getRespostas() {
    console.log('Obtendo respostas...');
    
    // Pegando tipo de lista
    var tipo = $('#console_select').val(); // Substituí #gartips_select por #console_select
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
        case 'bandeiras':
            lista = alimentos2;
            break;
    }

    var palavraChave = $('#console_search').val(); // Substituí #gartips_search por #console_search

    // limparRespostas resultados anteriores
    limparRespostas();

    // se for uma busca por palavra chave
    if (palavraChave !== '') {
        var dica = palavraChave;
        getSearch(lista, dica);
        return;
    } else {
        // Fix caixa de dica
        $('.traco').each(function(i, obj) {
            if (obj.innerHTML == "&nbsp;") {
                obj.textContent = '_';
            }
        });
        // pegando os dados da tela do gartic
        var dica = $('.contentSpan').text();
    }

    // Pegando as letras disponíveis
    var posicoes = [];
    for (var i = 0; i < dica.length; i++) {
        if (dica[i] != '_') posicoes[i] = dica[i];
    }
    var resultado;
    // filtrando resposta
    for (i = 0; i < lista.length; i++) {
        // retirando espaços do nome na lista
        var nome = lista[i];

        // Verificando a quantidade de letras
        if (nome.length == dica.length) {
            // Verifica se tem letras disponíveis
            if (posicoes.length === 0) {
                // ====== Verifica apenas a dica sem letras ======
                if (!nome.match(/ /gi)) {
                    console.log(`[${nome}]`);
                    console.log(`Clique para selecionar a resposta: ${nome}`);
                }
            } else {
                // percorrendo as posições
                for (var i2 = 0; i2 < posicoes.length; i2++) {
                    // ====== Verifica a dica com letras =====

                    if (typeof posicoes[i2] != 'undefined') {
                        // se for 'espaço'recebe false
                        var posicao = /\s/.test(posicoes[i2]) ? false : posicoes[i2].toLowerCase();
                        var letra = /\s/.test(lista[i][i2]) ? false : lista[i][i2].toLowerCase();

                        // Verifica se a posição e letra é igual
                        if (letra === posicao) {
                            resultado = lista[i];
                        } else {
                            resultado = false;
                            break;
                        }
                    }
                }
                // Imprime no console a resposta
                if (resultado) {
                    console.log(`[${resultado}]`);
                    console.log(`Clique para selecionar a resposta: ${resultado}`);
                }
            }
        }
    }
}
