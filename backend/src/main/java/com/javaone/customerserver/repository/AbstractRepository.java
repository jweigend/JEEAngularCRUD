package com.javaone.customerserver.repository;

import java.util.List;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

// Generic base class for CRUD operations — avoids repeating the same EntityManager calls
// in every repository. Subclasses only need to provide the entity class and EntityManager.
// Migration note: The original 2014 "AbstractFacade" used raw types (CriteriaQuery without <T>).
// This version uses proper generics throughout, which provides compile-time type safety.
public abstract class AbstractRepository<T> {

    private final Class<T> entityClass;

    public AbstractRepository(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    // Template Method pattern: subclasses inject and return their EntityManager here.
    protected abstract EntityManager getEntityManager();

    public void create(T entity) {
        getEntityManager().persist(entity);
    }

    public void edit(T entity) {
        getEntityManager().merge(entity);
    }

    // merge() first to re-attach a potentially detached entity, then remove().
    // A detached entity (e.g. received via REST) cannot be removed directly.
    public void remove(T entity) {
        getEntityManager().remove(getEntityManager().merge(entity));
    }

    public T find(Object id) {
        return getEntityManager().find(entityClass, id);
    }

    // JPA Criteria API: type-safe, programmatic query building (alternative to JPQL strings).
    // CriteriaQuery<T> ensures the result type matches at compile time.
    public List<T> findAll() {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(entityClass);
        Root<T> root = cq.from(entityClass);
        cq.select(root);
        return getEntityManager().createQuery(cq).getResultList();
    }

    public List<T> findRange(int[] range) {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(entityClass);
        cq.select(cq.from(entityClass));
        TypedQuery<T> q = getEntityManager().createQuery(cq);
        q.setMaxResults(range[1] - range[0] + 1);
        q.setFirstResult(range[0]);
        return q.getResultList();
    }

    public int count() {
        CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
        CriteriaQuery<Long> cq = cb.createQuery(Long.class);
        Root<T> rt = cq.from(entityClass);
        cq.select(cb.count(rt));
        return getEntityManager().createQuery(cq).getSingleResult().intValue();
    }
}
