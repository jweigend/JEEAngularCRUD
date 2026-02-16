package com.javaone.customerserver.repository;

import com.javaone.customerserver.entity.DiscountCode;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class DiscountCodeRepository extends AbstractRepository<DiscountCode> {

    @PersistenceContext
    private EntityManager em;

    public DiscountCodeRepository() {
        super(DiscountCode.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
