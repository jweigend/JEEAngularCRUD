package com.javaone.customerserver.rest;

import com.javaone.customerserver.entity.DiscountCode;
import com.javaone.customerserver.repository.DiscountCodeRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/discount-codes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DiscountCodeResource {

    @Inject
    private DiscountCodeRepository repository;

    @GET
    public List<DiscountCode> findAll() {
        return repository.findAll();
    }

    @GET
    @Path("{id}")
    public DiscountCode find(@PathParam("id") String id) {
        return repository.find(id);
    }

    @POST
    public Response create(DiscountCode entity) {
        repository.create(entity);
        return Response.created(URI.create("/api/discount-codes/" + entity.getDiscountCode())).build();
    }

    @PUT
    @Path("{id}")
    public Response edit(@PathParam("id") String id, DiscountCode entity) {
        repository.edit(entity);
        return Response.ok().build();
    }

    @DELETE
    @Path("{id}")
    public Response remove(@PathParam("id") String id) {
        repository.remove(repository.find(id));
        return Response.noContent().build();
    }
}
