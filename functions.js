/**
 *   Faz a filtragem da dica, busca por possíveis palavras e mostra o box
 *
 *   @return void
 */
function getRespostas() {

    // Não precisamos mais do `#gartips_select`, vamos usar a lista de `alimentos` diretamente
    var lista = alimentos;

    var palavraChave = $('#gartips_search').val();

    // Limpar resultados anteriores
    limparRespostas();

    // Se for uma busca por palavra chave
    if (palavraChave !== '') {
        var dica = palavraChave;
        getSearch(lista, dica);
        exit();
    } else {
        // Fix caixa de dica
        $('.traco').each(function(i, obj) {
            console.log($(this));

            if (obj.innerHTML == "&nbsp;") {
                obj.textContent = '_';
            }
        });
        // Pegando os dados da tela do gartic
        dica = $('.contentSpan').text();
    }

    // Pegando as letras disponíveis
    var posicoes = [];
    for (var i = 0; i < dica.length; i++) {
        if (dica[i] != '_') posicoes[i] = dica[i];
    }
    
    var resultado;
    // Filtrando resposta
    for (i = 0; i < lista.length; i++) {
        // Retirando espaços do nome na lista
        nome = lista[i];

        // Verificando a quantidade de letras
        if (nome.length == dica.length) {
            // Verifica se tem letras disponíveis
            if (posicoes.length === 0) {
                // ====== Verifica apenas a dica sem letras ======
                if (!nome.match(/ /gi)) {
                    console.log(`Resposta possível: ${lista[i]}`);
                }
            } else {
                // Percorrendo as posições
                for (var i2 = 0; i2 < posicoes.length; i2++) {
                    // ====== Verifica a dica com letras =====
                    if (typeof posicoes[i2] != 'undefined') {
                        // Se for 'espaço' recebe false
                        if (/\s/.test(posicoes[i2])) {
                            posicao = false;
                        } else {
                            posicao = posicoes[i2].toLowerCase();
                        }
                        // Se for 'espaço' recebe false
                        if (/\s/.test(lista[i][i2])) {
                            letra = false;
                        } else {
                            letra = lista[i][i2].toLowerCase();
                        }

                        // Verifica se a posição e letra é igual
                        if (letra === posicao) {
                            resultado = lista[i];
                        } else {
                            resultado = false;
                            break;
                        }
                    }
                }
                // Exibe a resposta no console
                if (resultado) {
                    console.log(`Resposta possível: ${resultado}`);
                }
            } // Fim else
        } // Fim if
    } // Fim for
} // Fim function getRespostas
