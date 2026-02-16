package com.javaone.customerserver.repository;

import com.javaone.customerserver.entity.Customer;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

// @ApplicationScoped: CDI creates exactly one instance for the entire application lifecycle.
// @Transactional: every public method runs inside a JTA transaction (begin/commit/rollback).
//
// Migration note: The original 2014 version used @Stateless EJBs, which provided transactions
// and pooling implicitly. In Jakarta EE 10, lightweight CDI beans with @Transactional are
// preferred — they are simpler, do not require an EJB container, and behave identically
// for typical CRUD use cases.
@ApplicationScoped
@Transactional
public class CustomerRepository extends AbstractRepository<Customer> {

    // @PersistenceContext injects a container-managed EntityManager bound to the current transaction.
    // The container handles its lifecycle — no need to close it manually.
    @PersistenceContext
    private EntityManager em;

    public CustomerRepository() {
        super(Customer.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
