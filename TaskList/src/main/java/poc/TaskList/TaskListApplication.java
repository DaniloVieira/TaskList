package poc.TaskList;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@SpringBootApplication
public class TaskListApplication {

	@Bean
	public WebMvcConfigurerAdapter corsConfigurer() {
		return new WebMvcConfigurerAdapter() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/tasks").allowedOrigins("*");
			}
		};
	}

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
