/** ARQUIVOS DOS MÉTODOS  */

// Calculo da Busca uniforme 
function CalculoBuscaUniforme(iteracao, a, b, del, refina, array) {

    var fX = parser.eval('f(' + a + ')');   // Calcula o valor da função de x sendo x = a
    var xk = a + del;                       // Calcula o novo valor de xk, sendo esse novo valor a + delta
    var fXk = parser.eval('f(' + xk + ')'); // Calcula o valor da função de k

    // Guarda os dados da iteração em um array para mostra os resultados depois
    array.push({
        x: a, 
        fx: fX,
        xk: xk,
        fxk: fXk
    });

    if(xk <= b){    // Primeiro critério de parada, se xk passou do limite estabelecido 
        // Continua o código
        if(fXk < fX) {  // Segundo critério de parada, verifica se fxk é menor que fx, se for continua o processo 
            return CalculoBuscaUniforme(iteracao+1, xk, b, del, refina, array); // Chama a função recursivamente, com a com o xk
        } else {    // Se fxk for maior ou igual a fx então
            if(refina == 0){    // Verifica se já foi refinado todas as vezes
                return a;       // Se já foi refinado todas as vezes retorna a
            } else {            // Se não foi refinado todas as vezes, então
                refinaUni[iteracao] = true; //Armaneza em qual iteração houve o refinamento 
                // Chama a função recursivamente sendo a o valor anterior, e delta / 10
                return CalculoBuscaUniforme(iteracao+1,(a < 0) ? a+del : a-del, b, del/10, --refina, array); 
            }
        }
    } else {    // Caso xk tenha passado o valor de b retorna a e encerra a função 
        return a;
    }
}

// Calculo da busca dicotomica 
function CalculoBuscaDicotomica(k, a, b, delta, precisao, iteracao) {
    // Primeiro criterio de convergencia 
    if(IntervaloMaiorQPrecisao(a,b,precisao)){
        //Se for verdade continua o processo 
        var meio = Media(a,b);  // Calcula a média do intervalo 
        var x = meio - delta;   // Calcula x subtraindo delta 
        var z = meio + delta;   // Calcula z somando delta 

        var fx = parser.eval('f(' + x + ')');   // Calcula o valor da função para o valor de x 
        var fz = parser.eval('f(' + z + ')');   // e para o valor de z

        // Salva os dados da iteração 
        iteracao.push({
            a: a, 
            b: b, 
            x: x, 
            z: z, 
            fx: fx, 
            fz: fz
        });

        if(fx > fz) {   // Verifica se fx é maior que fz , se for verdade o a recebe x e chama a função recursivamente 
            return CalculoBuscaDicotomica(k++,x,b,delta,precisao,iteracao);
        } else {        // Se for falso o b recebe z e chama a função recursivamente
            return CalculoBuscaDicotomica(k++,a,z,delta,precisao,iteracao);
        }
    } else{ // Caso o primeiro criterio de parada seja atendido, salva no array de iterações somente o intervalo final 
        iteracao.push({
            a: a, 
            b: b
        }); 
        return Media(a,b);  // Retorna a média do intervalo final 
    }
}

// calculo da seção aurea
function CalculoSecaoAurea(k, a, b, e, alfa, iteracao){
    // O valor de alfa já passado para a função quando a função é chamada
    if(IntervaloMaiorQPrecisao(a,b,e)){     // Primeiro critério de parada 
        //Se for verdade continua o processo  
        var u = a + (1 - alfa) * (b - a);   // calcula u 
        var l = a + alfa * (b - a);         // calcula lambda, representado por l

        var fu = parser.eval('f(' + u + ')');   // calcula a função com o valor de u 
        var fl = parser.eval('f(' + l + ')');   // calcula a função com o valor de lambda
        // Salva os dados da iteração atual no array de iterações 
        iteracao.push({
            a: a, 
            b: b, 
            u: u, 
            l: l, 
            fu: fu, 
            fl: fl
        });

        if(fu > fl) {   // Verifica se fu é maior que fl , se for verdade o a recebe x e chama a função recursivamente
            return CalculoSecaoAurea(k++, u, b, e, alfa, iteracao);
        } else {        // Se for falso o b recebe z, e chama a função recursivamente 
            return CalculoSecaoAurea(k++, a, l, e, alfa, iteracao);
        }
    } else{             // se o critério de parada for atendido, então salva no array iteração somente o ultimo intervalo 
        iteracao.push({
            a: a, 
            b: b
        });             // E retorna a média 
        return Media(a,b);
    }
}

