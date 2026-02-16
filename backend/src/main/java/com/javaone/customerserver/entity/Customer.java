package com.javaone.customerserver.entity;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.NamedQueries;
import jakarta.persistence.NamedQuery;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

// JPA Entity — maps this class to the CUSTOMER table.
// @NamedQueries define reusable JPQL queries, compiled at deployment time for early error detection.
@Entity
@Table(name = "CUSTOMER")
@NamedQueries({
    @NamedQuery(name = "Customer.findAll", query = "SELECT c FROM Customer c"),
    @NamedQuery(name = "Customer.findByCustomerId", query = "SELECT c FROM Customer c WHERE c.customerId = :customerId"),
    @NamedQuery(name = "Customer.findByName", query = "SELECT c FROM Customer c WHERE c.name = :name")})
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    // @GeneratedValue(AUTO) lets the JPA provider choose the best ID strategy.
    // Migration note: The original 2014 version generated IDs client-side in JavaScript.
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CUSTOMER_ID")
    private Integer customerId;

    @Size(max = 30)
    @Column(name = "NAME")
    private String name;

    @Size(max = 30)
    @Column(name = "ADDRESSLINE1")
    private String addressline1;

    @Size(max = 30)
    @Column(name = "ADDRESSLINE2")
    private String addressline2;

    @Size(max = 25)
    @Column(name = "CITY")
    private String city;

    @Size(max = 2)
    @Column(name = "STATE")
    private String state;

    @Size(max = 12)
    @Column(name = "PHONE")
    private String phone;

    @Size(max = 12)
    @Column(name = "FAX")
    private String fax;

    @Size(max = 40)
    @Column(name = "EMAIL")
    private String email;

    @Column(name = "CREDIT_LIMIT")
    private Integer creditLimit;

    // @ManyToOne defines the owning side of the relationship.
    // JPA serializes the full DiscountCode/MicroMarket objects into the JSON response,
    // so the frontend receives nested objects (e.g. customer.discountCode.rate).
    @JoinColumn(name = "DISCOUNT_CODE", referencedColumnName = "DISCOUNT_CODE")
    @ManyToOne(optional = false)
    private DiscountCode discountCode;

    @JoinColumn(name = "ZIP", referencedColumnName = "ZIP_CODE")
    @ManyToOne(optional = false)
    private MicroMarket zip;

    public Customer() {
    }

    public Customer(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddressline1() {
        return addressline1;
    }

    public void setAddressline1(String addressline1) {
        this.addressline1 = addressline1;
    }

    public String getAddressline2() {
        return addressline2;
    }

    public void setAddressline2(String addressline2) {
        this.addressline2 = addressline2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCreditLimit() {
        return creditLimit;
    }

    public void setCreditLimit(Integer creditLimit) {
        this.creditLimit = creditLimit;
    }

    public DiscountCode getDiscountCode() {
        return discountCode;
    }

    public void setDiscountCode(DiscountCode discountCode) {
        this.discountCode = discountCode;
    }

    public MicroMarket getZip() {
        return zip;
    }

    public void setZip(MicroMarket zip) {
        this.zip = zip;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(customerId);
    }

    // Java 21 pattern matching: "instanceof Customer other" declares and casts in one step.
    // Replaces the old pattern: if (!(obj instanceof Customer)) return false; Customer other = (Customer) obj;
    @Override
    public boolean equals(Object object) {
        if (!(object instanceof Customer other)) {
            return false;
        }
        return Objects.equals(this.customerId, other.customerId);
    }

    @Override
    public String toString() {
        return "Customer[customerId=" + customerId + "]";
    }
}
