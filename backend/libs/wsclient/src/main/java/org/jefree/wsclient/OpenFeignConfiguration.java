package org.jefree.wsclient;

import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "org.jefree")
public class OpenFeignConfiguration {
}
