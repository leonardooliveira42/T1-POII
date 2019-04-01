
    var funcao; 
    var parser = math.parser(); 
    var refinaUni = [];

    // Ultima função e ponto minimo computados 
    var ultimafuncao = null; 
    var pontoMinimo = null;
    var ultimoIntervalo = null;

    /** Busca Uniforme  */
    $('#uniforme').submit(async function(e) {
        e.preventDefault();

        SwitchDiv(1);

        var flida = document.getElementById('funcao1').value; 
        var minimo = document.getElementById('inicio1').value; 
        var maximo = document.getElementById('final1').value; 
        var delta = document.getElementById('delta1').value;
        refinaUni = [];

        // Verificar se haverá erros na execução do código 
        try{
            flida = flida.replace('F','f');
            // Armazenando a função digitada no parser 
            var funcao = parser.eval(flida); 

            // Tratando as strings dos numeros, trocando virgula por ponto
            minimo = minimo.replace(',','.'); 
            minimo = parseFloat(minimo); 

            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo);

            delta = delta.replace(',','.'); 
            delta = parseFloat(delta);

            // Inverte valor de maximo e minimo se max for menor que minimo
            var obj = {min: minimo, max: maximo};
            TrocaIntervalo(obj);       
            minimo = obj.min; maximo = obj.max;

            // Se os dados não forem válidos, não executa o algoritmo
            if(isNaN(minimo) || isNaN(maximo) || isNaN(delta)){
                throw  'não é um numero';
            }

            if(delta < 0 || delta > 1){
                throw 'delta inválido';
            }

            var refina = document.getElementById('qtdRefina').value;

            // Desligando o alerta 
            document.getElementById('alertFormUniforme').style.display = 'none';

            // Iniciando o método 
            var result = await BuscaUniforme(refina, minimo, maximo, delta)
            .then(resultado => {
                MostraResultadoUniforme(resultado, flida, minimo, maximo, delta, parseInt(refina));
                ultimafuncao = flida;
                pontoMinimo = resultado.resultado;
                ultimoIntervalo = {a: minimo, b: maximo};
            });     
        }catch (e) {
            console.log(e);
            document.getElementById('alertFormUniforme').style.display = 'block';
        }   
    });

    function BuscaUniforme(refina, minimo, maximo, delta) {
        return new Promise(function(resolve, reject) {
            // Vetor de iterações 
            var iteratorArray = [];
            var resultado = CalculoBuscaUniforme(0, minimo, maximo, delta, refina, iteratorArray);
            var object = {
                iteracoes: iteratorArray, 
                resultado: resultado
            };
            resolve(object);
        });
    }

    /** Busca Dicotomica  */

    $('#dicotomica').submit(async function(e) {
        e.preventDefault();

        SwitchDiv(2);
        
        var flida = document.getElementById('funcao2').value; 
        var minimo = document.getElementById('inicio2').value; 
        var maximo = document.getElementById('final2').value; 
        var delta = document.getElementById('delta2').value; 
        var precisao = document.getElementById('precisao2').value; 

        try{
            flida = flida.replace('F','f');
            var funcao = parser.eval(flida);

            minimo = minimo.replace(',','.'); 
            minimo = parseFloat(minimo); 
            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo); 
            delta = delta.replace(',','.'); 
            delta = parseFloat(delta); 
            precisao = precisao.replace(',','.');
            precisao = parseFloat(precisao);    

           // Inverte valor de maximo e minimo se max for menor que minimo
           var obj = {min: minimo, max: maximo};
           TrocaIntervalo(obj);       
           minimo = obj.min; maximo = obj.max;

           // Se os dados não forem válidos, não executa o algoritmo
            if(isNaN(minimo) || isNaN(maximo) || isNaN(delta)){
                throw  'não é um numero';
            }

            if((delta < 0 || delta > 1) || (precisao < 0 || precisao > 1)){
                throw 'delta ou precisao inválido';
            }
            // Desligando o alerta 
            document.getElementById('alertFormDico').style.display = 'none';

            await BuscaDicotomica(minimo, maximo, delta, precisao)
            .then((res) => {
                console.log(res);
                MostraResultadoDicotomica(res ,flida, minimo, maximo, delta, precisao);
                ultimafuncao = flida;
                pontoMinimo = res.resultado;
                ultimoIntervalo = {a: minimo, b: maximo};
            });

        } catch (e){
            console.log(e);
            document.getElementById('alertFormDico').style.display = 'block';
        }       
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

    /** Seção Aurea */
    
    $('#formAurea').submit(async function(e) {
        e.preventDefault();

        SwitchDiv(3);
        
        var flida = document.getElementById('funcao3').value; 
        var minimo = document.getElementById('inicio3').value; 
        var maximo = document.getElementById('final3').value; 
        var precisao = document.getElementById('precisao3').value; 

       try{
            flida = flida.replace('F','f');
            var funcao = parser.eval(flida);

            minimo = minimo.replace(',','.'); 
            minimo = parseFloat(minimo); 
            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo); 
            precisao = precisao.replace(',','.');
            precisao = parseFloat(precisao); 

            // Inverte valor de maximo e minimo se max for menor que minimo
            var obj = {min: minimo, max: maximo};
            TrocaIntervalo(obj);       
            minimo = obj.min; maximo = obj.max;

            // Se os dados não forem válidos, não executa o algoritmo
            if(isNaN(minimo) || isNaN(maximo) || isNaN(precisao)){
                throw  'não é um numero';
            }

            if(precisao < 0 || precisao > 1){
                throw 'precisao inválido';
            }

            // Desligando o alerta 
            document.getElementById('alertFormAurea').style.display = 'none';

            await SecaoAurea(minimo, maximo, precisao)
            .then((res) => {
                console.log(res);
                MostraResultadoAurea(res, flida, minimo, maximo, precisao);
                ultimafuncao = flida;
                pontoMinimo = res.resultado;
                ultimoIntervalo = {a: minimo, b: maximo};
            });
        } catch (e) {
            console.log(e);
            document.getElementById('alertFormAurea').style.display = 'block';

        }

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

    /** Busca de Fibonacci */
    $('#formFibonacci').submit(async function(e) {
        e.preventDefault();
        
        SwitchDiv(4);

        var flida = document.getElementById('funcao4').value; 
        var minimo = document.getElementById('inicio4').value; 
        var maximo = document.getElementById('final4').value; 
        var precisao = document.getElementById('precisao4').value; 

        try {
            minimo = minimo.replace(',','.');
            minimo = parseFloat(minimo); 
            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo); 
            precisao = precisao.replace(',','.'); 
            precisao = parseFloat(precisao);

            flida = flida.replace('F','f');
            var funcao = parser.eval(flida);

            var obj = {min: minimo, max: maximo};
            TrocaIntervalo(obj);       
            minimo = obj.min; maximo = obj.max;

            // Se os dados não forem válidos, não executa o algoritmo
            if(isNaN(minimo) || isNaN(maximo) || isNaN(precisao)){
                throw  'não é um numero';
            }

            if(precisao < 0 || precisao > 1){
                throw 'precisao inválido';
            }

            document.getElementById('alertFormFibo').style.display = 'none';


            await BuscaFibonacci(minimo, maximo, precisao).then((res) => {
                console.log(res);
                MostraResultadoFibonacci(res, flida, minimo, maximo, precisao);
                ultimafuncao = flida;
                pontoMinimo = res.resultado;
                ultimoIntervalo = {a: minimo, b: maximo};
                
            });
        } catch (e) {
            console.log(e);
            document.getElementById('alertFormFibo').style.display = 'block';
        }

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
    $('#formBissecao').submit(async function(e) {
        e.preventDefault(); 

        SwitchDiv(5);
        
        var flida = document.getElementById('funcao5').value; 
        var minimo = document.getElementById('inicio5').value; 
        var maximo = document.getElementById('final5').value; 
        var precisao = document.getElementById('precisao5').value; 

        try {
            minimo = minimo.replace(',','.'); 
            minimo = parseFloat(minimo); 
            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo); 
            precisao = precisao.replace(',','.'); 
            precisao = parseFloat(precisao);

            // Inverte valor de maximo e minimo se max for menor que minimo
            var obj = {min: minimo, max: maximo};
            TrocaIntervalo(obj);       
            minimo = obj.min; maximo = obj.max;

            // Se os dados não forem válidos, não executa o algoritmo
            if(isNaN(minimo) || isNaN(maximo) || isNaN(precisao)){
                throw  'não é um numero';
            }

            if(precisao < 0 || precisao > 1){
                throw 'precisao inválido';
            }
            
            flida = flida.replace('F','f');
            var funcao = parser.eval(flida);
            var derivada = math.derivative(flida, 'x'); 

            // Desligando o alerta 
            document.getElementById('alertFormBisse').style.display = 'none';

            await  Bissecao(derivada, minimo, maximo, precisao).then(function(res) {
                // Mostra resultados
                MostraResultadoBissecao(res,flida, derivada, minimo, maximo, precisao);
                ultimafuncao = flida;
                pontoMinimo = res.resultado;
                ultimoIntervalo = {a: minimo, b: maximo};
            });
        }catch (e){
            console.log(e);
            document.getElementById('alertFormBisse').style.display = 'block';
        }
    });

    function Bissecao(derivada, minimo, maximo, precisao) {
        return new Promise(function(resolve, reject) {
            var iteratorArray = []; 
            var max = Math.log(precisao/(maximo-minimo)) / Math.log(0.5); 
            max = Math.ceil(max);
            console.log(max);
            var resultado = CalculoBissecao(0, max, minimo, maximo, derivada, precisao, iteratorArray);
            var object = {
                iteracoes: iteratorArray, 
                resultado: resultado
            };
            resolve(object);
        });
    }

    /*** Método do Newton */

    $('#formNewton').submit(async function(e) {
        e.preventDefault();

        SwitchDiv(6);

        var flida = document.getElementById('funcao6').value; 
        var minimo = document.getElementById('inicio6').value; 
        var maximo = document.getElementById('final6').value; 
        var precisao = document.getElementById('precisao6').value; 

        try {
            minimo = minimo.replace(',','.');
            minimo = parseFloat(minimo); 
            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo); 
            precisao = precisao.replace(',','.');
            precisao = parseFloat(precisao);

            // Inverte valor de maximo e minimo se max for menor que minimo
            var obj = {min: minimo, max: maximo};
            TrocaIntervalo(obj);       
            minimo = obj.min; maximo = obj.max;

            // Se os dados não forem válidos, não executa o algoritmo
            if(isNaN(minimo) || isNaN(maximo) || isNaN(precisao)){
                throw  'não é um numero';
            }

            if(precisao < 0 || precisao > 1){
                throw 'precisao inválido';
            }
            
            flida = flida.replace('F','f');
            var funcao = parser.eval(flida);
            var derivada = math.derivative(flida, 'x');
            var derivadaSegunda = math.derivative(derivada, 'x');

            // Desligando o alerta 
            document.getElementById('alertFormNewton').style.display = 'none';

            await Newton(derivada, derivadaSegunda, minimo, maximo, precisao).then(function(res) {
                console.log(res);

                // Mostra Resultados
                MostraResultadoNewton(res, flida, derivada, derivadaSegunda, minimo, maximo, precisao);
                ultimafuncao = flida;
                pontoMinimo = res.resultado;
                ultimoIntervalo = {a: minimo, b: maximo};
            });
        } catch (e) {
            console.log(e);
            document.getElementById('alertFormNewton').style.display = 'block';
        }
    });

    function Newton(derivada1, derivada2, minimo, maximo, precisao) {
        return new Promise(function(resolve, reject) {

            var iteratorArray = [];
            var resultado = CalculoNewton(0, minimo, maximo, derivada1, derivada2, precisao, iteratorArray);
            var object = {
                iteracoes: iteratorArray,
                resultado: resultado
            };
            resolve(object);
        });
    }

    /** Funções de uso geral  */
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
            case 5: 
                stringID = "divBissecao";
                break; 
            case 6: 
                stringID = "divNewton";
        }

        // Sumindo com todas as divs
        document.getElementById("tutorial").style.display = "none";
        document.getElementById("divUniforme").style.display = "none";
        document.getElementById("divDico").style.display = "none";
        document.getElementById("divAurea").style.display = "none";
        document.getElementById("divFibonacci").style.display = "none";
        document.getElementById("divBissecao").style.display = "none";
        document.getElementById("divNewton").style.display = "none";

        document.getElementById(stringID).style.display = "block";
    }
    
    function TrocaIntervalo(obj) {
        if(obj.max < obj. min){
            var aux = obj.max; 
            obj.max = obj.min; 
            obj.min = aux;
        }
    }

    function Media(v1, v2) {
        var media = (v1 + v2)/2;
        return media;         
    }

    function IntervaloMaiorQPrecisao(a, b, e) {
        // console.log((b-a) > e);
        return ((b-a) > e);
    }

    // Preenchendo os campos com os exemplos da sala de aula 
    document.getElementById('exampleButton').addEventListener('click', function(e) {
        console.log('opa');
        // Busca Uniforme 
        document.getElementById('funcao1').value = 'f(x) = x^2 -3x +2';
        document.getElementById('inicio1').value = '-1';
        document.getElementById('final1').value = '3';
        document.getElementById('delta1').value = '0.5';

        // Busca Dicotômica 
        document.getElementById('funcao2').value = 'f(x) = x^2 -3x +2';
        document.getElementById('inicio2').value = '-1';
        document.getElementById('final2').value = '3';
        document.getElementById('delta2').value = '0.01';
        document.getElementById('precisao2').value = '0.1';

        // Seção Aurea 
        document.getElementById('funcao3').value = 'f(x) = x^2 -3x +2';
        document.getElementById('inicio3').value = '-1';
        document.getElementById('final3').value = '3';
        document.getElementById('precisao3').value = '0.1';

        // Seção Fibonacci 
        document.getElementById('funcao4').value = 'f(x) = x^2 -3x +2';
        document.getElementById('inicio4').value = '-1';
        document.getElementById('final4').value = '3';
        document.getElementById('precisao4').value = '0.1';

        // Método da bisseção 
        document.getElementById('funcao5').value = 'f(x) = x^2 +2x';
        document.getElementById('inicio5').value = '-3';
        document.getElementById('final5').value = '6';
        document.getElementById('precisao5').value = '0.2';

        // Método de Newton
        document.getElementById('funcao6').value = 'f(x) = e^x - x^3 + 1';
        document.getElementById('inicio6').value = '-1';
        document.getElementById('final6').value = '6';
        document.getElementById('precisao6').value = '0.0001';



    });

    document.getElementById('chartButton').addEventListener('click', function(e) {
        console.log(ultimafuncao, pontoMinimo, ultimoIntervalo);
        $('#avisoGrafico').empty();

        if(ultimafuncao == null){
            $('#avisoGrafico').append('<div class="alert alert-warning"> Nenhuma função foi computada ainda </div>');
        } else{
            var fun = ultimafuncao.split('=');
            $('#avisoGrafico').append('<div class="alert alert-info"> As linhas verticais indicam o intervalo especificado. </div>');
            // Gerando um array com valores de x y 
            Draw(fun[1], ultimoIntervalo.a, ultimoIntervalo.b);
            
        }

    });

    function Draw(funcao, min, max) {
        try{

            const expr = math.compile(funcao); 

            const xValues = math.range((-10+min), (10+max), 0.1).toArray(); 
            const yValues = xValues.map(function(x) {
                return expr.eval({x: x});
            });

            const trace0 = {
                x: [pontoMinimo], 
                y: [expr.eval({x: pontoMinimo})], 
                mode: 'markers',
                marker: {
                    color: 'rgb(219, 64, 82)',
                    size: 12
                }, 
                name: "Ponto minimo"
            }

            const trace1 = {
                x: xValues, 
                y: yValues, 
                mode: 'lines', 
                name: ultimafuncao
            }

            const data = [trace1, trace0];
            var layout = {
                shapes: [
                    {
                        label: 'limite',
                        type: 'line',
                        y0: 0, 
                        y1: 1, 
                        yref: "paper",
                        x0: min, 
                        x1: min
                    }, 
                    {
                        type: 'line',
                        y0: 0, 
                        y1: 1, 
                        yref: "paper",
                        x0: max, 
                        x1: max
                    }, 
                 ]
            }
            Plotly.newPlot('plot',data, layout)
        }catch(e){
            console.log(e);
        }
    }
   

    // Popover functions

    $("[data-toggle=popover]").popover();

    $('.popover-dismiss').popover({
        trigger: 'focus'
    });