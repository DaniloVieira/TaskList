package poc.TaskList;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import poc.TaskList.model.Task;
import poc.TaskList.repository.TaskRepository;

@SpringBootApplication
public class TaskListApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaskListApplication.class, args);		
	}
	
//	@Bean
//	public CommandLineRunner init(TaskRepository repo) {
//		return (arg) -> {
//			repo.save(new Task("tarefa - 2", new Date()));
//		};
//	}

}
