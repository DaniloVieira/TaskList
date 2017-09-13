package poc.TaskList.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poc.TaskList.model.Task;
import poc.TaskList.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired	
	private TaskRepository taskRepository;
	
	public Task save(Task task) throws Exception{
		
		try {
			taskRepository.save(task);
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception();
		}
		
		return task;
		
	}

}
