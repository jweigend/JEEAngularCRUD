package com.javaone.customerserver.rest;

import com.javaone.customerserver.entity.MicroMarket;
import com.javaone.customerserver.repository.MicroMarketRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;

@Path("/micro-markets")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class MicroMarketResource {

    @Inject
    private MicroMarketRepository repository;

    @GET
    public List<MicroMarket> findAll() {
        return repository.findAll();
    }

    @GET
    @Path("{id}")
    public MicroMarket find(@PathParam("id") String id) {
        return repository.find(id);
    }

    @POST
    public Response create(MicroMarket entity) {
        repository.create(entity);
        return Response.created(URI.create("/api/micro-markets/" + entity.getZipCode())).build();
    }

    @PUT
    @Path("{id}")
    public Response edit(@PathParam("id") String id, MicroMarket entity) {
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
