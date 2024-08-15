package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class UserDetails {
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int id;
    public String fullname;
    public String email;
    public String licensenumber;
    public String licenseexpirationdate;
    public String pickupdate;
    public String dropdate;
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getFullname() {
        return fullname;
    }
    public void setFullname(String fullname) {
        this.fullname = fullname;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getLicensenumber() {
        return licensenumber;
    }
    public void setLicensenumber(String licensenumber) {
        this.licensenumber = licensenumber;
    }
    public String getLicenseexpirationdate() {
        return licenseexpirationdate;
    }
    public void setLicenseexpirationdate(String licenseexpirationdate) {
        this.licenseexpirationdate = licenseexpirationdate;
    }
    public String getPickupdate() {
        return pickupdate;
    }
    public void setPickupdate(String pickupdate) {
        this.pickupdate = pickupdate;
    }
    public String getDropdate() {
        return dropdate;
    }
    public void setDropdate(String dropdate) {
        this.dropdate = dropdate;
    }

    

}
