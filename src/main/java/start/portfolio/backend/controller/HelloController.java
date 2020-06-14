package start.portfolio.backend.controller;

import java.util.Date;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HelloController {

	@GetMapping("/api/hello")
	public String hello() {
		return "현재 서버시간은  ??" + new Date();
	}
	 
	@GetMapping({"/", "/error"})
	public String index() {
		return "index.html";
	}
	  
	@PostMapping("/post")
	public String createForm(Model model) {
		System.out.println("in");
		return model.toString();
	}
	
}
