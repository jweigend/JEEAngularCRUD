package com.javaone.customerserver.rest;

import com.javaone.customerserver.entity.Customer;
import com.javaone.customerserver.repository.CustomerRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.net.URI;
import java.util.List;
import java.util.logging.Logger;

// JAX-RS Resource — the REST controller layer.
// @Path("/customers") maps to: http://localhost:8080/customerserver/api/customers
// @Produces/@Consumes at class level apply to all methods (only JSON, no XML).
//
// Migration note: The original 2014 version had the REST endpoints and EJB business logic
// merged into a single class ("CustomerFacadeREST extends AbstractFacade").
// This version separates concerns: Resource (HTTP) -> Repository (persistence).
@Path("/customers")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CustomerResource {

    private static final Logger LOG = Logger.getLogger(CustomerResource.class.getName());

    // CDI @Inject: the container provides the singleton CustomerRepository instance.
    // Migration note: In the 2014 version, the Resource *was* the EJB (via inheritance).
    // Now it delegates to a separate CDI-managed repository — cleaner separation of concerns.
    @Inject
    private CustomerRepository repository;

    @GET
    public List<Customer> findAll() {
        LOG.info("FindAll");
        return repository.findAll();
    }

    @GET
    @Path("{id}")
    public Customer find(@PathParam("id") Integer id) {
        return repository.find(id);
    }

    // Returns HTTP 201 Created with a Location header pointing to the new resource.
    // JAX-RS automatically deserializes the request JSON body into a Customer object (via JSON-B).
    @POST
    public Response create(Customer entity) {
        LOG.info("Create");
        repository.create(entity);
        return Response.created(URI.create("/api/customers/" + entity.getCustomerId())).build();
    }

    @PUT
    @Path("{id}")
    public Response edit(@PathParam("id") Integer id, Customer entity) {
        LOG.info("Edit");
        repository.edit(entity);
        return Response.ok().build();
    }

    // HTTP 204 No Content — the standard REST response for successful deletes.
    @DELETE
    @Path("{id}")
    public Response remove(@PathParam("id") Integer id) {
        LOG.info("Remove");
        repository.remove(repository.find(id));
        return Response.noContent().build();
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String count() {
        return String.valueOf(repository.count());
    }
}
