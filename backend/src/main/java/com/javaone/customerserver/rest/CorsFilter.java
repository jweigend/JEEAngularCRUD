package com.javaone.customerserver.rest;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

// @Provider registers this filter globally for all JAX-RS responses.
// CORS (Cross-Origin Resource Sharing) is required during development because the Angular
// dev server (localhost:4200) and the WildFly backend (localhost:8080) run on different origins.
// Browsers block cross-origin requests by default; these headers tell the browser it's allowed.
//
// Note: In production (Docker/Nginx), the reverse proxy serves both on the same origin,
// making this filter unnecessary. For production, restrict or remove this filter.
@Provider
public class CorsFilter implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext,
                       ContainerResponseContext response) {
        response.getHeaders().putSingle("Access-Control-Allow-Origin", "http://localhost:4200");
        response.getHeaders().putSingle("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
        response.getHeaders().putSingle("Access-Control-Allow-Headers", "Content-Type, Accept");
    }
}
