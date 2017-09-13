package poc.TaskList.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import poc.TaskList.model.Task;

public interface TaskRepository extends JpaRepository<Task, Integer>, TaskRepositoryQuery {

}
