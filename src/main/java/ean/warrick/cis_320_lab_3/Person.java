package ean.warrick.cis_320_lab_3;

public class Person {

    private int id;
    private String first;
    private String last;
    private String email;
    private String phone;
    private String birthday;

    public int getId() {return id; }
    public void setId(int id) { this.id = id; }

    public String getFirst() { return first; }
    public void setFirst(String first) { this.first = first; }

    /* Add additional getters and setters for each field.
       Just follow the same pattern. */

    public String getLast() { return last; }
    public void setLast(String last) { this.last = last; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getBirthday() { return birthday; }
    public void setBirthday(String birthday) { this.birthday = birthday; }

    public String toString() {
        return "First name: " + this.getFirst() + "\n" +
                "Last name: " + this.getLast() + "\n" +
                "Email: " + this.getEmail() + "\n" +
                "Phone Number: " + this.getPhone() + "\n" +
                "Birthday: " + this.getBirthday();
    }
}