    function Computar(){
        var fLida = document.getElementById("funcao").value;
        console.dir(fLida);

        var parser = math.parser(); 

        var stringFuncao = "f(x) = x^2 / x";

        var funcao = parser.eval(stringFuncao); 

        console.log('opaaaa');

        var valoresX = [];
        for(var i=0, j=-10; i<=20; i++, j++){
            var aux; 
            if(j == 0)
                aux = 0.000001;
            else aux = j;
            valoresX[i] = aux;
        }
            
        //var valoresX = [0,1,2,3,4,5,6,7,8,9,10];
        var valoresY = valoresX.map((valorX) => {
            return parser.eval('f('+valorX+')');
        });

        console.log(valoresX, valoresY);

        // construindo um grafico
        var ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: valoresX,
                datasets: [{
                    label: '# of Votes',
                    data: valoresY,
                    borderWidth: 2, 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                    borderColor: 'rgba(0, 0, 0, 1)',
                    pointRadius: 0
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:false
                        }
                    }]
                }
            }
        });

        const node = math.parse(stringFuncao);
        const filtered = node.filter(function(node) {
            return node.isSymbolNode;
        });
        console.log(filtered.map((val) => { return val.name; }));
        /*node.forEach(function (node, path, parent) {
            console.log('--- begins ---');
            console.log(node.map((v) => {return v;}));
            console.log(path);
            //console.log(parent);
            console.log('tipo', node.type);
            console.log(" ### ends ###");
            
            switch (node.type) {
                case 'OperatorNode':
                console.log(node.type, node.op)
                break
                case 'ConstantNode':
                console.log(node.type, node.value)
                break
                case 'SymbolNode':
                console.log(node.type, node.name)
                break
                default:
                console.log(node.type)
            }
        })*/
    }