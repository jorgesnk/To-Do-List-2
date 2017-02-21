angular.module('todo').controller('listaController', function ($scope, $http) {

    $scope.item = {};
    $scope.lista = {};
    $scope.itemLista = {};

    $http.get('/api/lista')
        .success(function (lista) {
            $scope.lista = lista;
        })
        .error(function (erro) {
            alert('erro na busca da lista');
        });


    $http.get('/api/item')
        .success(function (item) {
            $scope.item = item;
        })
        .error(function (erro) {
            alert(erro);
        });

    $scope.addLista = function (listaEnvia) {
        $http.post('/api/lista', listaEnvia)
            .success(function () {
               
                listaEnvia.nomeLista = "";
                $http.get('/api/lista')
                    .success(function (lista) {
                        $scope.lista = lista;
                    })
                    .error(function (erro) {
                        alert('erro na busca da lista');
                    });
            })
            .error(function (erro) {
                alert('nao passou');
            });
    }

    $scope.conclulir = function (item) {
        $http.put('api/item/' + item._id + '/' + 'concluido')
            .success(function () {


                $http.get('/api/item')
                    .success(function (item) {
                        $scope.item = item;
                    })
                    .error(function (erro) {
                        alert(erro);
                    });

            })
            .error(function (erro) {
                alert('erro na atualização');
            });
    }

    $scope.rmitem = function (itemls) {

        $http.delete('/api/item/' + itemls._id)
            .success(function (res) {

                $http.get('/api/item')
                    .success(function (item) {
                        $scope.item = item;
                    })
                    .error(function (erro) {
                        alert(erro);
                    });
            })
            .error(function (erro) {
                alert('erro ao remover item');
            });
    }

    $scope.enviaTarefa = function (tarefa, id) {
        tarefa.idLista = id;
        console.log(tarefa);
        $http.post('/api/item', tarefa)
            .success(function () {
                tarefa.descricao="";
                tarefa.nomeItem="";
                $http.get('/api/item')
                    .success(function (item) {
                        $scope.item = item;
                    })
                    .error(function (erro) {
                        alert(erro);
                    });
            })
            .error(function (erro) {
                alert('erro');
            });

    }

    $scope.removeLista = function (id) {
        $http.delete('/api/lista/' + id)
            .success(function () {
                $http.get('/api/lista')
                    .success(function (lista) {
                        $scope.lista = lista;
                    })
                    .error(function (erro) {
                        alert('erro na busca da lista');
                    });

            })
            .error(function (erro) {
                alert('erro');
            });
    }
});