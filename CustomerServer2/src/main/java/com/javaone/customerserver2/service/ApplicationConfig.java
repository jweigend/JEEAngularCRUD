/*
 *    Java One 2014
 *  (c) Johannes Weigend 
 */
package com.javaone.customerserver2.service;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author weigend
 */
@javax.ws.rs.ApplicationPath("webresources")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new java.util.HashSet<>();
        addRestResourceClasses(resources);
        return resources;
    }

    /**
     * Do not modify addRestResourceClasses() method.
     * It is automatically populated with
     * all resources defined in the project.
     * If required, comment out calling this method in getClasses().
     */
    private void addRestResourceClasses(Set<Class<?>> resources) {
        resources.add(com.javaone.customerserver2.service.CustomerFacadeREST.class);
        resources.add(com.javaone.customerserver2.service.DiscountCodeFacadeREST.class);
        resources.add(com.javaone.customerserver2.service.MicroMarketFacadeREST.class);
        resources.add(com.javaone.customerserver2.service.NewCrossOriginResourceSharingFilter.class);
    }
    
}
