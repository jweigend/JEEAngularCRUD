package com.javaone.customerserver.repository;

import com.javaone.customerserver.entity.MicroMarket;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@ApplicationScoped
@Transactional
public class MicroMarketRepository extends AbstractRepository<MicroMarket> {

    @PersistenceContext
    private EntityManager em;

    public MicroMarketRepository() {
        super(MicroMarket.class);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
}
