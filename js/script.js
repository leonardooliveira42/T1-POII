
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
        var flida = document.getElementById('funcao1').value; 
        var minimo = document.getElementById('inicio1').value; 
        var maximo = document.getElementById('final1').value; 
        var delta = document.getElementById('delta1').value;
        refinaUni = [];

        // Verificar se haverá erros na execução do código 
        try{
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

    /** Busca Dicotomica  */

    $('#dicotomica').submit(async function(e) {
        e.preventDefault();
        
        var flida = document.getElementById('funcao2').value; 
        var minimo = document.getElementById('inicio2').value; 
        var maximo = document.getElementById('final2').value; 
        var delta = document.getElementById('delta2').value; 
        var precisao = document.getElementById('precisao2').value; 

        try{
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
            iteracao.push({
                a: a, 
                b: b
            });
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

       try{
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
            iteracao.push({
                a: a, 
                b: b
            });
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

        try {
            minimo = minimo.replace(',','.');
            minimo = parseFloat(minimo); 
            maximo = maximo.replace(',','.'); 
            maximo = parseFloat(maximo); 
            precisao = precisao.replace(',','.'); 
            precisao = parseFloat(precisao);

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
    $('#formBissecao').submit(async function(e) {
        e.preventDefault(); 
        
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

    function CalculoBissecao(k, max, a, b, der, e, iteracao) {
        var x = Media(a,b); 
        var resDerivada = der.eval({x: x});
        if(k < max) {           
            // Salvando a iteração
            iteracao.push({
                a: a, 
                b: b, 
                x: x, 
                flx: resDerivada
            });
            if (resDerivada > 0) {
                return CalculoBissecao(++k, max, a, x, der, e, iteracao);
            } else if (resDerivada < 0) {
                return CalculoBissecao(++k, max, x, b, der, e, iteracao);
            } else return x;
        } else return x;
    }

    /*** Método do Newton */

    $('#formNewton').submit(async function(e) {
        e.preventDefault();

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

    function CalculoNewton(k, a, b, der1, der2, e, iteracao) {

        var x0 = a; 
        var d1x0 = der1.eval({x: x0});
        var d2x0 = der2.eval({x: x0});
        
        var x1 = x0 - (d1x0 / d2x0);
        var d1x1 = der1.eval({x: x1});

        iteracao.push({
            a: a, 
            b: b, 
            x0: x0, 
            x1: x1,
            d1x0: d1x0, 
            d2x0: d2x0, 
            d1x1: d1x1
        });

        // Primeiro critério de parada 
        if(Math.abs(d1x1) > e) {
            //continua
            // Segundo critério de parada 
            if(CriterioParadaNewton(x0,x1,e)){
                // Continua 
                return CalculoNewton(k++, x1, b, der1, der2, e, iteracao);
            }else return x1; 
        } else return x1;
    }

    function CriterioParadaNewton(x0, x1, e) {
       var c = (Math.abs(x1 - x0) / ((Math.abs(x1) < 1) ? 1 : Math.abs(x1)));
       return c > e;
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