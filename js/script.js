
    var funcao; 
    var parser = math.parser(); 
    var refinaUni = [];

    // Inicia o método da busca uniforme 
    $('#uniforme').submit(async function(e) {
        e.preventDefault();
        var flida = document.getElementById('funcao1').value; 
        var minimo = document.getElementById('inicio1').value; 
        var maximo = document.getElementById('final1').value; 
        var delta = document.getElementById('delta1').value;

        // Armazenando a função digitada no parser 
        var funcao = parser.eval(flida); 

        // Tratando as strings dos numeros 
        minimo = minimo.replace(',','.'); 
        minimo = parseFloat(minimo); 

        maximo = maximo.replace(',','.'); 
        maximo = parseFloat(maximo);

        delta = delta.replace(',','.'); 
        delta = parseFloat(delta);

        // Iniciando o método 
        var result = await BuscaUniforme(minimo, maximo, delta)
        .then(resultado => {
            console.log("finalmente: ",resultado);
            MostraResultadoUniforme(resultado, flida, minimo, maximo, delta);
            console.log(refinaUni);
        });       
        

        
        // Mostra o resultado na tela 
    });

    // Promessa da busca uniforme
    function BuscaUniforme(minimo, maximo, delta) {
        return new Promise(function(resolve, reject) {
            // Vetor de iterações 
            var iteratorArray = [];
            var resultado = CalculoBuscaUniforme(0, minimo, maximo, delta, 1, iteratorArray);
            var object = {
                iteracoes: iteratorArray, 
                resultado: resultado
            };
            resolve(object);
        });
    }

    // Calculo da busca uniforme
    function CalculoBuscaUniforme(iteracao, a, b, del, refina, array) {

        var fX = parser.eval('f(' + a + ')');
        var xk = a + del; 
        var fXk = parser.eval('f(' + xk + ')');

        if(xk <= b){
            // Continua o código
            if(fXk < fX) {                
                // Continua o processo 
                // Salva a iteração no array 
                array.push({
                    x: a, 
                    fx: fX,
                    xk: xk,
                    fxk: fXk
                });
                return CalculoBuscaUniforme(iteracao+1, xk, b, del, refina, array);
            } else {
                if(refina == 0){
                    // Retorna o resultado e para 
                    array.push({
                        x: a, 
                        fx: fX,
                        xk: xk,
                        fxk: fXk
                    });
                    return a;
                } else {
                    refinaUni[iteracao] = true;
                    return CalculoBuscaUniforme(iteracao+1,a-del, b, del/10, --refina, array);
                }
            }
        } else {
            return a;
        }
    }

    /** Funções para manipular a página */
    function SwitchDiv(div){
        var stringID; 
        switch(div){
            case 0: 
                stringID = "tutorial"; 
                break;
            case 1: 
                stringID = "divUniforme";
                break; 
            case 2: 
                stringID = "divDico";
                break; 
            case 3: 
                stringID = "divAurea";
                break; 
            case 4:     
                stringID = "divFibonacci";
                break; 
        }

        // Sumindo com todas as divs
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("divUniforme").style.display = "none";
        document.getElementById("divDico").style.display = "none";
        document.getElementById("divAurea").style.display = "none";
        document.getElementById("divFibonacci").style.display = "none";

        document.getElementById(stringID).style.display = "block";
    }

    /********* Funções para mostrar resultados **********/

    function MostraResultadoUniforme(resultado, funcao, minimo, maximo, delta) {

        //Mostrando os dados nos cards 
        $('#funcaoObjetivoUni').empty(); 
        $('#funcaoObjetivoUni').append('<strong>' + funcao + '</strong>');
        $('#restricaoUni').empty(); 
        $('#restricaoUni').append('s.a: ' + minimo + '<= x <= ' + maximo);
        $('#deltaUni').empty(); 
        $('#deltaUni').append('&Delta; = ' + delta); 

        // Adicionando uma imagem e botão no card do gráfico 
        $('#graficoUni').empty(); 
        $('#graficoUni').append("<img src='./imgs/Grafico.jpg' class='img-fluid mx-auto imagemGrafico'>");
        $('#buttonGraficoUni').empty(); 
        $('#buttonGraficoUni').append("<button class='btn btn-info btn-block' data-toggle='modal' data-target='.bd-example-modal-xl'> Ver Gráfico </button>")

        //Tabela de resultados 
        $('#uniformeTbody').empty();

        resultado.iteracoes.forEach(function(item, index) {
            $('#uniformeTbody').append("<tr class='table-warning'>");
            $('#uniformeTbody').append('<td> ' + index + ' </td>');
            $('#uniformeTbody').append('<td> ' + item.x.toFixed(4) + ' </td>');
            $('#uniformeTbody').append('<td> ' + item.fx.toFixed(4) + ' </td>');
            $('#uniformeTbody').append('<td> ' + item.xk.toFixed(4) + ' </td>');
            $('#uniformeTbody').append('<td> ' + item.fxk.toFixed(4) + ' </td>');     
            $('#uniformeTbody').append('<td> ' + ((item.fx < item.fxk) ? 'Verdade' : 'Falso') + ' </td>');
            $('#uniformeTbody').append('</tr>');
        });     

        // Resultado final 
        $('#uniResultado').empty(); 
        $('#uniResultado').append('x<sup>*</sup> = ' + resultado.resultado);
        $('#uniIteracoes').empty(); 
        $('#uniIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(3));         

    }   