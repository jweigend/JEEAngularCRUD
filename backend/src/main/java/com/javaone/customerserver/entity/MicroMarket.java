package com.javaone.customerserver.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Objects;
import jakarta.json.bind.annotation.JsonbTransient;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "MICRO_MARKET")
@NamedQueries({
    @NamedQuery(name = "MicroMarket.findAll", query = "SELECT m FROM MicroMarket m"),
    @NamedQuery(name = "MicroMarket.findByZipCode", query = "SELECT m FROM MicroMarket m WHERE m.zipCode = :zipCode")})
public class MicroMarket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    @Size(min = 1, max = 10)
    @Column(name = "ZIP_CODE")
    private String zipCode;

    @Column(name = "RADIUS")
    private Double radius;

    @Column(name = "AREA_LENGTH")
    private Double areaLength;

    @Column(name = "AREA_WIDTH")
    private Double areaWidth;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "zip")
    private Collection<Customer> customerCollection;

    public MicroMarket() {
    }

    public MicroMarket(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public Double getRadius() {
        return radius;
    }

    public void setRadius(Double radius) {
        this.radius = radius;
    }

    public Double getAreaLength() {
        return areaLength;
    }

    public void setAreaLength(Double areaLength) {
        this.areaLength = areaLength;
    }

    public Double getAreaWidth() {
        return areaWidth;
    }

    public void setAreaWidth(Double areaWidth) {
        this.areaWidth = areaWidth;
    }

    // @JsonbTransient: same pattern as in DiscountCode — prevents circular JSON serialization
    // of the bidirectional @OneToMany / @ManyToOne relationship.
    @JsonbTransient
    public Collection<Customer> getCustomerCollection() {
        return customerCollection;
    }

    public void setCustomerCollection(Collection<Customer> customerCollection) {
        this.customerCollection = customerCollection;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(zipCode);
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof MicroMarket other)) {
            return false;
        }
        return Objects.equals(this.zipCode, other.zipCode);
    }

    @Override
    public String toString() {
        return "MicroMarket[zipCode=" + zipCode + "]";
    }
}
