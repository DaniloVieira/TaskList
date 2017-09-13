angular.module('appServices', ['ngResource'])
	.factory('appResource', function($resource){
		
		
		//const url = 'http://localhost:8080/tasklist/task';
		
		const url = 'http://192.168.0.17:8080/tasklist/task';
		return $resource(url , null, {
			'update' : {
				method: 'PUT'
			}
		});
	})
	.factory('cadastroResource', function(appResource, $q) {
		var service = {};
		service.cadastrar = function(task){
			return $q(function(resolve, reject) {
				if(task._id){
					appResource.update({taskId: task._id}, task, function(){
						resolve({
							mensagem: 'Task' + task.titulo + ' atualizada.',
							inclusao: false
						})
					}, function(erro) {
                        console.log(erro);
                        reject({
                            mensagem: 'Não foi possível atualizar a Task ' + task.titulo
                        });
                    });
				} else {
					appResource.save(task, function() {
                        $rootScope.$broadcast(evento); 

                        resolve({
                            mensagem: 'Task' + task.titulo + ' incluída com sucesso',
                            inclusao: true
                        });
                    }, function(erro) {
                        console.log(erro);
                        reject({
                            mensagem: 'Não foi possível incluir a foto ' + task.titulo
                        });
                    });
                }
				
			});
		};
		
		return service;
	});
	
	
	

