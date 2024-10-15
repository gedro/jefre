package org.jefree;

import org.jefree.security.authorization.annotation.Public;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

  @Public
  @GetMapping("/hi")
  public String hi() {
    return "hi";
  }

  @GetMapping("/hi2")
  public String hi2() {
    return "hi2";
  }
}
