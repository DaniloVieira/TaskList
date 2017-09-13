package poc.TaskList.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import poc.TaskList.model.Task;
import poc.TaskList.service.TaskService;

@CrossOrigin // nao sei pra que serve isso
@RestController
@RequestMapping(value = "/tasklist", produces = { org.springframework.http.MediaType.APPLICATION_JSON_VALUE})
public class TaskRest {
	
	@Autowired
	private TaskService service;
	
	@RequestMapping(value = "/task", method = RequestMethod.PUT)
	public Task save( @RequestBody Task task) {
		try {
			service.save(task);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		return task;
	}

}
