package com.javaone.customerserver.entity;

import java.io.Serializable;
import java.math.BigDecimal;
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

// Lookup table entity — a single-character code (H, M, L, N) with an associated discount rate.
// Used as the @ManyToOne target from Customer.
@Entity
@Table(name = "DISCOUNT_CODE")
@NamedQueries({
    @NamedQuery(name = "DiscountCode.findAll", query = "SELECT d FROM DiscountCode d"),
    @NamedQuery(name = "DiscountCode.findByDiscountCode", query = "SELECT d FROM DiscountCode d WHERE d.discountCode = :discountCode")})
public class DiscountCode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @NotNull
    @Size(min = 1, max = 1)
    @Column(name = "DISCOUNT_CODE")
    private String discountCode;

    @Column(name = "RATE")
    private BigDecimal rate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "discountCode")
    private Collection<Customer> customerCollection;

    public DiscountCode() {
    }

    public DiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

    public String getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(String discountCode) {
        this.discountCode = discountCode;
    }

    public BigDecimal getRate() {
        return rate;
    }

    public void setRate(BigDecimal rate) {
        this.rate = rate;
    }

    // @JsonbTransient prevents JSON-B from serializing this back-reference collection.
    // Without it, serializing a DiscountCode would include all its Customers, each of which
    // contains a DiscountCode again — causing infinite recursion and a StackOverflowError.
    // Migration note: The original 2014 version used JAXB's @XmlTransient for the same purpose.
    @JsonbTransient
    public Collection<Customer> getCustomerCollection() {
        return customerCollection;
    }

    public void setCustomerCollection(Collection<Customer> customerCollection) {
        this.customerCollection = customerCollection;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(discountCode);
    }

    @Override
    public boolean equals(Object object) {
        if (!(object instanceof DiscountCode other)) {
            return false;
        }
        return Objects.equals(this.discountCode, other.discountCode);
    }

    @Override
    public String toString() {
        return "DiscountCode[discountCode=" + discountCode + "]";
    }
}
