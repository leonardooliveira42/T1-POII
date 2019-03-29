 /********* Funções para mostrar resultados **********/

 function MostraResultadoUniforme(resultado, funcao, minimo, maximo, delta, casas) {

    var foiRefinado = false;

    //Mostrando os dados nos cards 
    $('#funcaoObjetivoUni').empty(); 
    $('#funcaoObjetivoUni').append('<strong> ' + funcao + ' </strong>');
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
    $('#simple-information').empty();

    resultado.iteracoes.forEach(function(item, index) {
        var classe;
        if(refinaUni[index] == true){
            classe = 'bg-warning';
            foiRefinado = true;            
        } else {
            classe = '';
        }    
        $('#uniformeTbody').append('<tr>');
        $('#uniformeTbody').append('<td class="'+classe+'"> ' + index + ' </td>');
        $('#uniformeTbody').append('<td class="'+classe+'"> ' + item.x.toFixed(2 + casas) + ' </td>');
        $('#uniformeTbody').append('<td class="'+classe+'"> ' + item.fx.toFixed(2 + casas) + ' </td>');
        $('#uniformeTbody').append('<td class="'+classe+'"> ' + item.xk.toFixed(2 + casas) + ' </td>');
        $('#uniformeTbody').append('<td class="'+classe+'"> ' + item.fxk.toFixed(2 + casas) + ' </td>');     
        $('#uniformeTbody').append('<td class="'+classe+'"> ' + ((item.fx < item.fxk) ? 'Verdade' : 'Falso') + ' </td>');
        $('#uniformeTbody').append('</tr>');
    });     

    if(foiRefinado == true){
         // Adicionando uma informação 
        $('#simple-information').append('A linha destacada, é a iteração, que a partir dela, terá a busca refinada');
    }   

    // Resultado final 
    $('#uniResultado').empty(); 
    $('#uniResultado').append('x<sup>*</sup> = ' + resultado.resultado.toFixed(2 + casas));
    $('#uniIteracoes').empty(); 
    $('#uniIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(0));         
}   

function MostraResultadoDicotomica(resultado, funcao, minimo, maximo, delta, precisao) {

    // Dados essenciais 
    $('#funcaoObjetivoDico').empty(); 
    $('#funcaoObjetivoDico').append('<strong>' + funcao + '</strong>');
    $('#restricaoDico').empty(); 
    $('#restricaoDico').append('s.a: ' + minimo + '<= x <= ' + maximo);
    $('#deltaDico').empty(); 
    $('#deltaDico').append('&Delta; = ' + delta); 
    $('#precisaoDico').empty(); 
    $('#precisaoDico').append('&epsilon; = ' + precisao); 

    //Gráfico 

    // Tabela de Resultados
    $('#DicoTbody').empty();
    resultado.iteracoes.forEach(function(item, index) {
        console.log(typeof item.z); 
        $('#DicoTbody').append("<tr class='table-warning'>");
        $('#DicoTbody').append('<td> ' + index + ' </td>');
        $('#DicoTbody').append('<td> ' + item.a.toFixed(4) + ' </td>');
        $('#DicoTbody').append('<td> ' + item.b.toFixed(4) + ' </td>');
        $('#DicoTbody').append('<td> ' + ((Math.abs(item.b - item.a) >= precisao)? 'V' : 'F') + ' </td>');
        $('#DicoTbody').append('<td> ' + ((item.x != undefined) ? item.x.toFixed(4) : '-') + ' </td>');
        $('#DicoTbody').append('<td> ' + ((item.z != undefined) ? item.z.toFixed(4) : '-') + ' </td>');
        $('#DicoTbody').append('<td> ' + ((item.fx != undefined) ? item.fx.toFixed(4) : '-') + ' </td>');   
        $('#DicoTbody').append('<td> ' + ((item.fz != undefined) ? item.fz.toFixed(4) : '-') + ' </td>');        
        $('#DicoTbody').append('<td> ' + ((item.fx > item.fz) ? 'Verdade' : 'Falso') + ' </td>');
        $('#DicoTbody').append('</tr>');
    }); 

    // Resultado final 
    $('#DicoResultado').empty(); 
    $('#DicoResultado').append('x<sup>*</sup> = ' + resultado.resultado.toFixed(4));
    $('#DicoIteracoes').empty(); 
    $('#DicoIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(3));  

}

function MostraResultadoAurea(resultado, funcao, minimo, maximo, precisao) {
    console.log('mostrando os resultados da aurea');
    // Dados essenciais 
    $('#funcaoObjetivoAurea').empty(); 
    $('#funcaoObjetivoAurea').append('<strong>' + funcao + '</strong>');
    $('#restricaoAurea').empty(); 
    $('#restricaoAurea').append('s.a: ' + minimo + '<= x <= ' + maximo);
    $('#deltaAurea').empty(); 
    $('#deltaAurea').append('&epsilon; = ' + precisao); 

    // Gráfico 

    // Tabela de resultados 
    $('#AureaTbody').empty();
    resultado.iteracoes.forEach(function(item, index) {
        //console.log(typeof item.z); 
        $('#AureaTbody').append("<tr class='table-warning'>");
        $('#AureaTbody').append('<td> ' + index + ' </td>');
        $('#AureaTbody').append('<td> ' + item.a.toFixed(4) + ' </td>');
        $('#AureaTbody').append('<td> ' + item.b.toFixed(4) + ' </td>');
        $('#AureaTbody').append('<td> ' + ((Math.abs(item.b - item.a) >= precisao)? 'V' : 'F') + ' </td>');
        $('#AureaTbody').append('<td> ' + ((item.u != undefined) ? item.u.toFixed(4) : '-') + ' </td>');
        $('#AureaTbody').append('<td> ' + ((item.l != undefined) ? item.l.toFixed(4) : '-') + ' </td>');
        $('#AureaTbody').append('<td> ' + ((item.fu != undefined) ? item.fu.toFixed(4) : '-') + ' </td>');   
        $('#AureaTbody').append('<td> ' + ((item.fl != undefined) ? item.fl.toFixed(4) : '-') + ' </td>');        
        $('#AureaTbody').append('<td> ' + ((item.fu > item.fl) ? 'Verdade' : 'Falso') + ' </td>');
        $('#AureaTbody').append('</tr>');
    }); 

    // Resultado final 
    $('#AureaResultado').empty(); 
    $('#AureaResultado').append('x<sup>*</sup> = ' + resultado.resultado.toFixed(4));
    $('#AureaIteracoes').empty(); 
    $('#AureaIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(3));  
}

function MostraResultadoFibonacci(resultado, funcao, minimo, maximo, precisao) {

    console.log('mostrando os resultados de fibonacci ');
    // Dados essenciais 
    $('#funcaoObjetivoFibo').empty(); 
    $('#funcaoObjetivoFibo').append('<strong>' + funcao + '</strong>');
    $('#restricaoFibo').empty(); 
    $('#restricaoFibo').append('s.a: ' + minimo + '<= x <= ' + maximo);
    $('#deltaFibo').empty(); 
    $('#deltaFibo').append('&epsilon; = ' + precisao); 

    // Gráfico 

    // Tabela de resultados 
    $('#FiboTbody').empty();
    resultado.iteracoes.forEach(function(item, index) {
        //console.log(typeof item.z); 
        $('#FiboTbody').append("<tr class='table-warning'>");
        $('#FiboTbody').append('<td> ' + index + ' </td>');
        $('#FiboTbody').append('<td> ' + item.a.toFixed(4) + ' </td>');
        $('#FiboTbody').append('<td> ' + item.b.toFixed(4) + ' </td>');
        $('#FiboTbody').append('<td> ' + ((Math.abs(item.b - item.a) >= precisao)? 'V' : 'F') + ' </td>');
        $('#FiboTbody').append('<td> ' + ((item.u != undefined) ? item.u.toFixed(4) : '-') + ' </td>');
        $('#FiboTbody').append('<td> ' + ((item.l != undefined) ? item.l.toFixed(4) : '-') + ' </td>');
        $('#FiboTbody').append('<td> ' + ((item.fu != undefined) ? item.fu.toFixed(4) : '-') + ' </td>');   
        $('#FiboTbody').append('<td> ' + ((item.fl != undefined) ? item.fl.toFixed(4) : '-') + ' </td>');        
        $('#FiboTbody').append('<td> ' + ((item.fu > item.fl) ? 'Verdade' : 'Falso') + ' </td>');
        $('#FiboTbody').append('</tr>');
    }); 

    // Resultado final 
    $('#FiboResultado').empty(); 
    $('#FiboResultado').append('x<sup>*</sup> = ' + resultado.resultado.toFixed(4));
    $('#FiboIteracoes').empty(); 
    $('#FiboIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(3));    
}

function MostraResultadoBissecao(resultado, funcao, derivada, minimo, maximo, precisao) {
    console.log('mostrando os resultados de bissecao ');
    // Dados essenciais 
    $('#funcaoObjetivoBisse').empty(); 
    $('#funcaoObjetivoBisse').append('<strong>' + funcao + '</strong>');
    $('#restricaoBisse').empty(); 
    $('#restricaoBisse').append('s.a: ' + minimo + '<= x <= ' + maximo);
    $('#deltaBisse').empty(); 
    $('#deltaBisse').append('&epsilon; = ' + precisao); 

    $('#derivadaBissecao').empty(); 
    $('#derivadaBissecao').append('<h6> Derivada: </h6>'); 
    $('#derivadaBissecao').append('<p> f\'(x) = ' + derivada.toString() + ' </p>'); 

    // Gráfico 

    // Tabela de resultados 
    $('#BisseTbody').empty();
    resultado.iteracoes.forEach(function(item, index) {
        //console.log(typeof item.z); 
        $('#BisseTbody').append("<tr class='table-warning'>");
        $('#BisseTbody').append('<td> ' + index + ' </td>');
        $('#BisseTbody').append('<td> ' + item.a.toFixed(4) + ' </td>');
        $('#BisseTbody').append('<td> ' + item.b.toFixed(4) + ' </td>');
        $('#BisseTbody').append('<td> ' + item.x + ' </td>');
        $('#BisseTbody').append('<td> ' + item.flx + ' </td>');
        $('#BisseTbody').append('</tr>');
    }); 

    // Resultado final 
    $('#BisseResultado').empty(); 
    $('#BisseResultado').append('x<sup>*</sup> = ' + resultado.resultado.toFixed(4));
    $('#BisseIteracoes').empty(); 
    $('#BisseIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(3));    
}

function MostraResultadoNewton(resultado, funcao, derivada1, derivada2, minimo, maximo, precisao) {
    console.log('mostrando os resultados de newton ');
    // Dados essenciais 
    $('#funcaoObjetivoNewton').empty(); 
    $('#funcaoObjetivoNewton').append('<strong>' + funcao + '</strong>');
    $('#restricaoNewton').empty(); 
    $('#restricaoNewton').append('s.a: ' + minimo + '<= x <= ' + maximo);
    $('#deltaNewton').empty(); 
    $('#deltaNewton').append('&epsilon; = ' + precisao); 

    $('#derivada1Newton').empty(); 
    $('#derivada1Newton').append('<p> f\'(x) = ' + derivada1.toString() + ' </p>'); 
    $('#derivada2Newton').empty(); 
    $('#derivada2Newton').append('<p> f\"(x) = ' + derivada2.toString() + ' </p>'); 

    // Gráfico 

    // Tabela de resultados 
    $('#NewtonTbody').empty();
    resultado.iteracoes.forEach(function(item, index) {
        //console.log(typeof item.z); 

        /**<th> k </th>
                        <th> a </th>
                        <th> b </th>
                        <th> x<sub>k</sub> </th>
                        <th> f'(x<sub>k</sub>) </th>
                        <th> f"(x<sub>k</sub>) </th>
                        <th> x<sub>k+1</sub> </th>
                        <th> f'(x<sub>k+1</sub>) </th>
                        <th> C1 ?  </th>
                        <th> C2 ? </th> */
        $('#NewtonTbody').append("<tr class='table-warning'>");
        $('#NewtonTbody').append('<td> ' + index + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.a.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.b.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.x0.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.d1x0.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.d2x0.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.x1.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + item.d1x1.toFixed(4) + ' </td>');
        $('#NewtonTbody').append('<td> ' + ((Math.abs(item.d1x1) < precisao) ? 'V' : 'F') + ' </td>');
        $('#NewtonTbody').append('<td> ' + ( (Math.abs(item.x1 - item.x0) / ((Math.abs(item.x1) < 1) ? 1 : Math.abs(item.x1)) < precisao ? 'V' : 'F')) + ' </td>');
        $('#NewtonTbody').append('</tr>');
    }); 

    // Resultado final 
    $('#NewtonResultado').empty(); 
    $('#NewtonResultado').append('x<sup>*</sup> = ' + resultado.resultado.toFixed(6));
    $('#NewtonIteracoes').empty(); 
    $('#NewtonIteracoes').append('Q. Iterações: ' + resultado.iteracoes.length.toFixed(3));   

}