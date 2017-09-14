package poc.TaskList.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import poc.TaskList.model.Task;
import poc.TaskList.service.TaskService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/")
public class TaskRest {
	
	@Autowired
	private TaskService service;

	@PostMapping("/tasks")
	public @ResponseBody Task save(@RequestBody Task task) {
		try {
			service.save(task);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return task;
	}

	@GetMapping("/tasks")
	public @ResponseBody List<Task> test() {
		Task task = new Task();
		task.setDescricao("teste");

		List<Task> tasks = new ArrayList<>();
		tasks.add(task);
		return tasks;
	}

}
