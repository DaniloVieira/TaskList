package poc.TaskList.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Task {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	
	private String titulo;
	private String status;
	private String descricao;
	private String obervacao;
	private Date criacao;
	private Date edicao;
	private Date remocao;
	private Date conclusao;
	
	
	public Task(String titulo, Date criacao) {
		super();
		this.titulo = titulo;
		this.criacao = criacao;
	}
	
	public Task() {
		
	}
		
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Date getCriacao() {
		return criacao;
	}
	public void setCriacao(Date criacao) {
		this.criacao = criacao;
	}
	public Date getEdicao() {
		return edicao;
	}
	public void setEdicao(Date edicao) {
		this.edicao = edicao;
	}
	public Date getRemocao() {
		return remocao;
	}
	public void setRemocao(Date remocao) {
		this.remocao = remocao;
	}
	public Date getConclusao() {
		return conclusao;
	}
	public void setConclusao(Date conclusao) {
		this.conclusao = conclusao;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getObervacao() {
		return obervacao;
	}
	public void setObervacao(String obervacao) {
		this.obervacao = obervacao;
	}
	
	
	
	

}
