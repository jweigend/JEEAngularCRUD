package com.javaone.customerserver.rest;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;

// JAX-RS bootstrap — this single annotation activates JAX-RS and sets the URL prefix.
// All REST resources are available under: /customerserver/api/*
//
// Migration note: The original 2014 version manually registered every Resource class
// in getClasses(). With CDI 4.0 (bean-discovery-mode="all" in beans.xml), JAX-RS
// auto-discovers all @Path and @Provider annotated classes — no manual registration needed.
@ApplicationPath("/api")
public class ApplicationConfig extends Application {
}
