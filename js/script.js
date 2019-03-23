
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

    /** Busca Dicotomica  */

    $('#dicotomica').submit(async function(e) {
        e.preventDefault();
        
        var flida = document.getElementById('funcao2').value; 
        var minimo = document.getElementById('inicio2').value; 
        var maximo = document.getElementById('final2').value; 
        var delta = document.getElementById('delta2').value; 
        var precisao = document.getElementById('precisao2').value; 

        var funcao = parser.eval(flida);

        minimo = parseFloat(minimo); 
        maximo = parseFloat(maximo); 
        delta = parseFloat(delta); 
        precisao = parseFloat(precisao); 

        await BuscaDicotomica(minimo, maximo, delta, precisao)
        .then((res) => {
            console.log(res);
        });
    });

    function BuscaDicotomica(minimo, maximo, delta, precisao) {
        return new Promise(function(resolve, reject) {
            var iteratorArray = []; 
            var resultado = CalculoBuscaDicotomica(0,minimo, maximo, delta, precisao, iteratorArray); 
            var object = {
                iteracoes: iteratorArray, 
                resultado: resultado
            };
            resolve(object);
        });
    }

    function CalculoBuscaDicotomica(k, a, b, delta, precisao, iteracao) {
        // Primeiro criterio de convergencia 
        if(IntervaloMaiorQPrecisao(a,b,precisao)){
            //Se for verdade continua o processo 
            var meio = Media(a,b); 
            var x = meio - delta; 
            var z = meio + delta; 

            var fx = parser.eval('f(' + x + ')');
            var fz = parser.eval('f(' + z + ')');

            iteracao.push({
                a: a, 
                b: b, 
                x: x, 
                z: z, 
                fx: fx, 
                fz: fz
            });

            if(fx > fz) {
                // Se for verdade o a recebe x
                return CalculoBuscaDicotomica(k++,x,b,delta,precisao,iteracao);
            } else {
                // Se for falso o b recebe z
                return CalculoBuscaDicotomica(k++,a,z,delta,precisao,iteracao);
            }
        } else{
            return Media(a,b);
        }
    }

    /** Seção Aurea */
    
    $('#formAurea').submit(async function(e) {
        e.preventDefault();
        
        var flida = document.getElementById('funcao3').value; 
        var minimo = document.getElementById('inicio3').value; 
        var maximo = document.getElementById('final3').value; 
        var precisao = document.getElementById('precisao3').value; 

        var funcao = parser.eval(flida);

        minimo = parseFloat(minimo); 
        maximo = parseFloat(maximo); 
        precisao = parseFloat(precisao); 

        await SecaoAurea(minimo, maximo, precisao)
        .then((res) => {
            console.log(res);
        })

        console.log(flida, minimo, maximo, precisao);

    })

    function SecaoAurea(minimo, maximo, precisao) {
        return new Promise (function(resolve, reject) {
            var iteratorArray = []; 
            var alfa = math.eval('(-1 + (5)^(1/2))/2');
            //console.log(alfa);
            var resultado = CalculoSecaoAurea(0, minimo, maximo, precisao, alfa, iteratorArray);
            var object = {
                iteracoes: iteratorArray, 
                resultado: resultado
            };
            resolve(object);
        });
    }

    function CalculoSecaoAurea(k, a, b, e, alfa, iteracao){

        if(IntervaloMaiorQPrecisao(a,b,e)){
            //Se for verdade continua o processo  
            var u = a + (1 - alfa) * (b - a);
            var l = a + alfa * (b - a); 

            var fu = parser.eval('f(' + u + ')');
            var fl = parser.eval('f(' + l + ')');

            iteracao.push({
                a: a, 
                b: b, 
                u: u, 
                l: l, 
                fu: fu, 
                fl: fl
            });

            if(fu > fl) {
                // Se for verdade o a recebe x
                return CalculoSecaoAurea(k++, u, b, e, alfa, iteracao);
            } else {
                // Se for falso o b recebe z
                return CalculoSecaoAurea(k++, a, l, e, alfa, iteracao);
            }
        } else{
            return Media(a,b);
        }
    }

    /** Busca de Fibonacci */
    $('#formFibonacci').submit(async function(e) {
        e.preventDefault();

        var flida = document.getElementById('funcao4').value; 
        var minimo = document.getElementById('inicio4').value; 
        var maximo = document.getElementById('final4').value; 
        var precisao = document.getElementById('precisao4').value; 

        minimo = parseFloat(minimo); 
        maximo = parseFloat(maximo); 
        precisao = parseFloat(precisao);

        var funcao = parser.eval(flida);

        await BuscaFibonacci(minimo, maximo, precisao).then((res) => {
            console.log(res);
        });

        //console.log(flida, minimo, maximo, precisao);
    });
    
    function BuscaFibonacci(minimo, maximo, precisao){
        return new Promise(function(resolve, reject) {
            var a = minimo; 
            var b = maximo;
            var fn = (b-a)/precisao; 
            var sequenciaFibo = []; 
            var iteratorArray = []; 

            // Gerando a sequencia de fibonacci
            for(i=1; ; i++){
                var item = Fibonacci(i); 
                sequenciaFibo.push(item); 
                if(item > fn) {
                    break; 
                }                    
            }
            var iteracaoMax = sequenciaFibo.length - 2; 
            var resultado = CalculoBuscaFibonacci(0,a,b,iteracaoMax, sequenciaFibo, precisao, iteratorArray);

            var object = {
                iteracoes: iteratorArray, 
                resultado: resultado
            };
            resolve(object);
        });
    }

    function CalculoBuscaFibonacci(k, a, b, max, sequenciaFibo, e, iteracao) {
        // Se atingiu o numero de iterações maximas
        if(k <= max) {

            var auxU = (sequenciaFibo.length-1)-k-2;
            var auxL = (sequenciaFibo.length-1)-k-1;
            var divisor = (sequenciaFibo.length-1)-k;
            var u = a + (sequenciaFibo[auxU] * (b - a)) / (sequenciaFibo[divisor]);
            var l = a + (sequenciaFibo[auxL] * (b - a)) / (sequenciaFibo[divisor]);

            var fu = parser.eval('f(' + u + ')'); 
            var fl = parser.eval('f(' + l + ')');

            var object = {
                a: a, 
                b: b,
                u: u, 
                l: l, 
                fu: fu, 
                fl: fl
            };
            iteracao.push(object);
            if(IntervaloMaiorQPrecisao(a,b,e)) {

                if(fu > fl){
                    return CalculoBuscaFibonacci(k++, u, b, max, sequenciaFibo, e, iteracao);
                } else {
                    return CalculoBuscaFibonacci(k++, a, l, max, sequenciaFibo, e, iteracao);
                }
            } else {
                return Media(a,b);
            }
        } else {
            return Media(a,b);
        }
    }

    function Fibonacci(a) {
        if(a == 1) {
            return 1;
        } else if(a == 2){
            return 1;
        } else {
            return Fibonacci(a-1) + Fibonacci(a-2);
        }
    }  

    /** Uso de derivada - bisseção */
    $('#formBissecao').submit(function(e) {
        e.preventDefault(); 
        
        var flida = document.getElementById('funcao5').value; 
        var minimo = document.getElementById('inicio5').value; 
        var maximo = document.getElementById('final5').value; 
        var precisao = document.getElementById('precisao5').value; 

        minimo = parseFloat(minimo); 
        maximo = parseFloat(maximo); 
        precisao = parseFloat(precisao);
        
        var funcao = parser.eval(flida);
        var derivada = math.derivative(flida, 'x'); 

        console.log('derivada: ', derivada.toString(), 'resultado ', resultado);

        console.log(flida, minimo, maximo, precisao);
    });

    /** Funções de uso geral  */
    function Media(v1, v2) {
        var media = (v1 + v2)/2;
        return media;         
    }

    function IntervaloMaiorQPrecisao(a, b, e) {
        console.log((b-a) > e);
        return ((b-a) > e);
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

    function MostraResultadoDicotomica() {

    }

    function MostraResultadoAurea() {
        
    }

    function MostraResultadoFibonacci() {
        
    }

    function MostraResultadoBissecao() {
        
    }