// Calculo da busca de fibonacci 
function CalculoBuscaFibonacci(k, a, b, max, sequenciaFibo, e, iteracao) {
        // O número máximo de iterações e a sequencia de fibonacci já foram calculadas previamente e são passadas
        // por parametro para a função 
        // O primeiro critério de parada é se o número máximo de iterações foi atingido 
        if(k <= max) {  // Se a iteração for menor ou igual que o número maximo, continua o calculo 

            var auxU = (sequenciaFibo.length-1)-k-2;    // Variavel auxiliar para ajudar no calculo 
            var auxL = (sequenciaFibo.length-1)-k-1;    // Variavel auxiliar para ajudar no calculo    
            var divisor = (sequenciaFibo.length-1)-k;   // Variavel auxiliar para ajudar no calculo 
            var u = a + (sequenciaFibo[auxU] * (b - a)) / (sequenciaFibo[divisor]);     // Calculo do valor de u 
            var l = a + (sequenciaFibo[auxL] * (b - a)) / (sequenciaFibo[divisor]);     // Calculo do valor de lambda

            var fu = parser.eval('f(' + u + ')');   // Calcula o valor da função com a variavel u 
            var fl = parser.eval('f(' + l + ')');   // Calcula o valor da função com a variavel lambda
            // Salva os dados da iteração no vetor de iterações 
            iteracao.push({
                a: a, 
                b: b,
                u: u, 
                l: l, 
                fu: fu, 
                fl: fl
            });
            // Verifica se o segundo critério de parada foi atendido 
            if(IntervaloMaiorQPrecisao(a,b,e)) {    // Se não, continua a execução 
                // Verifica se fu é maior que fl, se for 
                if(fu > fl){    // Chama a função recursivamente com a recebendo u 
                    return CalculoBuscaFibonacci(k++, u, b, max, sequenciaFibo, e, iteracao);
                } else {        // Se não, chama a função recursivamente com b recebendo lambda
                    return CalculoBuscaFibonacci(k++, a, l, max, sequenciaFibo, e, iteracao);
                }
            } else {    // Caso o segundo critério de parada for atendido, retorna a média do ultimo intervalo 
                return Media(a,b);
            }
        } else {    // Se o número máximo de iterações foi ultrapassado, então retorna a média do ultimo intervalo
            return Media(a,b);
        }
}

// Calculo da bisseção 
function CalculoBissecao(k, max, a, b, der, e, iteracao) {
    // o número maximo de iterações e a função para o cálculo da derivada são passadas por parametro 
    var x = Media(a,b);                     // Calcula a média do intervalo 
    var resDerivada = der.eval({x: x});     // Calcula a derivada com a média do intervalo 
    if(k < max) {                           // Verifica se o numero máximo de iterações foi atingido 
        // Salvando os dados da iteração no array de iteração 
        iteracao.push({
            a: a, 
            b: b, 
            x: x, 
            flx: resDerivada
        });
        if (resDerivada > 0) {  // Se a derivada for maior que zero, então chama a função recursivamente com b recebendo x
            return CalculoBissecao(++k, max, a, x, der, e, iteracao);
        } else if (resDerivada < 0) {   // Se a derivada for menor que zero, então chama a função recursivamente com a recebendo x
            return CalculoBissecao(++k, max, x, b, der, e, iteracao);
        } else return x;    // Se a derivada for 0, ponto de minimo encontrado!! Retorna x 
    } else return x;        // Caso o número maximo de iterações foi excedido, retorna x
}

// Calculo de newton 
function CalculoNewton(k, a, b, der1, der2, e, iteracao, min, max) {
    // é passado por parametro as funções para resolver a derivada primeira e a derivada segunda 
    var x0 = a;     // Atribui a ao x da iteração 
    var d1x0 = der1.eval({x: x0});  // Calcula a derivada primeira do x 
    var d2x0 = der2.eval({x: x0});  // Calcula a derivada segunda do x

    //console.log(der1.toString(), der2.toString());
    
    // Calcula o proximo x (x1)
    var x1 = x0 - (d1x0 / d2x0);
    var d1x1 = der1.eval({x: x1}); // Calcula a derivada primeira do novo x calculado na linha de cima 

    // Salva os dados da iteração no array de iterações 
    iteracao.push({
        a: a, 
        b: b, 
        x0: x0, 
        x1: x1,
        d1x0: d1x0, 
        d2x0: d2x0, 
        d1x1: d1x1
    });

    // Se o novo valor estiver fora do intervalo, retorna o valor anterior
    if(x1 < min || x1 > max) {
        console.log('fora do intervalo');
        return x0;
    } else {
        // Primeiro critério de parada 
        if(Math.abs(d1x1) > e) {    // Se o módulo da derivada primeira do novo x for maior que a precisão, então continua 
            // Segundo critério de parada 
            if(CriterioParadaNewton(x0,x1,e)){  // Se o segundo critério não foi atendido, então chama a função recursivamente com o a recebendo o novo x
                return CalculoNewton(k++, x1, b, der1, der2, e, iteracao, min, max);
            }else return x1;    // Se o critério for atendido, retorna o novo valor de x
        } else return x1;       // Se a derivada primeira do novo x for menor que a precisao, retorna o novo valor de x
    }
}


function CriterioParadaNewton(x0, x1, e) {
    var c = (Math.abs(x1 - x0) / ((Math.abs(x1) < 1) ? 1 : Math.abs(x1)));
    return c > e;
 }